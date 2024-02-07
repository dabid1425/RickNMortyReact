import { useEffect, useState } from 'react';
import axios from 'axios';
import EpisodeModel from './EpisodeModel';

function EpisodeViewModel() {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchEpisodes();
  
    // Cleanup function
    return () => {
      // Cancel ongoing requests or perform any cleanup if needed
      // For example, you can use an Axios cancel token to cancel the request
      // Here's an example assuming you have an axiosInstance available
  
      // Create a cancel token source
      const cancelTokenSource = axios.CancelToken.source();
  
      // Cancel the ongoing request using the cancel token
      axiosInstance.cancel('Request canceled by cleanup', { cancelToken: cancelTokenSource.token });
  
      // Optionally perform any other cleanup tasks
  
      // Make sure to clean up the cancel token source
      cancelTokenSource.cancel();
    };
  }, []);
  

  const fetchEpisodes = async (clearList = false) => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/episode?page=${page}`);
      const results = response.data.results;
      const newEpisodes = results.map(({ id, name, air_date, episode, characters }) => new EpisodeModel(id, name, air_date, episode, characters));

      if (clearList) {
        setEpisodes(newEpisodes);
      } else {
        setEpisodes(prevEpisodes => [...prevEpisodes, ...newEpisodes]);
        setPage(prevPage => prevPage + 1);
      }
    } catch (error) {
      //console.error('Failed to fetch episodes:', error);
    } finally {
      setLoading(false);
    }
  };

  const setPageNumber = (pageNumber) => {
    setPage(pageNumber);
  };

  return { episodes, loading, fetchEpisodes, setPageNumber };
}

export default EpisodeViewModel;