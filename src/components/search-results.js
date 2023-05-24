import { searchResultsStore } from '../stores/searchResultsStore.js'
import ResultCard from './result-card.js'
import PageButtons from './page-buttons.js'
import PageResultsCount from './page-results-count.js'

export default {
  name: 'SearchResults',
  props: {},
  data() {
    return {
    }
  },
  components: {
    ResultCard,
    PageButtons,
    PageResultsCount
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
      return this.searchResultsStoreResults.length
    },
    paginatedResults() {
      return Object.values(this.sortedResults).slice(
        searchResultsStore.indexStart,
        searchResultsStore.indexEnd,
      )
    }
  },
  methods: {

  },
  template: `
<div v-if="resultsCount > 0 ">
  <PageResultsCount/>
  <ResultCard v-for="result in paginatedResults" :key="result.id" 
  :seid="result.doc.seid" 
  :character="result.doc.character" 
  :dialogue="result.doc.dialogue"
  ></ResultCard>

  <PageButtons></PageButtons>
</div>

    `,
}
