import { Request, Response } from 'express';
import { Genre } from '../models/genre';

export const getGenres = async (req: Request, res: Response) => {
  try {
    const genres = await Genre.find();
    return res.json(genres);
  } catch (error) {
    console.error('Error getting genres:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const genreExists = async (id: number): Promise<boolean> => {
  const genre = await Genre.findOne({ where: { id: id }});
  return !!genre;
};

export const getGenreById = async (id: number): Promise<Genre | null> => {
  return await Genre.findOne({ where: { id: id }});
};
