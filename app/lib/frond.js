const yaml = require('js-yaml')
const fs = require('fs')
const path = require('path')

const open = require('open')
const express = require('express')
const bodyParser = require('body-parser')

function checkActivePlugins (data) {
  data = data || []
  let plugins = []
  for (let index = 0; index < data.length; index++) {
    const section = data[index]

    if (section.cards !== undefined) {
      for (let i = 0; i < section.cards.length; i++) {
        const card = section.cards[i]
        if (card.check === true) {
          plugins.push(card.plugin_name)
        }
      }
    }
  }
  return plugins
}

function readPluginsDir (dir, data) {
  data = data || []
  let dirFiles = fs.readdirSync(dir)

  for (let index = 0; index < dirFiles.length; index++) {
    dirFiles[index] = path.join(dir, dirFiles[index])

    if (dirFiles[index].endsWith('.config')) {
      if (fs.existsSync(dirFiles[index])) {
        let keyName = (/([ \w-]+?(?=\.))/.exec(dirFiles[index])[1])
        data[keyName] = path.join(dirFiles[index])
      }
    } else {
      if (fs.statSync(dirFiles[index]).isDirectory()) {
        readPluginsDir(dirFiles[index], data)
      }
    }
  }
  return data
}

function setupClient (components, tools) {
  for (var key in tools) {
    var pluginData = yaml.safeLoad(fs.readFileSync(tools[key], 'utf8'))

    for (let index = 0; index < components.length; index++) {
      if (components[index].title === pluginData.type) {
        components[index].cards = []
        var card = {}
        card.title = pluginData.title
        card.plugin_name = pluginData.plugin_name
        if (pluginData.icon !== undefined) {
          card.src = 'images/' + pluginData.title + '-logo.png'
          let imgSource = path.dirname(tools[key]) + '/' + pluginData.icon
          fs.createReadStream(path.resolve(__dirname, imgSource)).pipe(fs.createWriteStream(path.resolve(__dirname, '../client/images/', pluginData.title + '-logo.png')))
        } else {
          card.src = 'images/dump.png'
        }

        if (pluginData.default === undefined) {
          card.check = false
        } else {
          card.check = true
        }

        components[index].cards.push(card)
        components[index].check = true
      }
    }
  }

  fs.writeFileSync(path.resolve(__dirname, '../client/config.json'), JSON.stringify(components))
}

function installPlugins () {
  var components = yaml.safeLoad(fs.readFileSync(path.resolve(__dirname, '../plugins/config/components.yml'), 'utf8'))
  var tools = readPluginsDir(path.resolve(__dirname, '../plugins'))

  setupClient(components, tools)
}

function getActivePluginsDir () {
  var tools = readPluginsDir(path.resolve(__dirname, '../plugins'))
  var activePlugins = checkActivePlugins(require('./../../frond/frond.config.json'))
  var activePluginsDir = []

  for (let index = 0; index < activePlugins.length; index++) {
    const plugin = activePlugins[index]
    for (const key in tools) {
      if (key === plugin) {
        activePluginsDir.push(path.dirname(tools[key]))
      }
    }
  }
  return activePluginsDir
}

function getPluginConfig (paths) {
  var pluginData = yaml.safeLoad(fs.readFileSync(path.resolve(__dirname, paths), 'utf8'))
  return pluginData
}

function installFrond () {
  console.log('FROND install')
  // install base config
  var base = getPluginConfig(path.resolve(__dirname, '../plugins/config/base.config'))

  // console.log(require(path.resolve(__dirname, '../../package.json')).devDependencies)

  fs.createReadStream(path.resolve(__dirname, '../plugins/config/webpack.config.js')).pipe(fs.createWriteStream('./frond/webpack.config.js'))
  // console.log(base)

  var activePluginsDir = getActivePluginsDir()
  console.log(activePluginsDir)

  checkPackageJson()
}

function checkDefaultConfig () {
  if (fs.existsSync('frond.config.yml')) {
  } else {
    fs.appendFile('frond.config.yml', 'Hello content!', function (err) {
      if (err) throw err
      console.log('Saved!')
    })
  }
}

function client () {
  installPlugins()

  const app = express()
  const port = 8000

  app.use(bodyParser.json())
  app.use(express.static(path.resolve(__dirname, '../client')))

  app.get('/', (request, response) => {
    response.sendFile(path.resolve(__dirname, '../client/index.html'))
  })

  app.post('/', (request, response) => {
    checkDefaultConfig()
    response.send('FROND config file created!')
  })

  app.post('/generate', (request, response) => {
    console.log('FROND setup')
    if (!fs.existsSync('./frond/')) {
      fs.mkdirSync('./frond/')
    }
    fs.writeFileSync('./frond/frond.config.json', JSON.stringify(request.body), {flag: 'w+'})
    installFrond()
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

function checkPackageJson () {
  if (fs.existsSync('package.json')) {
    console.log('exist')
  } else {
    console.log('not exist')
    createPackageJson()
  }
}

function createPackageJson () {
  var packageJson = {
    name: 'name',
    version: '0.0.1',
    description: 'frond generate',
    main: 'index.js',
    author: ''
  }

  fs.writeFileSync('./_package.json', JSON.stringify(packageJson, null, ' '))
}

module.exports.installPlugins = installPlugins
module.exports.installFrond = installFrond
module.exports.client = client

installFrond()