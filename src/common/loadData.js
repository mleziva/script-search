import { createIndex } from '../common/lunrindex.js'

const elasticlunr = window.elasticlunr
const dataSource = '/src/data/scriptarrayseason1.json'

let data, loadedIndex
let facets = {}

const DataService = {
  async init() {
    const res = await fetch(dataSource)
    data = await res.json()
    loadIndex(data)
    return data
  },

  filter() {
    Vue.axios.defaults.headers.common[
      'Authorization'
    ] = `Token ${JwtService.getToken()}`
  },

  query(searchQuery) {
    let results = loadedIndex.search(searchQuery, {
      bool: 'OR',
      expand: true,
    })
    return results
  },
}

export default DataService

export const FacetService = {
  loadCharacters() {
    console.log('load characters called')
    return getAllCharacterCounts()
  },
  remove(slug) {
    return ApiService.delete(`articles/${slug}/favorite`)
  },
}

function getAllCharacterCounts() {
  var lookup = {}
  var items = data
  var characterResult = []

  for (var item, i = 0; (item = items[i++]); ) {
    var character = item.character
    //don't include actions
    if (character.includes('(')) {
      continue
    }
    if (!(character in lookup)) {
      lookup[character] = 1
      characterResult.push(character)
    } else {
      lookup[character] = lookup[character] + 1
    }
  }
  const sorted = Object.entries(lookup)
    .sort(([, v1], [, v2]) => v2 - v1)
    .slice(0, 10)
    .reduce(
      (obj, [k, v]) => ({
        ...obj,
        [k]: v,
      }),
      {},
    )

  facets.characters = sorted
  return sorted
}

function loadIndex(index) {
  var rawIndex = createIndex(index)
  loadedIndex = elasticlunr.Index.load(rawIndex)
}
