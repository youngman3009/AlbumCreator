import { addTrackToAlbum, createAlbum, deleteAlbum, deleteTracksFromAlbum, getAlbum, getAlbums } from '../../controllers/album';
import express from 'express';

const router = express.Router();

// Get all albums
router.get('/', getAlbums);

// Get all tracks for album
router.get('/:albumId/tracks', getAlbum)

// Create new album
router.post('/', createAlbum)

// Add track to album
router.put('/:albumId/tracks/:trackId', addTrackToAlbum);

// Delete tracks from album
router.delete('/:albumId/tracks', deleteTracksFromAlbum);

// Delete album
router.delete('/:albumId', deleteAlbum);

export { router as albumRouter };
