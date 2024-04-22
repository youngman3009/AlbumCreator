import express from 'express';
import { getGenres } from 'src/controllers/genre';

const router = express.Router();

// Get all genres
router.get('/', getGenres);

export { router as genreRouter };
