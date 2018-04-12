const config = require('node-config-yaml').load('./webpack/config.yml')

// console.log(config)

let entry = {}
function addEntry (config) {
  console.log(config.entry.templates)
  for (var keyName in config.entry.templates) {
    console.log(keyName)
    if (config.entry.templates.hasOwnProperty(keyName)) {
      entry[keyName] = keyName
    }
  }
}

addEntry(config)

console.log(entry)
