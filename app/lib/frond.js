const data = require('./../../frond.config.json')
const yaml = require('js-yaml')
const fs = require('fs')
const path = require('path')

let plugins = []

function checkedPlugins (data) {
  for (let index = 0; index < data.length; index++) {
    const section = data[index]

    for (let index = 0; index < section.cards.length; index++) {
      const card = section.cards[index]
      if (card.check === true) {
        plugins.push(card.title)
      }
    }
  }
  return plugins
}

checkedPlugins(data)

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

function init () {
  var tools = readPluginsDir('app/plugins')
  var components = yaml.safeLoad(fs.readFileSync('app/plugins/config/components.yml', 'utf8'))

  for (var key in tools) {
    var pluginData = yaml.safeLoad(fs.readFileSync(tools[key], 'utf8'))
    // console.log(pluginData)

    for (let index = 0; index < components.length; index++) {
      if (components[index].title === pluginData.type) {
        components[index].cards = []
        var card = {}
        card.title = pluginData.title

        if (pluginData.icon !== undefined) {
          card.src = 'images/' + pluginData.title + '-logo.png'
          let imgSource = path.dirname(tools[key]) + '/' + pluginData.icon
          fs.createReadStream(imgSource).pipe(fs.createWriteStream('./app/client/images/' + pluginData.title + '-logo.png'))
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

  fs.writeFileSync('./app/client/config.json', JSON.stringify(components))

  // console.log('components:', components)
  // console.log('tools:', tools)
}

init()

// console.log('plugins:', plugins)
