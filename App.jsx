import Navigation from './src/navigation/Routes';
import {ArtistsProvider} from './src/context/ArtistContext';
import {AlbumsProvider} from './src/context/AlbumsContext';
import {ProfileProvider} from './src/context/ProfileContext';

export default function App() {
  return (
    <>
      <ProfileProvider>
        <AlbumsProvider>
          <ArtistsProvider>
            <Navigation />
          </ArtistsProvider>
        </AlbumsProvider>
      </ProfileProvider>
    </>
  );
}
