import { Request, Response } from 'express';
import { Album } from '../models/album';
import { AppDataSource } from '../data-source';
import { Track } from '../models/track';

export const getAlbums = async (req: Request, res: Response) => {
  try {
    const albums = await Album.find();
    return res.json(albums);
  } catch (error) {
    console.error('Error getting albums:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAlbum = async (req: Request<{ albumId: number }, {}, {}>, res: Response) => {
  try {
    const { albumId } = req.params;
    const album = await Album.findOne({ where: { id: albumId }, relations: ['tracks', 'tracks.genre', 'tracks.artist'] });
    if (!album) return res.status(400).json({ error: 'Album ID does not exist' });
    return res.json(album);
  } catch (error) {
    console.error('Error getting album:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const createAlbum = async (req: Request<{}, {}, { name: string }>, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Name is required' });
    if (await albumExistsByName(name)) return res.status(400).json({ error: 'Name must be unique' });
    const newAlbum = AppDataSource.getRepository(Album).create({
      name
    });
    await newAlbum.save();
    return res.status(201).json(newAlbum);
  } catch (error) {
    console.error('Error getting albums:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const addTrackToAlbum = async (req: Request<{ albumId: number; trackId: number }, {}, {}>, res: Response) => {
  try {
    const { albumId, trackId } = req.params;
    const album = await Album.findOne({ where: { id: albumId } });
    if (!album) return res.status(404).json({ error: 'Album not found' });

    const track = await Track.findOne({ where: { id: trackId } });
    if (!track) return res.status(404).json({ error: 'Track not found' });

    const isTrackAlreadyAdded = album.tracks.some(existingTrack => existingTrack.id === trackId);
    if (isTrackAlreadyAdded) return res.status(400).json({ error: 'Track is already on the album' });

    album.tracks.push(track);
    await album.save();

    return res.status(200).json(album);
  } catch (error) {
    console.error('Error adding track to album:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteTracksFromAlbum = async (req: Request<{ albumId: number }, {}, { track_ids: number[] }>, res: Response) => {
  try {
    const { albumId } = req.params;
    const { track_ids } = req.body;

    const album = await Album.findOne({ where: { id: albumId }, relations:  ['tracks'] });
    if (!album) return res.status(404).json({ error: 'Album not found' });
    console.log(album);

    for (const trackId of track_ids) {
      album.tracks = album.tracks.filter(track => track.id !== trackId);
    }
    await album.save();

    return res.status(200).json(album);
  } catch (error) {
    console.error('Error deleting tracks from album:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteAlbum = async (req: Request<{ albumId: number }, {}, {}>, res: Response) => {
  try {
    const { albumId } = req.params;
    const album = await Album.findOne({ where: { id: albumId } });
    if (!album) return res.status(404).json({ error: 'Album not found' });

    await album.remove();

    return res.status(200).json({ message: 'Album deleted successfully' });
  } catch (error) {
    console.error('Error deleting album:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const albumExistsByName = async (name: string): Promise<boolean> => {
  const album = await Album.findOne({ where: { name: name }});
  return !!album;
};
