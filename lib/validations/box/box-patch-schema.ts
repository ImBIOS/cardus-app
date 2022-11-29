import * as z from "zod";

export const boxPatchSchema = z.object({
  name: z.string().max(128).optional(),
  location: z.string().max(128).optional(),
  images: z.array(z.string().max(128)).optional()
});
