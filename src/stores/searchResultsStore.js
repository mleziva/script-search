import { reactive } from 'vue'
import DataService from '../common/loadData.js'

export const searchResultsStore = reactive({
  results: {},
  query: null,
  filterApplied: false,
  filterResults(propertyName, filterValue) {
    this.results = Object.values(this.results).filter(
      (key) => key.doc[propertyName] === filterValue,
    )
    this.filterApplied = true
  },
  getFacets(propertyName) {
    //get number of each occurrence of property and return as list of objects
    //[{character: jerry, count: 2}, {character: george, count: 3}]
    let facetResults = []
    Object.values(this.results).forEach(function (result) {
      let i = facetResults.findIndex(
        (e) => e[propertyName] === result.doc[propertyName],
      )
      if (i > -1) {
        /* facetResults contains the element we're looking for */
        //increment facetResults
        facetResults[i].count += 1
      } else {
        //facetResults does not contain the element, add it
        facetResults.push({
          [propertyName]: result.doc[propertyName],
          count: 1,
        })
      }
    })
    //sort by size and take the top 10
    facetResults = facetResults
      .sort((a, b) => (a.count < b.count ? 1 : b.count < a.count ? -1 : 0))
      .slice(0, 10)
    console.log(facetResults)
    return facetResults
  },
  removeFilter() {
    if (this.filterApplied) {
      this.filterApplied = false
      this.results = DataService.query(this.query)
    }
  },
  executeSearch(query) {
    this.filterApplied = false
    this.results = DataService.query(query)
    console.log(this.results)
    this.query = query
  },
})
