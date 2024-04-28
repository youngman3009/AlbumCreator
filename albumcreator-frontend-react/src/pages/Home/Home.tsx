import React, { useState } from 'react';
import './Home.css';
import AlbumList from '../../components/AlbumList';
import TrackList from '../../components/TrackList';
import { Album } from '../../types/album';
import { AlbumContext } from '../../contexts';

const Home: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  return (
    <>
      <h1>Album Creator</h1>
      <AlbumContext.Provider value={{ albums, setAlbums }}> 
        <TrackList />
        <AlbumList/>
      </AlbumContext.Provider>
    </>
  );
};

export default Home;
