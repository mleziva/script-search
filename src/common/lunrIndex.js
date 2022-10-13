//const elasticlunr = require('elasticlunr')

export function createIndex(collection) {
  var index = elasticlunr(function () {
    this.addField('character')
    this.addField('dialogue')
    this.addField('episodeNumber')
    this.addField('seid')
    this.addField('season')
    this.setRef('id')
  })

  collection.forEach((item) => {
    // console.log(item)
    index.addDoc({
      id: item.id,
      character: item.character,
      dialogue: item.dialogue,
      episodeNumber: item.episodeNumber,
      seid: item.seid,
      season: item.season,
    })
  })

  return index.toJSON()
}
