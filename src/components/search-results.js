import { searchResultsStore } from '../stores/searchResultsStore.js'
import { episodeStore } from '../stores/episodeStore.js'
import ResultCard from './result-card.js'
import PageButtons from './page-buttons.js'
import { ImageService } from '../common/loadData.js'

export default {
  name: 'SearchResults',
  props: {},
  data() {
    return {
    }
  },
  components: {
    ResultCard,
    PageButtons
  },
  watch: {
    searchResultsStoreResults() {
      //when the results change, reset page
      searchResultsStore.currentPage = 1
    },
  },
  computed: {
    searchResultsStoreResults() {
      //console.log("test: " + searchResultsStore.results)
      return searchResultsStore.results
    },
    sortedResults() {
      if (!searchResultsStore.results) {
        return searchResultsStore.results
      }
      searchResultsStore.results.sort((a, b) => 
      ((+b.score + +b.doc.popularity) - (+a.score + +a.doc.popularity))
      );
      // searchResultsStore.results.forEach(a => console.log(a.score));
      
      // searchResultsStore.results.forEach(a => console.log(+a.score + +a.doc.popularity));
      return searchResultsStore.results
    },
    resultsCount() {
      console.log("test: " + this.searchResultsStoreResults.length)
      return this.searchResultsStoreResults.length
    },
    paginatedResults() {
      return Object.values(this.sortedResults).slice(
        searchResultsStore.indexStart,
        searchResultsStore.indexEnd,
      )
    },
    indexStart(){
      return searchResultsStore.indexStart
    },
    smallerOfIndexEndOrResultsCount() {
      if (searchResultsStore.indexEnd < this.resultsCount) {
        return searchResultsStore.indexEnd
      }
      return this.resultsCount
    },
  },
  methods: {

  },
  template: `
<div v-if="resultsCount > 0 ">
  <div class="block">
    <span>{{indexStart}} - {{smallerOfIndexEndOrResultsCount}} of {{resultsCount}} results</span>
  </div>
  <ResultCard v-for="result in paginatedResults" :key="result.id" 
  :seid="result.doc.seid" 
  :character="result.doc.character" 
  :dialogue="result.doc.dialogue"
  ></ResultCard>

  <PageButtons></PageButtons>
</div>

    `,
}
