import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getAlbumTracks } from '../../services/api';
import { DetailedAlbum } from '../../types/album';

const AlbumDetail: React.FC = () => {
  const { albumId } = useParams(); 
  const [detailedAlbum, setDetailedAlbum] = useState<DetailedAlbum | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (!albumId) throw Error('No album ID provided');
        const albumData = await getAlbumTracks(parseInt(albumId));
        setDetailedAlbum(albumData);
      } catch (error) {
        setError('Error fetching album details. Please try again.'); 
      } finally {
        setIsLoading(false);
      }
    };
    fetchData(); 
  }, [albumId]);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {detailedAlbum && (
        <>
          <h1>{detailedAlbum.name}</h1>
          <Link to="/">Back to Albums</Link> 
          <h2>Tracks</h2>
          <ul>
            {detailedAlbum.tracks.map(track => (
              <li key={track.id}>{track.name}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default AlbumDetail;
