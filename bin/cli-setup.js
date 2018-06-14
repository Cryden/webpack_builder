const fs = require('fs')
const path = require('path')
const open = require('open')
const express = require('express')
const bodyParser = require('body-parser')
const yaml = require('json2yaml')

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
  app.use(express.static(path.resolve(__dirname, '../app/client')))
  app.get('/', (request, response) => {
    response.sendFile(path.resolve(__dirname, '../app/client/index.html'))
  })

  app.post('/', (request, response) => {
    checkDefaultConfig()
    response.send('FROND config file created!')
  })

  app.post('/generate', (request, response) => {
    console.log('FROND setup')
    let ymlText = yaml.stringify(request.body)
    fs.writeFileSync('frond.config.yml', ymlText)
    fs.writeFileSync('frond.config.json', JSON.stringify(request.body))
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
