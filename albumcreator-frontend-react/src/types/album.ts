import * as z from 'zod';
import { TrackDetailed, trackSchema } from './track';

export const albumListItemSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const albumDetailSchema = albumListItemSchema.extend({
  tracks: z.array(trackSchema),
});

export interface BaseAlbum {
  name: string;
}

export interface Album extends BaseAlbum { 
  id: number;
  name: string;
}

export interface DetailedAlbum extends Album { 
  id: number;
  name: string;
  tracks: TrackDetailed[]
}
