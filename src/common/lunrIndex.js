//const elasticlunr = require('elasticlunr')

export function createIndex(collection) {
  var index = elasticlunr(function () {
    this.addField('character')
    this.addField('dialogue')
    this.addField('sceneNumber')
    this.addField('seid')
    this.addField('season')
    this.addField('popularity')
    this.setRef('id')
  })

  collection.forEach((item) => {
    // console.log(item)
    index.addDoc({
      id: item.id,
      character: item.character,
      dialogue: item.dialogue,
      sceneNumber: item.sceneNumber,
      seid: item.seid,
      season: item.seid.substr(1, 2), //gets the season number from seid for facet
      popularity: item.popularity,
    })
  })

  return index.toJSON()
}
