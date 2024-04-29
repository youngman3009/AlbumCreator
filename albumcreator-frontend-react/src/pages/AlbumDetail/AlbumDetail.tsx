import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { deleteAlbumTracks, getAlbumTracks } from '../../services/api';
import { DetailedAlbum } from '../../types/album';

const AlbumDetail: React.FC = () => {
  const { albumId } = useParams(); 
  const [detailedAlbum, setDetailedAlbum] = useState<DetailedAlbum | null>(null);
  const [selectedTrackIds, setSelectedTrackIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAlbumDetails = async () => {
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

  useEffect(() => {
    fetchAlbumDetails(); 
  }, [albumId]);

  const handleTrackChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const trackId = parseInt(event.target.value);
    if (event.target.checked) {
      setSelectedTrackIds([...selectedTrackIds, trackId]);
    } else {
      setSelectedTrackIds(selectedTrackIds.filter(id => id !== trackId));
    }
  };

  const handleDeleteClick = async () => { 
    try {
      if (!albumId) throw Error('No album ID provided');
      await deleteAlbumTracks(parseInt(albumId), selectedTrackIds);
      setSelectedTrackIds([]);
      fetchAlbumDetails();
    } catch(error) {
      console.error("Error deleting tracks: ", error);
    }
  };

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
              <li key={track.id}>
                <input 
                  type="checkbox" 
                  value={track.id}
                  checked={selectedTrackIds.includes(track.id)} 
                  onChange={handleTrackChange} 
                /> 
                {track.name}
              </li>
            ))}
          </ul>
          <button onClick={handleDeleteClick}>Delete Selected Tracks</button> 
        </>
      )}
    </div>
  );
};

export default AlbumDetail;
