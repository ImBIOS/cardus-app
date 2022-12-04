import * as z from "zod";

export const itemCreateSchema = z.object({
  // TODO: It should not optional but it is for now
  name: z.string().max(128).optional(),
  keywords: z
    .array(
      z.object({
        name: z.string().max(128),
      })
    )
    .optional(),
  images: z.array(z.string()).optional(),
  boxId: z.string().optional(),
});
