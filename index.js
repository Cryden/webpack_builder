const config = require('node-config-yaml').load('./webpack/config.yml')
const path = require('path')

// console.log(config)
let cf = {}
let entry = {}
function addEntry (config) {
  config.entry.javascript.forEach(function (item) {
    entry[item] = path.join(config.path.source, config.path.entry, item + '.js')
  })
  cf.entry = entry
}

addEntry(config)

console.log(cf)
