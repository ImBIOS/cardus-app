import { db } from "configs/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { withAuthentication } from "helpers/api-middlewares/with-authentication";
import { withMethods } from "helpers/api-middlewares/with-methods";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const session = await getSession({ req });
    let data: any[] = [];

    const q = query(
      collection(db, "boxes"),
      where("email", "==", session?.user?.email)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      data.push({ id: doc.id, fields: doc.data() });
    });

    res.status(200).json({ res: data });
  }
}

export default withMethods(["GET"], withAuthentication(handler));
