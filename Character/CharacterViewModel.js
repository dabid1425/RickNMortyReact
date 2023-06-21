import axios from 'axios';
import CharacterModel from './CharacterModel';

class CharacterViewModel {
  constructor() {
    this.page = 1;
    this.characters = [];
    this.isLoading = false;
    this.hasMoreCharacters = true;
  }

  async fetchCharacters() {
    try {
      if (!this.hasMoreCharacters || this.isLoading) {
        return;
      }

      this.isLoading = true;
      const response = await axios.get(`https://rickandmortyapi.com/api/character/?page=${this.page}`);
      const results = response.data.results;

      if (results.length === 0) {
        this.hasMoreCharacters = false;
      } else {
        const newCharacters = results.map((result) => {
          return new CharacterModel(result.id, result.name, result.image, result.status, result.species, result.gender,result.origin,result.location,result.image,result.episode,result.url,result.created);
        });

        this.characters = [...this.characters, ...newCharacters];
        this.page++;
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }
}

export default CharacterViewModel;
