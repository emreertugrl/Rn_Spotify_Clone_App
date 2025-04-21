import {createContext, useEffect, useState} from 'react';
import axios from 'axios';

export const ArtistsContext = createContext();

export const ArtistsProvider = ({children}) => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getArtists = async () => {
    const options = {
      method: 'GET',
      url: 'https://spotify23.p.rapidapi.com/search/',
      params: {
        q: 'popüler',
        type: 'artists',
        offset: '0',
        limit: '10',
        numberOfTopResults: '5',
      },
      headers: {
        'x-rapidapi-key': 'eed126f9bcmshc5525da323f2af8p1ab61fjsn34753381407b',
        'x-rapidapi-host': 'spotify23.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      const data = response.data.artists.items;
      setArtists(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getArtists();
  }, []);
  return (
    <ArtistsContext.Provider value={{artists, loading, error}}>
      {children}
    </ArtistsContext.Provider>
  );
};
