import { withAuthentication } from "lib/api-middlewares/with-authentication";
import { withMethods } from "lib/api-middlewares/with-methods";
import db from "lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const session = await getSession({ req });

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
  }
}

export default withMethods(["GET"], withAuthentication(handler));
