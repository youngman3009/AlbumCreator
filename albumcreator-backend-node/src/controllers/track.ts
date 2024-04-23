import { Request, Response } from 'express';
import { artistExists, getArtistById } from './artist';
import { genreExists, getGenreById } from './genre';
import { Track } from '../models/track';
import { AppDataSource } from '../data-source';

interface TrackRequest {
  name?: string;
  artist_id?: number;
  genre_id?: number;
}

export const createTrack = async (req: Request<{}, {}, TrackRequest>, res: Response) => {
  const { name, artist_id, genre_id } = req.body;

  if (!name || !artist_id || !genre_id) {
    return res.status(400).json({ error: 'Name, artist_id, and genre_id are required' });
  }

  try {
    // Check if artist exists
    if (!(await artistExists(artist_id))) {
      return res.status(400).json({ error: 'Artist with the provided ID does not exist' });
    }

    // Check if genre exists
    if (!(await genreExists(genre_id))) {
      return res.status(400).json({ error: 'Genre with the provided ID does not exist' });
    }

    // Check if duplicate track exists
    const existingTrack = await Track.findOne({ where: { name, artist: { id: artist_id }, genre: { id: genre_id } } });
    if (existingTrack) {
      return res.status(400).json({ error: 'Track with the same name, artist, and genre already exists' });
    }

    // Create a new track
    const newTrack = AppDataSource.getRepository(Track).create({
      name, 
      artist: { id: artist_id }, 
      genre: { id: genre_id }
    });
    await newTrack.save();

    return res.status(201).json(newTrack);
  } catch (error) {
    console.error('Error creating track:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getTracks = async (req: Request, res: Response) => {
  try {
    const tracks = await Track.find();
    return res.json(tracks);
  } catch (error) {
    console.error('Error getting tracks:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateTrack = async (req: Request<{ trackId: number }, {}, TrackRequest>, res: Response) => {
  const { trackId } = req.params;
  const { name, artist_id, genre_id } = req.body;

  try {
    // Check if the track exists
    const existingTrack = await Track.findOne({ where: { id: trackId } });
    if (!existingTrack) {
      return res.status(404).json({ error: 'Track not found' });
    }

    // Update the track properties if provided
    if (name) existingTrack.name = name;
    if (artist_id) {
      // Check if the artist exists
      const artist = await getArtistById(artist_id);
      if (!artist) {
        return res.status(400).json({ error: 'Artist with the provided ID does not exist' });
      }
      existingTrack.artist = artist;
    }
    if (genre_id) {
      // Check if the genre exists
      const genre = await getGenreById(genre_id);
      if (!genre) {
        return res.status(400).json({ error: 'Genre with the provided ID does not exist' });
      }
      existingTrack.genre = genre;
    }

    // Save the updated track
    await existingTrack.save();

    return res.status(200).json(existingTrack);
  } catch (error) {
    console.error('Error updating track:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
