import React, { useState, useEffect, useContext } from 'react';
import { deleteAlbum, getAlbums } from '../services/api';
import { AlbumContext } from '../contexts';
import { Link } from 'react-router-dom';
import AlbumForm from './AlbumForm';

const AlbumList: React.FC = () => { 
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { albums, setAlbums } = useContext(AlbumContext);

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

  useEffect(() => {
    fetchAlbums(); 
  }, []);

  const handleDeleteAlbum = async (albumId: number) => {
    setIsLoading(true);
    try {
      await deleteAlbum(albumId);
      fetchAlbums()
    } catch (error) {
      setError('Failed to add track to album. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Albums</h2>
      {isLoading && <p>Loading...</p>} 
      {error && <p className="error">{error}</p>}
      {!isLoading && !error && (
        <div>
          <button onClick={() => setShowCreateForm(true)}>Add New Album</button>
          {showCreateForm && (
            <AlbumForm 
              onSuccess={() => { 
                setShowCreateForm(false);
                fetchAlbums();
              }}
            />
          )}
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {albums.map((album) => (
                <tr key={album.id}>
                <td>{album.name}</td>
                <td>
                  <Link to={`/albums/${album.id}`}><button>View</button></Link>
                  <button onClick={() => handleDeleteAlbum(album.id)}>Delete</button>
                </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AlbumList;
