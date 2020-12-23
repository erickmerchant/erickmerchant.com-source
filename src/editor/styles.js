const fontWeights = {
  heading: 700,
  bold: 500,
  normal: 300
}

const borderRadius = '3px'

export const _start = `
  @font-face {
    font-display: fallback;
    font-family: "Fira Code";
    font-style: normal;
    font-weight: 300 700;
    src: url("/fonts/Fira_Code/FiraCode-VariableFont_wght-subset.woff2") format("woff2");
  }

  * {
    box-sizing: border-box;
    max-width: 100%;
    margin: 0;
    padding: 0;
    font: inherit;
  }

  html {
    font-family: "Fira Code", monospace;
    height: 100%;

    --black: hsl(100, 10%, 20%);
    --gray: hsl(100, 10%, 70%);
    --silver: hsl(100, 10%, 85%);
    --white: hsl(100, 10%, 100%);
    --green: hsl(100, 30%, 50%);
    --blue: hsl(200, 100%, 50%);
    --red: hsl(350, 80%, 55%);
  }

  @media (prefers-color-scheme: dark) {
    html {
      --black: hsl(100, 10%, 100%);
      --gray: hsl(100, 10%, 60%);
      --silver: hsl(100, 10%, 40%);
      --white: hsl(100, 10%, 20%);
      --green: hsl(100, 50%, 60%);
      --blue: hsl(200, 100%, 60%);
      --red: hsl(350, 80%, 65%);
    }
  }
`

const headerHeading = `
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  font-size: 1.5em;
  font-weight: ${fontWeights.heading};
`

const button = `
  appearance: none;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  padding-right: 1.5em;
  padding-left: 1.5em;
  border: none;
  border-radius: ${borderRadius};
  border: 1px solid var(--blue);
  background-color: var(--blue);
  color: var(--white);
  font-weight: ${fontWeights.bold};
  text-decoration: none;
  cursor: pointer;

  :focus, :hover {
    filter: saturate(2);
    outline: 0;
  }
`

const textButton = `
  appearance: none;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  padding-right: 1.5em;
  padding-left: 1.5em;
  background-color: transparent;
  border: 1px solid var(--white);
  border-radius: ${borderRadius};
  box-shadow: none;
  color: var(--blue);
  font-weight: ${fontWeights.bold};
  text-decoration: none;
  cursor: pointer;
  text-align: center;
  display: inline-block;

  :hover {
    text-decoration: none;
  }

  :focus {
    outline: 0;
    border: 1px solid currentcolor;
    filter: saturate(2);
  }
`

const label = `
  display: block;
  margin-bottom: 0.5em;
  font-weight: ${fontWeights.bold};
`

const input = `
  width: 100%;
  padding: 0.5em;
  border-radius: ${borderRadius};
  border: 1px solid var(--silver);
  background-color: var(--white);
  color: var(--black);
`

export const layoutClasses = {
  app: `
    max-width: 100vw;
    line-height: 1.5;
    font-size: 16px;
    font-weight: ${fontWeights.normal};
    color: var(--black);
    background-color: var(--white);
    overflow-x: scroll;
    height: 100%;

    --z-index: 0;
  `
}

export const listClasses = {
  headerHeading,
  createButton: button,
  textButton,
  tableContainer: `
    padding: 1em;
    height: 100%;
  `,
  table: `
    width: 100%;
    border-collapse: collapse;
    border: 5px solid transparent;
  `,
  th: `
    padding: 1em;
    border-bottom: 1px solid var(--silver);
    text-align: left;
    font-weight: ${fontWeights.bold};
  `,
  td: `
    padding: 1em;
  `,
  tableControls: `
    padding-top: 1em;
    padding-bottom: 1em;
    text-align: center;
  `,
  editButton: textButton,
  viewButton: textButton,
  deleteButton: `
    ${textButton}

    color: var(--red);
  `,
  tableButtons: `
    justify-content: flex-end;
    display: flex;
    gap: 1em;
    position: sticky;
    bottom: 0;
    background: var(--white);
    border-top: 1px solid var(--silver);
    padding: 1em;
  `
}

export const formClasses = {
  form: `
    display: grid;
    grid-template-rows: 1fr max-content;
    height: 100%;
  `,
  formFields: `
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5em;
    padding: 1em;
    height: max-content;
  `,
  formRow: `
    grid-column: span 2;
  `,
  labelLarge: `
    ${label}

    font-size: 1.125em;
  `,
  inputLarge: `
    ${input}

    font-size: 1.5em;
    font-weight: ${fontWeights.heading};
  `,
  label,
  input,
  inputReadOnly: `
    ${input}

    background-color: var(--silver);
  `,
  textareaWrap: `
    position: relative;
    width: 100%;
    margin-right: auto;
    margin-left: auto;
    border-radius: ${borderRadius};
    border: 1px solid var(--silver);
  `,
  textareaHighlightsWrap: `
    min-height: 15em;
    padding: 0.5em;
  `,
  textareaHighlights: `
    min-height: 15em;
    overflow: auto;
    border-radius: 0;
    background-color: transparent;
    white-space: pre-wrap;
    word-break: break-word;
    color: var(--black);
  `,
  textarea: `
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: var(--z-index);
    width: 100%;
    height: 100%;
    padding: 0.5em;
    overflow: hidden;
    border: none;
    border-radius: ${borderRadius};
    background-color: transparent;
    color: transparent;
    caret-color: var(--black);
    word-break: break-word;
    resize: none;
  `,
  formButtons: `
    justify-content: flex-end;
    display: flex;
    gap: 1em;
    position: sticky;
    bottom: 0;
    background: var(--white);
    border-top: 1px solid var(--silver);
    padding: 1em;
  `,
  cancelButton: textButton,
  saveButton: button
}

export const highlightClasses = {
  punctuation: `
    color: var(--gray);
    font-weight: ${fontWeights.normal};
  `,
  bold: `
    font-weight: ${fontWeights.bold};
  `,
  url: `
    color: var(--blue);
  `,
  codeBlock: `
    white-space: pre-wrap;
    color: var(--green);
    font-weight: ${fontWeights.normal};
  `,
  codeInline: `
    color: var(--green);
    font-weight: ${fontWeights.normal};
  `,
  heading: `
    color: var(--black);
    font-weight: ${fontWeights.heading};
  `,
  headingPunctuation: `
    color: var(--gray);
    font-weight: ${fontWeights.heading};
  `
}

export const errorClasses = {
  errorContainer: `
    padding: 1em;
    height: 100%;
  `,
  headerHeading,
  stackTrace: `
    color: var(--red);
    white-space: pre-wrap;
    word-break: break-word;
  `
}
