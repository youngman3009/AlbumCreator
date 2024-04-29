import express from 'express';
import { createArtist, getArtists } from '../../controllers/artist';

const router = express.Router();

// Get all genres
router.get('/', getArtists);

// Create new artist
router.post('/', createArtist);

export { router as artistRouter };
