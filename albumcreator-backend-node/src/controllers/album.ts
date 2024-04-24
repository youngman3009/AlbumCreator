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