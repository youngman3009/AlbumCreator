import axios from 'axios';
import * as z from 'zod';
import { albumDetailSchema, albumListItemSchema } from '../types/album';


const BACKEND_HOST = import.meta.env.VITE_BACKEND_HOST;
const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT;
const instance = axios.create({
  baseURL: `http://${BACKEND_HOST}:${BACKEND_PORT}/api/v1`, 
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