// const copydir = require('copy-dir')
// copydir.sync('node_modules/' + require('./../package.json').name + '/app/config', 'webpack')

const packageDir = 'node_modules/' + require('./../package.json').name
const fs = require('fs')
const path = require('path')
const open = require('open')
const express = require('express')
const app = express()

const port = 8000

function checkDefaultConfig () {
  if (fs.existsSync('frond.config.yml')) {
  } else {
    fs.appendFile('frond.config.yml', 'Hello content!', function (err) {
      if (err) throw err
      console.log('Saved!')
    })
  }
}

function init () {
  app.use(express.static(path.join(packageDir, 'app/client')))

  app.get('/', (request, response) => {
    response.sendFile(path.resolve(packageDir, 'app/client/index.html'))
  })

  app.post('/', (request, response) => {
    checkDefaultConfig()
    response.send('FROND config file created!')
  })

  app.listen(port, (err) => {
    if (err) {
      return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
  })

  open(`http://localhost:${port}`)
}

module.exports = init()
