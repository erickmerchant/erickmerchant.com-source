import {createPostsModel} from '../common.js'

export const slugify = (str) =>
  str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '-')

const fetch = async (url, options) => {
  const res = await window.fetch(url, options)

  if (res.status >= 300) {
    throw Error(`${res.status} ${res.statusText}`)
  }

  return res
}

export const createModel = (listEndpoint) => {
  return {
    ...createPostsModel(fetch, listEndpoint),

    async saveAll(data) {
      await fetch(listEndpoint, {
        headers: {'Content-Type': 'application/json'},
        method: 'PUT',
        body: JSON.stringify(data)
      })
    },

    async saveAs(channelName, data) {
      const subModel = createModel(`/content/${channelName}.json`)

      await this.remove(data.slug)

      await subModel.save(data, false)
    },

    async save(data, existing = data.slug != null) {
      const posts = await this.getAll()

      const index = existing
        ? posts.findIndex((post) => post.slug === data.slug)
        : -1

      if (!data.date) {
        const now = new Date()

        data.date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
          2,
          '0'
        )}-${String(now.getDate()).padStart(2, '0')}`
      }

      data.slug = data.slug ?? slugify(data.title)

      data.content = data.content.replace(/\r/g, '')

      const {title, date, slug} = data

      if (!~index) {
        posts.unshift({title, date, slug})
      } else {
        posts.splice(index, 1, {title, date, slug})
      }

      await fetch(`/content/${data.slug}.json`, {
        headers: {'Content-Type': 'application/json'},
        method: existing ? 'PUT' : 'POST',
        body: JSON.stringify(data.content)
      })

      await this.saveAll(posts)
    },

    async remove(id) {
      const posts = await this.getAll()

      const index = posts.findIndex((p) => p.slug === id)

      if (~index) {
        posts.splice(index, 1)

        await this.saveAll(posts)

        await fetch(`/content/${id}.json`, {
          method: 'DELETE'
        })
      }
    }
  }
}