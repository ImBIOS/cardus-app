import { withAuthentication } from "lib/api-middlewares/with-authentication";
import { withMethods } from "lib/api-middlewares/with-methods";
import db from "lib/db";
import { itemCreateSchema } from "lib/validations/item/item-create-schema";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { z } from "zod";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const session = await getSession({ req });

      if (session) {
        const body = itemCreateSchema.parse(req.body);
        const { name, keywords, images, boxId } = body;

        const keywordNames = keywords?.map((keyword) => keyword.name);

        // Embed item into box
        const item = await db.item.create({
          data: {
            name: name as string,
            keywords: keywordNames,
            images: images,
            box: {
              connect: { id: boxId },
            },
          },
        });

        return res.status(200).json(item);
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
