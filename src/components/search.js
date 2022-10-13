import DataService from '../common/loadData.js'
import SearchResults from './search-results.js'
import { searchResultsStore } from '../stores/searchResultsStore.js'
export default {
  name: 'Search',
  components: {
    SearchResults,
  },
  data() {
    return {
      searchQuery: null,
      message: '',
    }
  },
  computed: {
    searchResults() {
      var results = DataService.query(this.searchQuery)
      searchResultsStore.results = results
      return results
    },
  },
  template: `
  <div class="w-3/4 mx-auto my-6">
        <input
        type="search"
        v-model="searchQuery"
        name=""
        id=""
        class="rounded p-2 w-full bg-grey-light border-grey-light focus:bg-white border border-solid focus:border-indigo-light text-blue-darkest block"
        placeholder="Enter a search here!"
        />
    <div class="block" >
        <span v-if="searchQuery && searchResults.length > 1 ">{{searchResults.length}} results</span/>
        <span v-else> Try searching for something like "These Pretzels are making me thirsty" </span>
    </div>
</div>
    `,
}
