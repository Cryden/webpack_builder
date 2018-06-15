const yaml = require('js-yaml')
const fs = require('fs')
const path = require('path')

installPlugins()

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
          fs.createReadStream(path.resolve(__dirname, imgSource)).pipe(fs.createWriteStream(path.resolve(__dirname, '../client/images/') + pluginData.title + '-logo.png'))
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

  for (let index = 0; index < activePlugins.length; index++) {
    const plugin = activePlugins[index]
    for (const key in tools) {
      if (key === plugin) {
        var activePluginsDir = path.dirname(tools[key])
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
  // install base config
  var base = getPluginConfig(path.resolve(__dirname, '../plugins/config/base.config'))

  console.log(require(path.resolve(__dirname, '../../package.json')).devDependencies)

  fs.createReadStream(path.resolve(__dirname, '../plugins/config/webpack.config.js')).pipe(fs.createWriteStream('./frond/webpack.config.js'))
  console.log(base)

  var activePluginsDir = getActivePluginsDir()
  console.log(activePluginsDir)
}

installFrond()
