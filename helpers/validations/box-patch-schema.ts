import * as z from "zod";

export const boxPatchSchema = z.object({
  id: z.string().max(128),
  name: z.string().max(128).optional(),
  items: z
    .array(
      z.object({
        name: z.string().max(128)
      })
    )
    .optional(),
  attachments: z
    .array(
      z.object({
        url: z.string().max(128).url(),
        fileName: z.string().max(128).optional()
      })
    )
    .optional(),
  location: z.string().max(128).optional()
});
