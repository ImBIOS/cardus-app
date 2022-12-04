import { withAuthentication } from "lib/api-middlewares/with-authentication";
import { withMethods } from "lib/api-middlewares/with-methods";
import db from "lib/db";
import { boxCreateSchema } from "lib/validations/box/box-create-schema";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { z } from "zod";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const session = await getSession({ req });

      if (session) {
        const body = boxCreateSchema.parse(req.body);
        const { name, location, images } = body;

        const box = await db.box.create({
          data: {
            name: name as string,
            images: images as string[],
            location: location as string,
            userId: session.user.id,
          },
        });

        return res.status(200).json(box);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues);
      }

      return res.status(500).end();
    }
  }
}

export default withMethods(["POST"], withAuthentication(handler));
