import { searchResultsStore } from '../stores/searchResultsStore.js'

export default {
  data() {
    return {
      facet: [],
      facetItems: [],
      results: searchResultsStore.results,
    }
  },
  created() {
    console.log(`the facets is now mounted.`)
    this.facetItems = searchResultsStore.getFacets(this.categoryProperty)
  },
  props: {
    category: {
      type: String,
    },
    facetName: {
      type: String
    },
    prefix: {
      type: String
    }
  },
  watch: {
    facet() {
      if (this.facet.length > 0) {
        //if a facet is selected, filter the results
        searchResultsStore.filterResults(
          this.category.toLowerCase(),
          this.facet[0],
        )
      } else {
        searchResultsStore.removeFilter(this.category)
      }
    },
    searchResultsStoreResults() {
      //when search results change, update facet numbers
      this.facetItems = searchResultsStore.getFacets(this.categoryProperty)
    },
    searchResultsStoreQuery() {
      //when thequery changes, deselect the facet
      this.facet = []
    },
  },
  methods: {
    startsWithChar(whichChar) {
      return this.names.filter(n => n.startsWith(whichChar))
    }
  },
  computed: {
    categoryProperty() {
      return this.category.toLowerCase()
    },
    searchResultsStoreResults() {
      return searchResultsStore.results
    },
    searchResultsStoreQuery() {
      return searchResultsStore.query
    },
  },
  mounted() {
    console.log(this.results === searchResultsStore.results)
  },
  template: `
    <dl class="list-reset">
      <dt class="font-bold text-purple-dark pb-2 uppercase" >{{facetName ?? category}}</dt>
        <dd class="mb-2" v-for="facetItem in facetItems" >
          <input
            :id="facetItem[categoryProperty]"
            type="checkbox"
            name="facet"
            v-model="facet"
            :value="facetItem[categoryProperty]"
          />
          <label class="pl-2"> {{prefix}} {{facetItem[categoryProperty]}}: {{ facetItem.count }}</label>
        </dd>
      </dl>
    `,
}
