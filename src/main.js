import {html} from '@erickmerchant/framework/main.js'

export const initialState = {route: '', title: ''}

const unfound = {
  route: 'error',
  title: 'Page Not Found',
  error: Error(
    "That page doesn't exist. It was either moved, removed, or never existed."
  )
}

export const dispatchLocation = async (app, fetch, segments) => {
  const posts = await fetch('/content/posts/index.json').then((res) =>
    res.json()
  )

  let index = -1

  try {
    if (segments.initial === 'posts') {
      index = posts.findIndex((post) => post.slug === segments.last)
    } else if (segments.all === '' && posts.length > 0) {
      index = 0
    }

    if (index > -1) {
      const post = Object.assign({}, posts[index])

      const response = await fetch(`/content/posts/${post.slug}.json`)

      const content = await response.json()

      post.content = content

      app.commit({
        route: 'post',
        title: `Posts | ${post.title}`,
        next: posts[index - 1],
        prev: posts[index + 1],
        post
      })
    } else {
      app.commit(unfound)
    }
  } catch (error) {
    app.commit({
      route: 'error',
      title: '500 Error',
      error
    })
  }
}

export const createComponent = (
  app,
  classes,
  fetch,
  {contentComponent, getSegments, prettyDate}
) => {
  const anchorAttrs = (href) => {
    return {
      href,
      onclick(e) {
        e.preventDefault()

        window.history.pushState({}, null, href)

        dispatchLocation(app, fetch, getSegments(href))

        window.scroll(0, 0)
      }
    }
  }

  const paginationItem = (obj, text) =>
    html`
      <li class=${obj ? classes.buttonEnabled : classes.buttonDisabled}>
        ${obj
          ? html`
              <a
                ${anchorAttrs(`/posts/${obj.slug}/`)}
                class=${classes.buttonAnchor}
              >
                ${text}
              </a>
            `
          : text}
      </li>
    `

  return (state) => html`
    <body class=${classes.app}>
      <header>
        <nav class=${classes.topNav}>
          <ul class=${classes.topNavList}>
            <li class=${classes.navListItem}>
              <a class=${classes.navAnchor} ${anchorAttrs('/')}>
                Erick Merchant
              </a>
            </li>
            <li class=${classes.navListItem}>
              <a
                class=${classes.navAnchor}
                href="https://github.com/erickmerchant"
              >
                Projects
              </a>
            </li>
          </ul>
        </nav>
      </header>
      ${() => {
        if (state.route === 'post') {
          return html`
            <article class=${classes.main}>
              <header>
                <h1 class=${classes.heading1}>${state.post.title}</h1>
                <time class=${classes.date} datetime=${state.post.date}>
                  <svg viewBox="0 0 32 32" class=${classes.dateIcon}>
                    <rect width="32" height="6" rx="0.5" />
                    <rect width="32" height="22" y="8" rx="0.5" />
                    <rect
                      width="8"
                      height="8"
                      y="12"
                      x="20"
                      rx="0.5"
                      fill="white"
                    />
                  </svg>
                  <span>
                    ${prettyDate(state.post.date)}
                  </span>
                </time>
              </header>
              ${contentComponent(state.post.content ?? '', {
                bold: (text) =>
                  html`
                    <strong class=${classes.strong}>${text}</strong>
                  `,
                codeBlock: (items) =>
                  html`
                    <pre
                      class=${classes.pre}
                    ><code class=${classes.codeBlock}>${items}</code></pre>
                  `,
                codeInline: (text) =>
                  html`
                    <code class=${classes.code}>${text}</code>
                  `,
                heading: (text) =>
                  html`
                    <h2 class=${classes.heading2}>${text}</h2>
                  `,
                link: (text, href) =>
                  html`
                    <a class=${classes.anchor} href=${href}>${text}</a>
                  `,
                list: (items) =>
                  html`
                    <ul class=${classes.list}>
                      ${items}
                    </ul>
                  `,
                listItem: (items) =>
                  html`
                    <li class=${classes.listItem}>${items}</li>
                  `,
                paragraph: (items) =>
                  items.length
                    ? html`
                        <p class=${classes.paragraph}>${items}</p>
                      `
                    : null
              })}
              ${state.prev || state.next
                ? html`
                    <nav>
                      <ul class=${classes.navList}>
                        ${paginationItem(state.prev, 'Older')}
                        ${paginationItem(state.next, 'Newer')}
                      </ul>
                    </nav>
                  `
                : null}
            </article>
          `
        }

        return html`
          <section class=${classes.main}>
            <h1 class=${classes.heading1}>${state.title ?? ''}</h1>
            <p class=${classes.paragraph}>${state.error?.message ?? ''}</p>
          </section>
        `
      }}
      ${state.route !== ''
        ? html`
            <footer class=${classes.footer}>
              <ul class=${classes.footerList}>
                <li class=${classes.navListItem}>
                  <a
                    class=${classes.navAnchor}
                    href="https://github.com/erickmerchant/my-blog"
                  >
                    View Source
                  </a>
                </li>
                <li class=${classes.navListItem}>
                  © ${new Date().getFullYear()} Erick Merchant
                </li>
              </ul>
            </footer>
          `
        : null}
    </body>
  `
}

export const setupApp = (app, fetch, getSegments) => {
  window.onpopstate = () => {
    dispatchLocation(app, fetch, getSegments(document.location.pathname))
  }

  dispatchLocation(app, fetch, getSegments(document.location.pathname))
}
