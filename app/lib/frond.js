const yaml = require('js-yaml')
const fs = require('fs')
const path = require('path')
const _ = require('lodash')

const open = require('open')
const express = require('express')
const bodyParser = require('body-parser')

// componets - group of plugins
let components = yaml.safeLoad(fs.readFileSync(path.resolve(__dirname, '../plugins/config/components.yml'), 'utf8'))
// tools - installed plugins
let tools = readPluginsDir(path.resolve(__dirname, '../plugins'))
// plugins - active plugins
let plugins = setPlugins()
// pluginsDependencies - active plugins dependenncies
let dependencies = getPluginDependencies()

/*
/  Read .yml files
*/
function readYml (paths) {
  return yaml.safeLoad(fs.readFileSync(path.resolve(__dirname, paths), 'utf8'))
}

/*
/  set Active Plugins
*/
function setPlugins () {
  let activePlugins = checkActivePlugins()
  let plugin = []

  for (let index = 0; index < activePlugins.length; index++) {
    const plugins = activePlugins[index]
    for (const key in tools) {
      if (key === plugins) {
        plugin[key] = tools[key]
      }
    }
  }
  return plugin
}

/*
/  Install All Plugins
*/
function installPlugins () {
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

/*
/  Return Active Plugin Dependencies
*/
function getPluginDependencies () {
  let dependencies = {}

  for (const key in plugins) {
    dependencies = _.assign(dependencies, getPluginConfig(plugins[key]).dependencies)
  }

  return dependencies
}

/*
/ Return Active Plugins name
*/
function checkActivePlugins () {
  let data = require('./../../frond/frond.config.json')
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

/*
/ Return All Plugins
*/
function readPluginsDir (dir, data) {
  data = data || []

  let dirFiles = fs.readdirSync(dir)

  for (let index = 0; index < dirFiles.length; index++) {
    dirFiles[index] = path.join(dir, dirFiles[index])

    if (dirFiles[index].endsWith('config.yml')) {
      if (fs.existsSync(dirFiles[index])) {
        let keyName = readYml(dirFiles[index]).plugin_name
        data[keyName] = path.dirname(dirFiles[index])
      }
    } else {
      if (fs.statSync(dirFiles[index]).isDirectory()) {
        readPluginsDir(dirFiles[index], data)
      }
    }
  }
  return data
}

/*
/ Return Plugin config
*/
function getPluginConfig (paths) {
  paths = paths + '/config.yml'
  var pluginData = readYml(paths)
  return pluginData
}

function installFrond () {
  console.log('FROND install')

  initPackageJson()

  addTasks()

  fs.createReadStream(path.resolve(__dirname, '../plugins/config/webpack.config.js')).pipe(fs.createWriteStream('./frond/webpack.config.js'))

  console.log('FROND installed')
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

function initPackageJson () {
  if (fs.existsSync('package.json')) {
    updatePackageJson()
  } else {
    createPackageJson()
  }
}

function createPackageJson () {
  var packageJson = {
    name: 'name',
    version: '0.0.1',
    description: 'frond generate',
    main: 'index.js',
    author: '',
    devDependencies: dependencies
  }

  fs.writeFileSync('./_package.json', JSON.stringify(packageJson, null, ' '))
}

function updatePackageJson () {
  var oldPackageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'))

  oldPackageJson.devDependencies = _.assign(oldPackageJson.devDependencies, dependencies)

  fs.writeFileSync('./_package.json', JSON.stringify(oldPackageJson, null, ' '))
}

function addTasks () {

}

module.exports.installPlugins = installPlugins
module.exports.installFrond = installFrond
module.exports.client = client

installFrond()
