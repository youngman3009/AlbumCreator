import React, { useState, useEffect } from 'react';
import { createTrack, updateTrack, getArtists, getGenres } from '../services/api';
import * as z from 'zod'; 
import { trackSchema, genreSchema, artistSchema } from '../types/track';

interface TrackFormProps {
  mode?: 'create' | 'edit';
  track?: z.infer<typeof trackSchema>;
  onSuccess?: () => void;
}

const TrackForm: React.FC<TrackFormProps> = ({ mode = 'create', track, onSuccess }) => {
  const [name, setName] = useState('');
  const [artist_id, setArtistId] = useState(-1);
  const [genre_id, setGenreId] = useState(-1);
  const [artists, setArtists] = useState<z.infer<typeof artistSchema>[]>([]);
  const [genres, setGenres] = useState<z.infer<typeof genreSchema>[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (mode === 'edit' && track) {
      setName(track.name);
      setArtistId(track.artist.id);
      setGenreId(track.genre.id); 
    }
  }, [mode, track]);

  useEffect(() => { 
    const fetchLists = async () => {
      try {
        const [artistData, genreData] = await Promise.all([getArtists(), getGenres()]);
        setArtists(artistData);
        setGenres(genreData);
      } catch (error) {
        setFormError('Error fetching artists or genres. Please try again.');
      }
    };

    fetchLists(); 
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFormError(null);

    try {
      const updatedTrackData = { name, artist_id, genre_id };

      if (mode === 'create') {
        await createTrack(updatedTrackData);
      } else if (mode === 'edit' && track) {
        await updateTrack(track.id, updatedTrackData);
      }

      onSuccess?.(); 
    } catch (error) {
      setFormError('Error saving track. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {formError && <p className="error">{formError}</p>}
      <label htmlFor="name">Track Name:</label>
      <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />

      <label htmlFor="artist">Artist:</label>
      <select name="artistId" value={artist_id} onChange={(e) => setArtistId(parseInt(e.target.value))} required>
        <option value="">Select Artist</option> 
        {artists.map((artist) => (
          <option key={artist.id} value={artist.id}>
            {artist.first_name} {artist.last_name}
          </option>
        ))}
      </select>

      <label htmlFor="genre">Genre:</label>
      <select name="genreId" value={genre_id} onChange={(e) => setGenreId(parseInt(e.target.value))} required>
        <option value="">Select Genre</option> 
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : mode === 'create' ? 'Create Track' : 'Update Track'}
      </button>
    </form>
  );
};

export default TrackForm;
