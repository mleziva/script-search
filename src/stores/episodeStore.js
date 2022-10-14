import { reactive } from 'vue'
import { EpisodeService } from '../common/loadData.js'

export const episodeStore = reactive({
  episode: {},
  episodeTitle: null,
  seid: null,
  getEpisodeBySeid(seid) {
    this.seid = seid
    this.episode = EpisodeService.getEpisodeBySeid(seid)
    return this.episode
  },
})
