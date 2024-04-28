import React, { useState, useEffect } from 'react';
import { getTracks } from '../services/api';
import { TrackDetailed } from '../types/track';
import TrackForm from './TrackForm';

const TrackList: React.FC = () => {
  const [tracks, setTracks] = useState<TrackDetailed[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<TrackDetailed | null>(null); 

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
          </div>
        </>
      )}
    </div>
  );
};

export default TrackList;
