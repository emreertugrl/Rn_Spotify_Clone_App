import Navigation from './src/navigation/Routes';
import {ArtistsProvider} from './src/context/ArtistContext';
import {AlbumsProvider} from './src/context/AlbumsContext';

export default function App() {
  return (
    <>
      <AlbumsProvider>
        <ArtistsProvider>
          <Navigation />
        </ArtistsProvider>
      </AlbumsProvider>
    </>
  );
}
