import { reactive } from 'vue'
import DataService from '../common/loadData.js'

export const searchResultsStore = reactive({
  results: {},
  currentPage: 1,
  pageSize: 5,
  get indexStart() {
    return (this.currentPage - 1) * this.pageSize
  },
  get indexEnd() {
    return this.indexStart + this.pageSize
  },
  query: null,
  filter: {},
  filterResults(propertyName, filterValue) {
    this.results = Object.values(this.results).filter(
      (key) => key.doc[propertyName] === filterValue,
    )
    this.filter[propertyName] = filterValue
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
  //todo this needs to only remove the filter that was unchecked
  removeFilter(propertyName) {
    propertyName = propertyName.toLowerCase();
    if (this.filter[propertyName]) {
      delete this.filter[propertyName];
      //need to repeat search and reapply any existing filters
      this.results = DataService.query(this.query)
      this.reapplyFilters();
    }
  },
  reapplyFilters() {
    Object.keys(this.filter).forEach(propertyName => {
      console.log(propertyName, this.filter[propertyName]);
      let filterValue = this.filter[propertyName];
      this.results = Object.values(this.results).filter(
        (key) => key.doc[propertyName] === filterValue,
      )
    });

  },
  executeSearch(query) {
    this.filter = {};
    this.results = DataService.query(query)
    console.log(this.results)
    this.query = query
  },
  allByPopularity() {
    this.results = DataService.allPopular
    console.log("Results: ")
    console.log(this.results)
  }
})
