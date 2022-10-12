import ButtonCounter from '/src/components/ButtonCounter.js'
import Header from '/src/components/header/header.js'
import DataService, { FacetService } from '/src/common/loadData.js'

await DataService.init()

const { createApp } = Vue
// console.log(charactersResultsObject)
const App = createApp({
  data() {
    return {
      endpoint: 'https://jsonplaceholder.typicode.com/posts',
      posts: [],
      searchQuery: null,
      facet: [],
      checkedProducts: [],
      itemtest: ['test', 'adsf'],
      characters: FacetService.loadCharacters(),
    }
  },
  components: {
    buttoncounter: ButtonCounter,
    'app-header': Header,
  },
  methods: {
    fetchposts() {
      fetch(this.endpoint)
        .then((blob) => blob.json())
        .then((data) => this.posts.push(...data))
    },
  },
  computed: {
    filterPosts() {
      return this.posts.filter((result) => {
        const myRegex = new RegExp(this.searchQuery, 'gi')
        let resultFacet = this.facet
        if (resultFacet.length == 0) {
          return result.title.match(myRegex) || result.body.match(myRegex)
        }
        return (
          (result.title.match(myRegex) || result.body.match(myRegex)) &&
          resultFacet.includes(result.userId)
        )
      })
    },
  },
  mounted() {
    console.log('Application mounted.')
    this.fetchposts()
  },
})
App.mount('main')
