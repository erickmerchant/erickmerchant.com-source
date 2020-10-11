#!/usr/bin/env node
import del from 'del'
import {promisify} from 'util'
import fs from 'fs'
import cheerio from 'cheerio'
import execa from 'execa'
import {stringify} from '@erickmerchant/framework/stringify.js'
import {html} from '@erickmerchant/framework/main.js'
import {createComponent} from './src/component.js'
import {contentComponent} from './src/common.js'

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const options = {stdio: 'inherit', preferLocal: true}
const command = process.argv[2]

const program = async () => {
  try {
    if (command === 'start') {
      execa('css', ['src/styles.js', 'src/css/styles', '-wd'], options)

      execa(
        'css',
        ['src/editor/styles.js', 'src/editor/css/styles', '-wd'],
        options
      )

      execa('dev', ['serve', 'src', '-de', 'dev.html'], options)
    }

    if (command === 'build') {
      await Promise.all([
        execa('css', ['src/styles.js', 'src/css/styles'], options),
        execa('dev', ['cache', 'src', 'dist'], options)
      ])

      await del(['./dist/editor/', './dist/editor.html'])

      const {classes} = await import('./src/css/styles.js')

      const paths = {
        index: './dist/index.html',
        styles: './dist/css/styles.css'
      }

      const state = {route: '', title: ''}
      const component = createComponent({
        classes,
        contentComponent,
        mainComponent: () =>
          html`
            <article></article>
          `,
        anchorAttrs: (href) => {
          return {href}
        }
      })

      const view = component(state)

      const [index, styles] = await Promise.all(
        [paths.index, paths.styles].map((path) => readFile(path, 'utf8'))
      )

      const styleHTML = `<style>${styles}</style>`

      const $ = cheerio.load(index)

      $('link[rel="stylesheet"]').replaceWith(styleHTML)

      $('body')
        .attr(
          'class',
          view.variables[
            view.attributes.find((attr) => attr.key === 'class').value
          ]
        )
        .html(stringify(view))

      await writeFile(paths.index, $.html())

      await execa('rollup', ['-c', 'rollup.config.js'], options)
    }
  } catch (error) {
    console.error(error)

    process.exit(1)
  }
}

program()
