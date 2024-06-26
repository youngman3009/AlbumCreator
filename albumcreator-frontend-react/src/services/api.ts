import axios from 'axios';
import * as z from 'zod';
import { BaseAlbum, albumDetailSchema, albumListItemSchema } from '../types/album';
import { Track, artistSchema, genreSchema, trackSchema } from '../types/track';


const instance = axios.create({
  baseURL: `${window.location.origin}/api/v1`, 
});

const isSuccessfulResponse = (status: number) => status >= 200 && status < 300;

export const getAlbums = async () => {
  const response = await instance.get('/albums');
  if (!isSuccessfulResponse(response.status)) {
      throw new Error(`Request failed with status code: ${response.status}`);
  }

  const parsedData = z.array(albumListItemSchema).parse(response.data);
  return parsedData; 
};

export const getAlbumTracks = async (albumId: number) => {
  const response = await instance.get(`/albums/${albumId}/tracks`);
  if (!isSuccessfulResponse(response.status)) {
      throw new Error(`Request failed with status code: ${response.status}`);
  }

  const parsedData = albumDetailSchema.parse(response.data); 
  return parsedData;
};

export const deleteAlbum = async (albumId: number) => {
  const response = await instance.delete(`/albums/${albumId}`);
  if (!isSuccessfulResponse(response.status)) {
    throw new Error(`Request failed with status code: ${response.status}`);
  }
};

export const deleteAlbumTracks = async (albumId: number, trackIds: number[]) => {
  const response = await instance.delete(`/albums/${albumId}/tracks`, { data: { track_ids: trackIds } });
  if (!isSuccessfulResponse(response.status)) {
    throw new Error(`Request failed with status code: ${response.status}`);
  }
};

export const createAlbum = async (newAlbumData: BaseAlbum) => {
  const response = await instance.post('/albums', newAlbumData);
  if (!isSuccessfulResponse(response.status)) {
    throw new Error(`Request failed with status code: ${response.status}`);
  }
};

export const getTracks = async () => {
  const response = await instance.get('/tracks');
  if (!isSuccessfulResponse(response.status)) {
    throw new Error(`Request failed with status code: ${response.status}`);
  }
  const parsedData = z.array(trackSchema).parse(response.data);
  return parsedData; 
};

export const updateTrack = async (trackId: number, updatedData: Partial<Track>) => {
  const response = await instance.put(`/tracks/${trackId}`, updatedData);
  if (!isSuccessfulResponse(response.status)) {
    throw new Error(`Request failed with status code: ${response.status}`);
  }
};

export const createTrack = async (newTrackData: Track) => {
  const response = await instance.post('/tracks', newTrackData);
  if (!isSuccessfulResponse(response.status)) {
    throw new Error(`Request failed with status code: ${response.status}`);
  }
};

export const addTrackToAlbum = async (trackId: number, albumId: number) => {
  const response = await instance.put(`/albums/${albumId}/tracks/${trackId}`);
  if (!isSuccessfulResponse(response.status)) {
    throw new Error(`Request failed with status code: ${response.status}`);
  }
};

export const getArtists = async () => {
  const response = await instance.get('/artists');
  if (!isSuccessfulResponse(response.status)) {
    throw new Error(`Request failed with status code: ${response.status}`);
  }
  const parsedData = z.array(artistSchema).parse(response.data);
  return parsedData; 
};

export const getGenres = async () => {
  const response = await instance.get('/genres');
  if (!isSuccessfulResponse(response.status)) {
    throw new Error(`Request failed with status code: ${response.status}`);
  }
  const parsedData = z.array(genreSchema).parse(response.data);
  return parsedData; 
};