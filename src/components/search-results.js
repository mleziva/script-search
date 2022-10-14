import { searchResultsStore } from '../stores/searchResultsStore.js'

export default {
  name: 'SearchResults',
  props: {},
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
    }
  },
  watch: {
    searchResultsStoreResults() {
      //when the results change, reset page
      this.currentPage = 1
    },
  },
  computed: {
    searchResultsStoreResults() {
      return searchResultsStore.results
    },
    getResults() {
      return searchResultsStore.results
    },
    resultsCount() {
      return this.getResults.length
    },
    indexStart() {
      return (this.currentPage - 1) * this.pageSize
    },
    indexEnd() {
      return this.indexStart + this.pageSize
    },
    paginatedResults() {
      return Object.values(this.getResults).slice(
        this.indexStart,
        this.indexEnd,
      )
    },
    hasNextPage() {
      return this.indexEnd <= this.resultsCount
    },
    hasPreviousPage() {
      return this.indexStart > 0
    },
  },
  methods: {
    prev() {
      window.scrollTo(0, 0)
      this.currentPage--
    },
    next() {
      window.scrollTo(0, 0)
      this.currentPage++
    },
  },
  template: `
  <div v-if="resultsCount > 0 ">
    <div class="block" >
          <span >{{indexStart}} - {{indexEnd}} of {{resultsCount}} results</span>

    </div>
    <ul class="list-reset bg-white p-4 border border-solid border-grey-light">
      <li
      v-for="result in paginatedResults"
      :key="result.doc.id"
      class="mb-6"
      >
          <h2 class="text-indigo-darker pb-2 text-xl">Season: {{result.doc.season}}</h2>
          <p class="pb-2 text-black">Episode Number: {{result.doc.episodeNumber}}</p>
          <p class="text-sm text-grey-darker">
              Character: {{result.doc.character}}
          </p>
          <p class="text-sm text-grey-darker">
              Dialogue: {{result.doc.dialogue}}
          </p>
      </li>
      </ul>
      <div class="max-w-lg p-10 container flex justify-center mx-auto">
    <div class="flex flex-row mx-auto">
      <button v-if="hasPreviousPage" type="button" class="bg-gray-800 text-white rounded-l-md border-r border-gray-100 py-2 hover:bg-red-700 hover:text-white px-3" @click="prev">
        <div class="flex flex-row align-middle">
          <svg class="w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path>
          </svg>
          <p class="ml-2">Prev</p>
        </div>
      </button>
      <button v-if="hasNextPage" type="button" class="bg-gray-800 text-white rounded-r-md py-2 border-l border-gray-200 hover:bg-red-700 hover:text-white px-3" @click="next()">
        <div class="flex flex-row align-middle">
          <span class="mr-2">Next</span>
          <svg class="w-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
          </svg>
        </div>
      </button>
    </div>
  </div>
</div>
    `,
}
