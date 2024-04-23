import { Request, Response } from 'express';
import { Artist } from '../models/artist';

export const getArtists = async (req: Request, res: Response) => {
  try {
    const genres = await Artist.find();
    return res.json(genres);
  } catch (error) {
    console.error('Error getting artists:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const createArtist = async (req: Request, res: Response) => {
  const { first_name, last_name } = req.body;

  if (!first_name || !last_name) {
    return res.status(400).json({ error: 'Both first_name and last_name are required' });
  }

  try {
    // Check if the artist already exists
    const existingArtist = await Artist.findOne({ where: { first_name, last_name } });
    if (existingArtist) {
      return res.status(400).json({ error: 'Artist with the same first name and last name already exists' });
    }

    // Create a new artist
    const newArtist = Artist.create({ first_name, last_name });
    await newArtist.save();

    return res.status(201).json(newArtist);
  } catch (error) {
    console.error('Error creating artist:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const artistExists = async (id: number): Promise<boolean> => {
  const artist = await Artist.findOne({ where: { id: id }});
  return !!artist;
};

export const getArtistById = async (id: number): Promise<Artist | null> => {
  return await Artist.findOne({ where: { id: id }});
};
