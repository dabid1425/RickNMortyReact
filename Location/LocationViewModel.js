import { useEffect, useState } from 'react';
import axios from 'axios';
import LocationModel from './LocationModel';

function LocationViewModel() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchLocations();
  
    // Cleanup function
    return () => {
      // Cancel ongoinrg requests or perform any cleanup if needed
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
  

  const fetchLocations = async (clearList = false) => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/location?page=${page}`);
      const results = response.data.results;
      const newLocations = results.map(({ id, name, type, dimension }) => new LocationModel(id, name, type, dimension));

      if (clearList) {
        setLocations(newLocations);
      } else {
        setLocations(prevLocations => [...prevLocations, ...newLocations]);
        setPage(prevPage => prevPage + 1);
      }
    } catch (error) {
      //console.error('Failed to fetch characters:', error);
    } finally {
      setLoading(false);
    }
  };

  const setPageNumber = (pageNumber) => {
    setPage(pageNumber);
  };

  return { locations, loading, fetchLocations, setPageNumber };
}

export default LocationViewModel;