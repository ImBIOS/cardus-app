import { withAuthentication } from "lib/api-middlewares/with-authentication";
import { withMethods } from "lib/api-middlewares/with-methods";
import storage from "lib/storage";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "DELETE") {
    try {
      const file = req.query.file as string;

      const bucket = storage.bucket(process.env.BUCKET_NAME as string);
      const fileToDelete = bucket.file(file);

      await fileToDelete.delete();

      res.status(200).end();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues);
      }

      return res.status(500).end();
    }
  }
}

export default withMethods(["DELETE"], withAuthentication(handler));
