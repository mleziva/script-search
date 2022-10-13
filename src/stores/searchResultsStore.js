import { reactive } from 'vue'

export const searchResultsStore = reactive({
  results: {},
})

export const store = reactive({
  count: 0,
  results: [],
})
