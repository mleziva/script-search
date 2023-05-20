import { searchResultsStore } from '../stores/searchResultsStore.js'
export default {
  name: 'Search',
  props: {
    episodeDetails: Object,
    character: String,
    characterImage: String,
    characterImageAltText: String,
    dialogue: String,
  },
  data() {
    return {
      searchQuery: null,
    }
  },
  computed: {
    searchResults() {
      return searchResultsStore.results
    },
    imageSource() {
      return '/src/img/' + this.characterImage
    },
  },
  methods: {
    debounceSearch(event) {
      this.searchQuery = null
      clearTimeout(this.debounce)
      document.getElementById('loading').style.display = 'inline-block'
      this.debounce = setTimeout(() => {
        this.searchQuery = event.target.value
        document.getElementById('loading').style.display = 'none'
      }, 500)
    },
  },
  template: `
<div class="w-full max-w-sm lg:flex lg:max-w-full">
  <div class="mb-8 flex min-w-full flex-col justify-between rounded-lg border border-gray-400 bg-slate-700 p-4 leading-normal text-white">
    <div class="flex pb-2">
      <div class="flex items-center justify-center">
          <img class="img-height mr-4 items-center rounded-full" :src="imageSource" :alt="characterImageAltText" />
        <p class="text-2xl">{{character}}</p>
      </div>
      <div class="ml-auto text-right">
        <p class="text-sm">Season {{episodeDetails.season >> 0}} Episode {{episodeDetails.episodeNumber >> 0}}</p>
        <p class="text-sm italic">{{episodeDetails.title}}</p>
      </div>
    </div>
    <div class="flex rounded-lg bg-slate-100 px-5 py-4">
      <div class="h-3 text-left text-4xl leading-tight text-indigo-500">“</div>
      <p class="px-5 text-center text-lg text-black">{{dialogue}}</p>
      <div class="h-3 text-right text-4xl leading-tight text-indigo-500">”</div>
    </div>
  </div>
</div>

    `,
}
