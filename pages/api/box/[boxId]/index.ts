import { withAuthentication } from "lib/api-middlewares/with-authentication";
import { withMethods } from "lib/api-middlewares/with-methods";
import db from "lib/db";
import storage from "lib/storage";
import { boxPatchSchema } from "lib/validations/box/box-patch-schema";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { boxId } = req.query;
  if (typeof boxId === "undefined")
    return res.status(400).json({ error: "boxId is required" });

  if (req.method === "GET") {
    try {
      const box = await db.box.findFirst({
        where: {
          id: boxId as string,
        },
        include: {
          items: true,
        },
      });

      if (!box) return res.status(404).end();

      return res.status(200).json(box);
    } catch (error) {
      return res.status(500).end();
    }
  } else if (req.method === "PATCH") {
    try {
      const body = boxPatchSchema.parse(JSON.parse(req.body));

      const box = await db.box.update({
        where: {
          id: boxId as string,
        },
        data: body,
      });

      return res.status(200).json(box);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues);
      }

      return res.status(500).end();
    }
  } else if (req.method === "DELETE") {
    try {
      const box = await db.box.findFirst({
        where: {
          id: boxId as string,
        },
      });

      if (!box) return res.status(404).end();

      box.images.forEach(async (file) => {
        const bucket = storage.bucket(process.env.BUCKET_NAME as string);
        const fileToDelete = bucket.file(file);

        await fileToDelete.delete();
      });

      const deletedBox = await db.box.delete({
        where: {
          id: boxId as string,
        },
      });

      return res.status(200).json(deletedBox);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues);
      }

      return res.status(500).end();
    }
  }
}

export default withMethods(
  ["GET", "PATCH", "DELETE"],
  withAuthentication(handler)
);
