import React, { useState, useEffect, useContext } from 'react';
import { addTrackToAlbum, getTracks } from '../services/api';
import { TrackDetailed } from '../types/track';
import TrackForm from './TrackForm';
import { AlbumContext } from '../contexts';

const TrackList: React.FC = () => {
  const [tracks, setTracks] = useState<TrackDetailed[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddToAlbumForm, setShowAddToAlbumForm] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<TrackDetailed | null>(null);
  const [selectedAlbumId, setSelectedAlbumId] = useState<number>(); 

  const { albums } = useContext(AlbumContext);

  const fetchTracks = async () => {
    setIsLoading(true);
    try {
      const data = await getTracks();
      setTracks(data);
    } catch (error) {
      setError('Error fetching tracks. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTracks();
  }, []);

  const handleEditClick = (track: TrackDetailed) => {
    setSelectedTrack(track); 
    setShowEditForm(true);
  };

  const handleAddToAlbumClick = (track: TrackDetailed) => {
    setSelectedTrack(track);
    setShowAddToAlbumForm(true);
  };

  const handleSubmitAddToAlbum = async () => {
    setIsLoading(true);
    try {
      if (selectedTrack && selectedAlbumId) {
        await addTrackToAlbum(selectedTrack.id, selectedAlbumId);
        setShowAddToAlbumForm(false); 
        setSelectedTrack(null);
        setSelectedAlbumId(0);
      }
    } catch (error) {
      setError('Failed to add track to album. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Tracks</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!isLoading && !error && (
        <>
          <button onClick={() => setShowCreateForm(true)}>Add New Track</button>
          {showCreateForm && (
            <TrackForm 
              onSuccess={() => { 
                setShowCreateForm(false);
                fetchTracks();
              }}
            />
          )}
          <div className="track-table-container">
            <table>
              <thead>
                <tr>
                  <th>Track Name</th>
                  <th>Artist</th>
                  <th>Genre</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tracks.map((track) => (
                  <tr key={track.id}>
                    <td>{track.name}</td>
                    <td>{track.artist.first_name} {track.artist.last_name}</td>
                    <td>{track.genre.name}</td>
                    <td>
                      <button onClick={() => handleEditClick(track)}>Edit</button>
                      <button onClick={() => handleAddToAlbumClick(track)}>Add To Album</button> 
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
            {showEditForm && selectedTrack && (
              <TrackForm 
                mode="edit" 
                track={selectedTrack}
                onSuccess={() => { 
                  setShowEditForm(false);
                  fetchTracks();
                }}
              />
            )}
            </div>
            <div>
            {showAddToAlbumForm && selectedTrack && (
              <div>
                <label htmlFor="album">Select Album:</label>
                <select name="album" id="album" onChange={(e) => setSelectedAlbumId(parseInt(e.target.value))}>
                  <option value="">Select Album</option>
                  {albums.map((album) => (
                    <option key={album.id} value={album.id}>{album.name}</option>
                  ))}
                </select>
                <button type="button" onClick={handleSubmitAddToAlbum}>Add</button> 
              </div>
            )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TrackList;
