import { useEffect, useState } from 'react';
import axios from 'axios';
import CharacterModel from './CharacterModel';

function useCharacterViewModel() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchCharacters();

    // Cleanup function
    return () => {
      // Cancel ongoing requests or perform any cleanup if needed
    };
  }, []);

  const fetchCharacters = async (clearList = false) => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
      const results = response.data.results;
      const newCharacters = results.map(({ id, name, image, status, species, gender, origin, location, episode, url, created }) => new CharacterModel(id, name, image, status, species, gender, origin, location, episode, url, created));

      if (clearList) {
        setCharacters(newCharacters);
      } else {
        setCharacters(prevCharacters => [...prevCharacters, ...newCharacters]);
        setPage(prevPage => prevPage + 1);
      }
    } catch (error) {
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  const setPageNumber = (pageNumber) => {
    setPage(pageNumber);
  };

  return { characters, loading, fetchCharacters, setPageNumber };
}

export default useCharacterViewModel;
