import { searchResultsStore } from '../stores/searchResultsStore.js'

export default {
  name: 'SearchResults',
  props: {},
  computed: {
    getResults() {
      return searchResultsStore.results
    },
  },
  mounted() {
    console.log('mounted serach results')
  },
  template: `
    <li
    v-for="result in getResults"
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
    `,
}
