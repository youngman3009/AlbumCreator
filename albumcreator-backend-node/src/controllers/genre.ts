import { Request, Response } from 'express';
import { Genre } from 'src/models/genre';

export const getGenres = async (req: Request, res: Response) => {
  const genres = await Genre.find();
  return res.json(genres);
};