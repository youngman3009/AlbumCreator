import { getAlbums } from '../../controllers/album';
import express from 'express';

const router = express.Router();

// Get all albums
router.get('/', getAlbums);

// Get all tracks for album

// Create new album

// Add track to album

// Delete tracks from album

// Delete album

export { router as albumRouter };