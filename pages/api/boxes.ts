import { withAuthentication } from "lib/api-middlewares/with-authentication";
import { withMethods } from "lib/api-middlewares/with-methods";
import db from "lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { z } from "zod";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (req.method === "GET") {
    try {
      if (session?.user.id) {
        const boxes = await db.box.findMany({
          where: {
            userId: session.user.id,
          },
          include: {
            items: true,
          },
        });

        return res.status(200).json(boxes);
      }
    } catch (error) {
      return res.status(500).end();
    }
  } else if (req.method === "POST") {
    try {
      if (session) {
        const { count } = req.body;

        const data = Array.from({ length: count }, (_, i) => {
          return {
            name: `Box ${i + 1}`,
            images: [],
            location: "",
            userId: session.user.id,
          };
        });

        // TODO: This is just a workaround for now. We need to find a way to optimize the performance of this.
        const boxes = await db.$transaction(
          data.map((box) => db.box.create({ data: box }))
        );

        return res.status(200).json(boxes);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues);
      }

      return res.status(500).end();
    }
  }
}

export default withMethods(["GET", "POST"], withAuthentication(handler));
