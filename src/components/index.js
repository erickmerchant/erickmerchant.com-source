import {html} from '@erickmerchant/framework/main.js'

export const indexComponent = ({mainComponent}) => (state) => html`
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="The personal site of Erick Merchant." />
      <link
        rel="preload"
        href="/fonts/Public_Sans/PublicSans-VariableFont_wght-subset.woff2"
        as="font"
        type="font/woff2"
        crossorigin
      />
      <link
        rel="preload"
        href="/content/posts/index.json"
        as="fetch"
        crossorigin
      />
      <style>
        ${state.styles}
      </style>
      <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      <title>A Web Development Blog</title>
      <script src="/app.js" type="module"></script>
    </head>
    ${mainComponent(state)}
  </html>
`
