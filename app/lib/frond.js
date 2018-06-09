const data = require('./../../frond.config.json')

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

console.log(plugins)
