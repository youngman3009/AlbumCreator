import express from 'express';
import { createTrack, getTracks, updateTrack } from '../../controllers/track';

const router = express.Router();

// Get all tracks
router.get('/', getTracks);

// Create new track
router.post('/', createTrack);

router.put('/:trackId', updateTrack)

export { router as trackRouter };