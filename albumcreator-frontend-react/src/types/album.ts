import * as z from 'zod';
import { TrackDetailed, trackSchema } from './track';

export const albumListItemSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const albumDetailSchema = albumListItemSchema.extend({
  tracks: z.array(trackSchema),
});

export interface Album { 
  id: number;
  name: string;
}

export interface DetailedAlbum { 
  id: number;
  name: string;
  tracks: TrackDetailed[]
}
