// const copydir = require('copy-dir')
// copydir.sync('node_modules/' + require('./../package.json').name + '/app/config', 'webpack')

const fs = require('fs')
const path = require('path')
const open = require('open')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const port = 8000

app.use(bodyParser.json())

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
  app.use(express.static(path.resolve(__dirname, './../client')))
  app.get('/', (request, response) => {
    response.sendFile(path.resolve(__dirname, './../client/index.html'))
  })

  app.post('/', (request, response) => {
    checkDefaultConfig()
    response.send('FROND config file created!')
  })

  app.post('/generate', (request, response) => {
    var data = JSON.stringify(request.body)
    console.log('FROND setup')
    fs.writeFileSync('frond.config.js', data)
    response.send('frond setup')
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
