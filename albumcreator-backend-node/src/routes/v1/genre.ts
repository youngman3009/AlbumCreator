import express from 'express';
import { Genre } from 'src/models/genre';

const router = express.Router();

// Get all genres
router.get('/', async (req, res) => {
  const genres = await Genre.find();
  return res.json(genres);
});

export { router as genreRouter };
