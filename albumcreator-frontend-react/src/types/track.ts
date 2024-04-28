import * as z from 'zod';

export const genreSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const artistSchema = z.object({
  id: z.number(),
  first_name: z.string(),
  last_name: z.string(),
});

export const trackSchema = z.object({
  id: z.number(),
  name: z.string(),
  genre: genreSchema,
  artist: artistSchema,
});

export interface TrackDetailed extends z.infer<typeof trackSchema> {}

export interface Track {
  name: string;
  genre_id: number;
  artist_id: number;
}
