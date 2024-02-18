import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import CharacterModel from './CharacterModel';

function useCharacterViewModel() {
  const [loading, setLoading] = useState(false); // State for loading
  const fetchCharacters = async () => {
    setLoading(true); // Set loading to true when fetching starts
    try {
      // Fetch characters data from API for the first page only
      const response = await Promise.race([
        fetch(`https://rickandmortyapi.com/api/character`),
        new Promise((resolve, reject) =>
            setTimeout(() => reject(new Error('Timeout occurred')), 5000) // Timeout after 10 seconds
        ),
      ]);
      if (!response.ok) {
        throw new Error('Failed to fetch characters');
      }

      const responseData = await response.json();

      // Check if responseData.results is an array
      if (!Array.isArray(responseData.results)) {
        throw new Error('API response does not contain results array');
      }

      // Map API results to CharacterModel objects
      const newCharacters = responseData.results.map(
          ({ id, name, image, status, species, gender, origin, location, episode, url, created }) =>
              new CharacterModel(id, name, image, status, species, gender, origin, location, episode, url, created)
      );

      return newCharacters;
    } catch (error) {
      // Handle any errors, e.g., log the error or show a message to the user
      console.error('Error fetching characters:', error);
      throw error; // Rethrow the error to mark it as handled
    } finally {
      setLoading(false); // Set loading to false after fetching completes
    }
  };

  const { data: characters, isLoading, isError } = useQuery({
    queryKey: ['characters'],
    queryFn: fetchCharacters, // Just call fetchCharacters without passing any arguments
  });

  return { characters, loading: isLoading || isError || loading, fetchCharacters };
}

export default useCharacterViewModel;
