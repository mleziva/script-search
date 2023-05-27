import { searchResultsStore } from '../stores/searchResultsStore.js'
import { FacetService } from '/src/common/loadData.js'
import ResultCard from './result-card.js'
import PageButtons from './page-buttons.js'
import PageResultsCount from './page-results-count.js'
import SidebarFacet from './sidebar-facet.js'
export default {
  name: 'SearchResults',
  props: {},
  data() {
    return {
      characters: FacetService.loadCharacters(),
    }
  },
  mounted() {
    console.log(`the results component is now mounted.`)
    searchResultsStore.allByPopularity()
  },
  components: {
    ResultCard,
    PageButtons,
    PageResultsCount,
    SidebarFacet
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
  
  <div class="flex">
  <div class="w-full">
  <PageResultsCount/>
  </div>
  </div>
  <div class="flex mx-auto text-indigo-darkest md:w-3/4">
    <div  class="w-1/4 mr-4">
      <div class="bg-white p-4 border border-solid border-grey-light">
        <p class="text-lg border-b pb-2 mb-2">Filter by:</p>
        <SidebarFacet
          :items="characters"
          category="Character"
        ></SidebarFacet>
      </div>
    </div>
    <div class="w-3/4">
  
  <ResultCard v-for="result in paginatedResults" :key="result.id" 
  :seid="result.doc.seid" 
  :character="result.doc.character" 
  :dialogue="result.doc.dialogue"
  ></ResultCard>

  <PageButtons></PageButtons>
  </div>
  </div>
</div>

    `,
}
