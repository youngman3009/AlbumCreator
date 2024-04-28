import React, { useState, useEffect, useContext } from 'react';
import { getAlbums } from '../services/api';
import { AlbumContext } from '../contexts';

const AlbumList: React.FC = () => { 
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState<string | null>(null);

  const { albums, setAlbums } = useContext(AlbumContext);

  useEffect(() => {
    const fetchAlbums = async () => {
      setIsLoading(true); 
      try {
        const data = await getAlbums();
        setAlbums(data);
      } catch (error) {
        setError('Error fetching albums. Please try again.'); 
      } finally {
        setIsLoading(false); 
      }
    }

    fetchAlbums(); 
  }, [setAlbums]);

  return (
    <div>
      <h2>Albums</h2>
      {isLoading && <p>Loading...</p>} 
      {error && <p className="error">{error}</p>}
      {!isLoading && !error && (
        <ul>
          {albums.map((album) => (
            <li key={album.id}>{album.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AlbumList;
