'use strict'

const path = require('path')
const directory = require('./directory.js')
const express = require('express')
const _static = require('express-static')
const morgan = require('morgan')
const portfinder = require('portfinder')

module.exports = function serve () {
  return new Promise(function (resolve, reject) {
    portfinder.getPort(function (err, port) {
      if (err) {
        reject(err)
      } else {
        const app = express()

        app.use(morgan('dev'))

        app.use(_static(directory))

        app.use(function (req, res, next) {
          res.status(404)

          if (req.accepts('html')) {
            res.sendFile(path.resolve(directory, '404.html'), {}, function (err) {
              if (err) {
                res.type('txt').send('Not found')
              }
            })
          }
        })

        app.listen(port, function () {
          console.log('server is running at %s', port)

          resolve()
        })
      }
    })
  })
}