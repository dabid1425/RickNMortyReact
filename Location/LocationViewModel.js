import axios from 'axios';
import LocationModel from './LocationModel';

class LocationViewModel {
  constructor() {
    this.page = 1;
    this.locations = [];
    this.isLoading = false;
    this.hasMoreLocations = true;
  }

  async fetchLocations() {
    try {
      if (!this.hasMoreLocations || this.isLoading) {
        return;
      }

      this.isLoading = true;
      const response = await axios.get(`https://rickandmortyapi.com/api/location?page=${this.page}`);
      const results = response.data.results;

      if (results.length === 0) {
        this.hasMoreLocations = false;
      } else {
        const newLocations = results.map((result) => {
          return new LocationModel(result.id, result.name, result.type, result.dimension);
        });

        this.locations = [...this.locations, ...newLocations];
        this.page++;
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }
}

export default LocationViewModel;
