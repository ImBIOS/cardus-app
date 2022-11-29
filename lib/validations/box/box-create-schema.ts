import * as z from "zod";

export const boxCreateSchema = z.object({
  // TODO: It should not optional but it is for now
  name: z.string().max(128).optional(),
  location: z.string().max(128).optional(),
  images: z.array(z.string()).optional()
});
