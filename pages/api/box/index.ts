import { db } from "configs/firebase";
import { addDoc, collection } from "firebase/firestore";
import { withAuthentication } from "helpers/api-middlewares/with-authentication";
import { withMethods } from "helpers/api-middlewares/with-methods";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { name, items, attachments, location, email } = req.body;

    const docRef = await addDoc(collection(db, "boxes"), {
      name: name,
      items: items,
      attachments: attachments,
      location: location,
      email: email
    });

    res.status(200).json({ id: docRef.id });
  }
}

export default withMethods(["POST"], withAuthentication(handler));
