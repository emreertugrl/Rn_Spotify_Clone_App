import {createContext, useEffect, useState} from 'react';
import axios from 'axios';

export const AlbumsContext = createContext();

export const AlbumsProvider = ({children}) => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);

  const getAlbums = async () => {
    const options = {
      method: 'GET',
      url: 'https://spotify23.p.rapidapi.com/search/',
      params: {
        q: 'eminem', // sonradan eklediğimiz kısım arama ile gelecek
        type: 'multi',
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
      const albumItems = response.data?.albums?.items?.map(item => ({
        uri: item.data.uri,
        name: item.data.name,
        artist: item.data.artists.items[0].profile.name,
        coverArt: item.data.coverArt.sources[0].url,
        year: item.data.date.year,
      }));

      setAlbums(albumItems);
      setLoading(false);
    } catch (error) {
      setErrors(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getAlbums();
  }, []);

  return (
    <AlbumsContext.Provider value={{albums, loading, errors}}>
      {children}
    </AlbumsContext.Provider>
  );
};
