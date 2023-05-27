import { searchResultsStore } from '../stores/searchResultsStore.js'
export default {
    name: 'PageResultsCount',
    props: {

    },
    data() {
        return {
        }
    },
    computed: {
        resultsCount() {
            return searchResultsStore.results.length
        },
        indexStart() {
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
  <div>
    <span>{{indexStart}} - {{smallerOfIndexEndOrResultsCount}} of {{resultsCount}} results</span>
  </div>
    `,
}
