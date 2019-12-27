const list = {
  display: 'flex',
  'flex-wrap': 'wrap',
  'text-align': 'center',
  color: 'white',
  'font-weight': 700,
  'padding-top': 'var(--spacing)',
  'padding-bottom': 'var(--spacing)',

  '--link-color': 'currentColor'
}

const listItem = {
  margin: 'var(--spacing)'
}

const button = {
  ...listItem,
  flex: 'calc(50% - (var(--spacing) * 2))',
  'font-size': 'var(--font-size-3)',
  padding: 'var(--spacing) calc(var(--spacing) * 3)',
  'border-radius': 'var(--border-radius)',
  'background-color': 'var(--primary-color)'
}

module.exports = {
  _before: `
    @font-face {
      font-display: swap;
      font-family: 'PT Sans';
      font-style: normal;
      font-weight: 400;
      src:
        local('PT Sans'),
        local('PTSans-Regular'),
        url('/fonts/pt-sans-v11-latin-regular.woff2') format('woff2'),
        url('/fonts/pt-sans-v11-latin-regular.woff') format('woff');
    }

    @font-face {
      font-display: swap;
      font-family: 'PT Sans';
      font-style: normal;
      font-weight: 700;
      src:
        local('PT Sans Bold'),
        local('PTSans-Bold'),
        url('/fonts/pt-sans-v11-latin-700.woff2') format('woff2'),
        url('/fonts/pt-sans-v11-latin-700.woff') format('woff');
    }

    @font-face {
      font-display: swap;
      font-family: 'PT Mono';
      font-style: normal;
      font-weight: 400;
      src:
        local('PT Mono'),
        local('PTMono-Regular'),
        url('/fonts/pt-mono-v7-latin-regular.woff2') format('woff2'),
        url('/fonts/pt-mono-v7-latin-regular.woff') format('woff');
    }

    * {
      box-sizing: border-box;
      font: inherit;
      line-height: 1.5;
      margin: 0;
      padding: 0;
      max-width: 100%;
    }

    html {
      height: 100%;
    }

    h1,
    h2 {
      line-height: 1.25;
      font-weight: bold;
      margin-bottom: calc(var(--spacing) / 2);
      margin-top: var(--spacing);
    }

    h1 {
      font-size: var(--font-size-1);
    }

    h2 {
      font-size: var(--font-size-2);
    }

    p,
    ul,
    pre {
      margin-top: var(--content-x-spacing, 0);
      margin-bottom: var(--content-x-spacing, 0);
    }

    ul {
      padding-left: var(--list-indent, 0);
      list-style: var(--list-style, none);
    }

    a {
      box-shadow: 0 0.1em 0 0 currentcolor;
      color: var(--link-color, var(--primary-color));
    }

    a,
    a:hover {
      text-decoration: none;
    }
  `,
  app: {
    '--spacing': '1em',
    '--font-size-1': '1.5em',
    '--font-size-2': '1.25em',
    '--font-size-3': '1.125em',
    '--font-size-5': '0.875em',
    '--border-radius': '0.25em',
    '--primary-color': 'hsl(120, 50%, 50%)',
    '--secondary-color': 'hsl(120, 25%, 50%)',
    '--neutral-color': 'hsl(120, 12.25%, 50%)',
    '--bright-color': 'hsl(120, 75%, 75%)',
    '--dark-color': 'hsl(120, 50%, 12.25%)',

    'font-family': '"PT Sans", sans-serif',
    'flex-direction': 'column',
    height: '100%',
    color: 'var(--dark-color)'
  },
  topNav: {
    'font-size': 'var(--font-size-3)',
    'background-color': 'var(--secondary-color)'
  },
  topNavList: {
    ...list,
    'justify-content': 'center'
  },
  date: {
    'font-weight': 700
  },
  main: {
    flex: 'auto',
    'max-width': '40em',
    width: '100%',
    'margin-right': 'auto',
    'margin-left': 'auto',
    'padding-right': 'var(--spacing)',
    'padding-left': 'var(--spacing)'
  },
  content: {
    '--list-indent': 'calc(var(--spacing) * 2)',
    '--content-x-spacing': 'var(--spacing)',
    '--list-style': 'disc'
  },
  pre: {
    'font-family': '"PT Mono", monospace',
    overflow: 'auto',
    'white-space': 'pre-wrap',
    'background-color': 'var(--dark-color)',
    color: 'var(--bright-color)',
    padding: 'var(--spacing)',
    'border-radius': 'var(--border-radius)'
  },
  list,
  listItem,
  button,
  buttonDisabled: {
    ...button,
    'background-color': 'var(--neutral-color)',
    '@media (max-width: 40em)': {
      display: 'none'
    }
  },
  footer: {
    'margin-top': 'calc(var(--spacing) * 4)',
    'background-color': 'var(--secondary-color)'
  },
  footerList: {
    ...list,
    'justify-content': 'center',
    'font-weight': 700,
    'font-size': 'var(--font-size-5)'
  }
}