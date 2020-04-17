import {render, domUpdate, html} from '@erickmerchant/framework'
import {route} from '@erickmerchant/router/wildcard.mjs'
import {classes} from './css/styles.mjs'
import {content} from '../content.mjs'

const slugify = (title) => title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '-')
const clone = (obj) => JSON.parse(JSON.stringify(obj))

const headers = {'Content-Type': 'application/json'}

const dispatchLocation = async (commit, location) => {
  let state

  try {
    state = await route(location || '/', (on) => {
      on('/', async () => {
        const res = await fetch('/content/posts/index.json', {headers})

        const posts = await res.json()

        return {
          posts: posts,
          post: null,
          highlights: null
        }
      })

      on('/posts/create', async () => {
        return {
          post: {
            title: '',
            content: ''
          },
          highlights:''
        }
      })

      on('/posts/edit/*', async (slug) => {
        const res = await fetch(`/content/posts/${slug}.json`, {headers})

        const post = await res.json()

        return {
          post,
          highlights: post.content
        }
      })

      on(async () => {
        return {
          posts: [],
          post: null,
          highlights: null,
          error: Error('Route not found')
        }
      })
    })
  } catch (error) {
    state = {
      posts: [],
      post: null,
      highlights: null,
      error
    }
  }

  commit((old) => {
    return Object.assign(old, state)
  })
}

const state = {posts: []}

const target = document.querySelector('body')

const update = domUpdate(target)

