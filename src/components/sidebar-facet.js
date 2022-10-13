import { searchResultsStore } from '../stores/searchResultsStore.js'

export default {
  data() {
    return {
      facet: [],
      facetItems: [
        { character: 'jerry', count: 2 },
        { character: 'george', count: 3 },
      ],
      results: searchResultsStore.results,
    }
  },
  props: {
    items: {
      type: Object,
    },
    category: {
      type: String,
    },
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
        searchResultsStore.removeFilter()
      }
    },
    getResults() {
      console.log('test')
      //when search results change, update facet numbers
      this.facetItems = searchResultsStore.getFacets(this.categoryProperty)
    },
  },
  computed: {
    categoryProperty() {
      return this.category.toLowerCase()
    },
    getResults() {
      return searchResultsStore.results
    },
  },
  mounted() {
    console.log(this.results === searchResultsStore.results)
  },
  template: `
    <dl class="list-reset">
      <dt class="font-bold text-purple-dark pb-2 uppercase" >{{category}}</dt>
        <dd class="mb-2" v-for="facetItem in facetItems" >
          <input
            :id="facetItem[categoryProperty]"
            type="checkbox"
            name="facet"
            v-model="facet"
            :value="facetItem[categoryProperty]"
          />
          <label class="pl-2">{{facetItem[categoryProperty]}}: {{ facetItem.count }}</label>
        </dd>
      </dl>
    `,
}
