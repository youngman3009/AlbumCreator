import express from 'express';
import { createTrack, getTracks } from '../../controllers/track';

const router = express.Router();

// Get all tracks
router.get('/', getTracks);

// Create new track
router.post('/', createTrack);

export { router as trackRouter };