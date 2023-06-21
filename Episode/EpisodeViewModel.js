import axios from 'axios';
import EpisodeModel from './EpisodeModel';

class EpisodeViewModel {
  constructor() {
    this.page = 1;
    this.episodes = [];
    this.isLoading = false;
    this.hasMoreEpisodes = true;
  }

  async fetchEpisodes() {
    try {
      if (!this.hasMoreEpisodes || this.isLoading) {
        return;
      }

      this.isLoading = true;
      const response = await axios.get(`https://rickandmortyapi.com/api/episode?page=${this.page}`);
      const results = response.data.results;

      if (results.length === 0) {
        this.hasMoreEpisodes = false;
      } else {
        const newEpisodes = results.map((result) => {
          return new EpisodeModel(result.id, result.name, result.air_date, result.episode);
        });

        this.episodes = [...this.episodes, ...newEpisodes];
        this.page++;
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }
}

export default EpisodeViewModel;
