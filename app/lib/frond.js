// const data = require('./../../frond.config.json')
// const nodeConfigYaml = require('node-config-yaml')
const yaml = require('js-yaml')
const fs = require('fs')
const path = require('path')

let plugins = []

// function checkedPlugins (data) {
//   for (let index = 0; index < data.length; index++) {
//     const section = data[index]

//     for (let index = 0; index < section.cards.length; index++) {
//       const card = section.cards[index]
//       if (card.check === true) {
//         plugins.push(card.title)
//       }
//     }
//   }
//   return plugins
// }

// checkedPlugins(data)

// console.log(plugins)

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

  console.log('components:', components)
  console.log('tools:', tools)
}

init()

console.log('plugins:', plugins)
