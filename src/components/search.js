import { searchResultsStore } from '../stores/searchResultsStore.js'
export default {
  name: 'Search',
  data() {
    return {
      searchQuery: null,
      message: '',
    }
  },
  computed: {
    searchResults() {
      return searchResultsStore.results
    },
  },
  watch: {
    searchQuery() {
      console.log('test1')
      searchResultsStore.executeSearch(this.searchQuery)
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
        <span v-if="searchQuery && searchResults.length > 0 ">{{searchResults.length}} results</span>
        <span v-else> Try searching for something like "These Pretzels are making me thirsty" </span>
    </div>
</div>
    `,
}
