import DataService, { FacetService } from '/src/common/loadData.js'

import SidebarFacet from '/src/components/sidebar-facet.js'
import Header from '/src/components/header/header.js'
import Search from '/src/components/search.js'
import SearchResults from '/src/components/search-results.js'
import { searchResultsStore } from '/src/stores/searchResultsStore.js'
import { createApp } from 'vue'

await DataService.init()

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
    'sidebar-facet': SidebarFacet,
    'app-header': Header,
    'app-search': Search,
    'app-search-results': SearchResults,
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
    searchResults() {
      return searchResultsStore.results
    },
    hasSearchResults() {
      return this.searchResults.length > 0;
    }
  },
  mounted() {
    console.log('Application mounted. ')
  },
})
App.mount('main')
