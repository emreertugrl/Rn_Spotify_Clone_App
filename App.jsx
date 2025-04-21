import React from 'react';
import Navigation from './src/navigation/Routes';
import {SongProvider} from './src/context/SongContext';

export default function App() {
  return (
    <>
      <SongProvider>
        <Navigation />
      </SongProvider>
    </>
  );
}
