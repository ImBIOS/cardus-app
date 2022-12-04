import { withAuthentication } from "lib/api-middlewares/with-authentication";
import { withMethods } from "lib/api-middlewares/with-methods";
import storage from "lib/storage";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { z } from "zod";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const session = await getSession({ req });

      const bucket = storage.bucket(process.env.BUCKET_NAME as string);
      const file = bucket.file(`images/${session?.user.id}/${req.query.file}`);
      const options = {
        expires: Date.now() + 1 * 60 * 1000, //  1 minute,
        // fields: { "x-goog-meta-test": "data" } // Add custom image metadata
      };

      const [uploadUrl] = await file.generateSignedPostPolicyV4(options);
      const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
        bucket.name
      }/o/${encodeURIComponent(file.name)}?alt=media`;

      res.status(200).json({ uploadUrl, publicUrl });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues);
      }

      return res.status(500).end();
    }
  }
}

export default withMethods(["GET"], withAuthentication(handler));
