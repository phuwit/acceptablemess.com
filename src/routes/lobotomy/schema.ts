import { z } from 'zod';
export const formSchema = z.object({
  youtube_external: z.boolean().default(false),
});
export type FormSchema = typeof formSchema;
