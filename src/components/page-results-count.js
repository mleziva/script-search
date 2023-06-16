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
    <div class="text-left">
        <span>{{indexStart}} - {{smallerOfIndexEndOrResultsCount}} of {{resultsCount}} results</span>
    </div>
    <div class="text-right">
        <span>{{indexStart}} - {{smallerOfIndexEndOrResultsCount}} of {{resultsCount}} results</span>
    </div>
    `,
}
