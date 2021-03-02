import {html} from '@erickmerchant/framework/main.js'

export const createLayoutView = ({
  classes,
  aboutView,
  mainView,
  anchorAttrs
}) => (state = {}) => html`
  <body class=${classes.app}>
    <header class=${classes.header}>
      <a ${anchorAttrs('/')} class=${classes.headerAnchor}>ErickMerchant.com</a>
    </header>
    ${mainView(state)}
    <div class=${classes.complementary}>${aboutView(state)}</div>
    <footer class=${classes.footer}>
      <ul class=${classes.footerList}>
        <li class=${classes.footerItem}>
          <a
            class=${classes.footerAnchor}
            href="https://github.com/erickmerchant/my-blog"
          >
            View Source
          </a>
        </li>
        <li class=${classes.footerItem}>
          ${`© ${new Date().getFullYear()} Erick Merchant`}
        </li>
      </ul>
    </footer>
  </body>
`
