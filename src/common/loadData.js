import { createIndex } from './lunrIndex.js'

const elasticlunr = window.elasticlunr
const dataSource = '/src/data/scriptarrayseason1.json'
const episodeDataSource = '/src/data/seinfeldEpisodes.json'
const imageDataSource = '/src/data/characterImages.json'
//const dataSource = '/src/data/scriptarray.json'

let data, loadedIndex, episodeData, imageData
let facets = {}

const DataService = {
  async init() {
    const res = await fetch(dataSource)
    data = await res.json()
    loadIndex(data)
    loadEpisodes()
    loadImages()
    return data
  },

  //I think these should be moved to the store since that is what will have to be changed to update the view

  filter(propertyName, filterValue) {
    //get that property from the
    //on filter added, run
  },

  query(searchQuery) {
    let results = loadedIndex.search(searchQuery, {
      bool: 'OR',
      expand: true,
    })
    return results
  },
  allSortedByPopularity() {
    let sortedList = data.sort((a, b) =>
      (b.popularity - a.popularity)
    );
    console.log(sortedList)
    return sortedList
  }
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
export const EpisodeService = {
  getEpisodeBySeid(seid) {
    let episodes = episodeData.filter((x) => x.seid === seid)
    if (episodes.length !== 1) {
      throw 'More than one episode had that SEID'
    }
    let episode = episodes[0];
    episode.season = episode.seid.substring(1, 3);
    return episode
  },
}
export const ImageService = {
  getImagePathByCharacter(character) {
    let images = imageData.filter(
      (x) => x.character === character.toUpperCase(),
    )
    if (images.length !== 1) {
      //character not found, return does not exist avatar
      images[0] = imageData[0]
    }
    return images[0]
  },
}

function getAllCharacterCounts() {
  var lookup = {}
  var items = data
  var characterResult = []

  for (var item, i = 0; (item = items[i++]);) {
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
  console.log("loaded index")
  console.log(loadedIndex)
}

async function loadEpisodes() {
  const res = await fetch(episodeDataSource)
  episodeData = await res.json()
}
async function loadImages() {
  const res = await fetch(imageDataSource)
  imageData = await res.json()
}
