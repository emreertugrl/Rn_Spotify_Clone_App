import {createContext, useState} from 'react';

export const SongContext = createContext();

export const SongProvider = ({children}) => {
  const [songs, setSongs] = useState([]);
  return (
    <SongContext.Provider value={{songs, setSongs}}>
      {children}
    </SongContext.Provider>
  );
};
