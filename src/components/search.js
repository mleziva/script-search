import { searchResultsStore } from '../stores/searchResultsStore.js'
export default {
  name: 'Search',
  data() {
    return {
      searchQuery: null,
    }
  },
  computed: {
    searchResults() {
      return searchResultsStore.results
    },
  },
  watch: {
    searchQuery() {
      searchResultsStore.executeSearch(this.searchQuery)
    },
  },
  methods: {
    debounceSearch(event) {
      var searchTerms = event.target.value;
      //this.searchQuery = null
      if(!searchTerms){
        this.searchQuery = null
        console.log("er")
        searchResultsStore.allByPopularity()
      }
      else{
        clearTimeout(this.debounce)
        document.getElementById('loading').style.display = 'inline-block'
        this.debounce = setTimeout(() => {
          this.searchQuery = event.target.value
          document.getElementById('loading').style.display = 'none'
        }, 600)
      }

    },
  },
  template: `
  <div class="flex">
    <div class="w-full mx-auto">
      <input
      type="search"
      @input="debounceSearch"
      name=""
      id=""
      class="rounded p-2 w-full bg-grey-light border-grey-light focus:bg-white border border-solid focus:border-indigo-light text-blue-darkest block"
      placeholder="Enter a search here!"
      />
      <div>
          <span v-if="searchQuery && searchResults.length > 0 ">{{searchResults.length}} results</span>
          <span v-else-if="searchQuery">No results for {{searchQuery}} </span>
          <span v-else> Try searching for something like "These Pretzels are making me thirsty" </span>
      </div>
    </div>
  </div>
    `,
}
