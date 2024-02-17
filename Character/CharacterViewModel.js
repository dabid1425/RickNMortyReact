import { useEffect, useState } from 'react';
import axios from 'axios';
import CharacterModel from './CharacterModel';

function useCharacterViewModel() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false); // New state for fetching more data

  useEffect(() => {
    fetchCharacters();

    // Cleanup function
    return () => {
      // Cancel ongoing requests or perform any cleanup if needed
    };
  }, []);

  const fetchCharacters = async (clearList = false) => {
    if (loading || isFetching) return;

    // Set isFetching to true before making the request
    setIsFetching(true);
    console.log("fetching")
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
      // Set isFetching to false after the request is completed
      setIsFetching(false);
      setLoading(false);
    }
  };

  const setPageNumber = (pageNumber) => {
    setPage(pageNumber);
  };

  return { characters, loading, fetchCharacters, setPageNumber, isFetching }; // Return isFetching along with other values
}

export default useCharacterViewModel;
