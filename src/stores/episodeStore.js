import { reactive } from 'vue'
import { EpisodeService } from '../common/loadData.js'

export const episodeStore = reactive({
  episode: {},
  episodeTitle: null,
  seid: null,
  //this won't need to be a store, maybe move to a service?
  getEpisodeBySeid(seid) {
    return EpisodeService.getEpisodeBySeid(seid)
  },
})
