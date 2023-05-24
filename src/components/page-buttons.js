import { searchResultsStore } from '../stores/searchResultsStore.js'
export default {
  name: 'PageButtons',
  props: {

  },
  data() {
    return {
      searchQuery: null,
    }
  },
  computed: {
    hasNextPage() {
      return searchResultsStore.indexEnd <= searchResultsStore.results.length
    },
    hasPreviousPage() {
      return searchResultsStore.indexStart > 0
    },
  },
  methods: {
    prev() {
        window.scrollTo(0, 0)
        searchResultsStore.currentPage--
      },
      next() {
        window.scrollTo(0, 0)
        searchResultsStore.currentPage++
      },
  },
  template: `
  <div class="container mx-auto flex max-w-lg justify-center p-10">
    <div class="mx-auto flex flex-row">
      <button v-if="hasPreviousPage" type="button" class="rounded-l-md border-r border-gray-100 bg-gray-800 py-2 px-3 text-white hover:bg-red-700 hover:text-white" @click="prev">
        <div class="flex flex-row align-middle">
          <svg class="mr-2 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path>
          </svg>
          <p class="ml-2">Prev</p>
        </div>
      </button>
      <button v-if="hasNextPage" type="button" class="rounded-r-md border-l border-gray-200 bg-gray-800 py-2 px-3 text-white hover:bg-red-700 hover:text-white" @click="next()">
        <div class="flex flex-row align-middle">
          <span class="mr-2">Next</span>
          <svg class="ml-2 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
          </svg>
        </div>
      </button>
    </div>
  </div>
    `,
}
