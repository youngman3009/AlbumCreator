import { Request, Response } from 'express';
import { Genre } from 'src/models/genre';

export const getGenres = async (req: Request, res: Response) => {
  try {
    const genres = await Genre.find();
    return res.json(genres);
  } catch (error) {
    console.error('Error getting genres:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};