import { searchResultsStore } from '../stores/searchResultsStore.js'
import { episodeStore } from '../stores/episodeStore.js'
import ResultCard from './result-card.js'
import { ImageService } from '../common/loadData.js'

export default {
  name: 'SearchResults',
  props: {},
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
    }
  },
  components: {
    ResultCard,
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
    resultsCount() {
      return this.searchResultsStoreResults.length
    },
    indexStart() {
      return (this.currentPage - 1) * this.pageSize
    },
    indexEnd() {
      return this.indexStart + this.pageSize
    },
    paginatedResults() {
      return Object.values(this.searchResultsStoreResults).slice(
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
    smallerOfIndexEndOrResultsCount() {
      if (this.indexEnd < this.resultsCount) {
        return this.indexEnd
      }
      return this.resultsCount
    },
  },
  methods: {
    getEpisodeTitle(seid) {
      return episodeStore.getEpisodeBySeid(seid).title
    },
    getCharacterImagePath(character) {
      return ImageService.getImagePathByCharacter(character).images[0]
    },
    getCharacterImageAltText(character) {
      return ImageService.getImagePathByCharacter(character).altText
    },
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
  <div class="block">
    <span>{{indexStart}} - {{smallerOfIndexEndOrResultsCount}} of {{resultsCount}} results</span>
  </div>
  <ResultCard v-for="result in paginatedResults" :key="result.id" 
  :season="result.doc.season" 
  :episode="result.doc.episodeNumber" 
  :episodeName="getEpisodeTitle(result.doc.seid)" 
  :character="result.doc.character" 
  :characterImage="getCharacterImagePath(result.doc.character)"
  :characterImageAltText="getCharacterImageAltText(result.doc.character)"
  :dialogue="result.doc.dialogue"
  ></ResultCard>

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
</div>

    `,
}
