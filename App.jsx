import Navigation from './src/navigation/Routes';
import {SongProvider} from './src/context/SongContext';
import {AlbumsProvider} from './src/context/AlbumsContext';

export default function App() {
  return (
    <>
      <SongProvider>
        <AlbumsProvider>
          <Navigation />
        </AlbumsProvider>
      </SongProvider>
    </>
  );
}
