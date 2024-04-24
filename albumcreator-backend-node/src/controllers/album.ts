import { Request, Response } from 'express';
import { Album } from '../models/album';

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
    console.error('Error getting albums:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
