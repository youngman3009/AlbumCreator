import * as z from 'zod';
import { trackSchema } from './track';

export const albumListItemSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const albumDetailSchema = albumListItemSchema.extend({
  tracks: z.array(trackSchema),
});