const highlighter = (str) => content(str.replace(/\r/g, ''), {
  codeBlock: (code) => html`<span>
    <span class=${classes.highlightPunctuation}>${'```\n'}</span>
    <span class=${classes.highlightCodeBlock}>${code}</span>
    <span class=${classes.highlightPunctuation}>${'```'}</span>
  </span>`,
  codeInline: (text) => html`<span>
    <span class=${classes.highlightPunctuation}>${'`'}</span>
    <span class=${classes.highlightCodeInline}>${text}</span>
    <span class=${classes.highlightPunctuation}>${'`'}</span>
  </span>`,
  heading: (text) => html`<span>
    <span class=${classes.highlightHeadingPunctuation}># </span>
    <span class=${classes.highlightHeading}>${text}</span>
  </span>`,
  link: (text, href) => html`<span>
    <span class=${classes.highlightPunctuation}>[</span>
    ${text}
    <span class=${classes.highlightPunctuation}>]</span>
    <span class=${classes.highlightPunctuation}>(</span>
    <a href=${href}>${href}</a>
    <span class=${classes.highlightPunctuation}>)</span>
  </span>`,
  list: (items) => html`<span>${items}</span>`,
  listItem: (text) => html`<span>
    <span class=${classes.highlightPunctuation}>- </span>
    ${text}
  </span>`,
  paragraph: (text) => html`<span>${text}</span>`
})

const remove = (commit, post) => async (e) => {
  e.preventDefault()

  try {
    if (post.slug != null) {
      const res = await fetch('/content/posts/index.json', {headers})

      const posts = await res.json()

      const index = posts.findIndex((p) => p.slug === post.slug)

      if (index > -1) {
        posts.splice(index, 1)

        await fetch('/content/posts/index.json', {
          method: 'POST',
          headers,
          body: JSON.stringify(posts)
        })
      }

      await fetch(`/content/posts/${post.slug}.json`, {headers, method: 'DELETE'})

      window.location.hash = '#'
    }
  } catch (error) {
    commit((state) => {
      state.error = error

      return state
    })
  }
}

const cancel = (commit) => async (e) => {
  e.preventDefault()

  commit((state) => {
    state.post = null

    state.highlights = null

    return state
  })
}

const save = (commit, post) => async (e) => {
  e.preventDefault()

  const data = clone(post)

  for (const [key, val] of new FormData(e.currentTarget)) {
    data[key] = val
  }

  try {
    const res = await fetch('/content/posts/index.json', {headers})

    const posts = await res.json()

    if (data.date == null) {
      const now = new Date()

      data.date = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
    }

    if (data.slug == null) {
      data.slug = slugify(data.title)

      const {title, date, slug} = data

      posts.unshift({title, date, slug})
    } else {
      const index = posts.findIndex((post) => post.slug === data.slug)

      const {title, date, slug} = data

      posts.splice(index, 1, {title, date, slug})
    }

    data.content = data.content.replace(/\r/g, '')

    await fetch('/content/posts/index.json', {
      method: 'POST',
      headers,
      body: JSON.stringify(posts)
    })

    await fetch(`/content/posts/${data.slug}.json`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    })

    window.location.hash = '#'
  } catch (error) {
    commit((state) => {
      state.error = error

      return state
    })
  }
}

const highlight = (commit) => (e) => {
  commit((state) => {
    state.highlights = e.currentTarget.value

    return state
  })
}

const lowerZindex = (e) => {
  if (e.key === 'Meta') {
    const current = Number(e.currentTarget.style.getPropertyValue('--z-index'))

    e.currentTarget.style.setProperty('--z-index', current === 0 ? -1 : 0)
  }
}

const resetZindex = (e) => {
  e.currentTarget.style.setProperty('--z-index', 0)
}

const component = ({state, commit}) => html`<body class=${classes.app} onkeydown=${lowerZindex} onkeyup=${resetZindex}>
  <header hidden=${state.post || state.error} class=${classes.header}>
    <h1 class=${classes.headerHeading}>Posts</h1>
    <div class=${classes.headerTextButtons}>
      <a class=${classes.createButton} href="#/posts/create">New</a>
    </div>
  </header>
  <div hidden=${state.post || state.error} class=${classes.tableWrap}>
    <table class=${classes.table}>
      <thead>
        <tr>
          <th class=${classes.th}>Title</th>
          <th class=${classes.th}>Date</th>
          <th class=${classes.th} />
        </tr>
      </thead>
      <tbody>
        ${state.posts.map((post) => html`<tr>
          <td class=${classes.td}>${post.title}</td>
          <td class=${classes.td}>${new Date(post.date).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'})}</td>
          <td class=${classes.td}>
            <a class=${classes.textButton} href=${`#/posts/edit/${post.slug}`}>Edit</a>
            <a class=${classes.textButton} href=${`/posts/${post.slug}`}>View</a>
            <button class=${classes.deleteButton} onclick=${remove(commit, post)}>Delete</button>
          </td>
        </tr>`)}
      </tbody>
    </table>
  </div>
  ${state.post
  ? html`<form class=${classes.form} onsubmit=${save(commit, state.post)} method="POST">
      <label class=${classes.labelLarge} for="Title">Title</label>
      <input class=${classes.inputLarge} name="title" id="Title" value=${state.post.title} oninput=${(e) => commit((state) => { state.post.title = e.currentTarget.value; return state })} />
      <label class=${classes.label} for="Content">Content</label>
      <div class=${classes.textareaWrap}>
        <div class=${classes.textareaHighlightsWrap}>
          <pre class=${classes.textareaHighlights}>${highlighter(state.highlights)}</pre>
        </div>
        <textarea class=${classes.textarea} name="content" id="Content" oninput=${highlight(commit)}>${state.post.content}</textarea>
      </div>
      <div class=${classes.formButtons}>
        <a class=${classes.cancelButton} href="#/">Cancel</a>
        <button class=${classes.saveButton} type="submit">Save</button>
      </div>
    </form>`
  : null}
  ${state.error
  ? html`<div>
    <h1 class=${classes.headerHeading}>${state.error.message}</h1>
    <pre class=${classes.stackTrace}>${state.error.stack}</pre>
  `
  : null}
</body>`

const commit = render({state, update, component})

window.onpopstate = () => {
  dispatchLocation(commit, document.location.hash.substring(1))
}

dispatchLocation(commit, document.location.hash.substring(1))
