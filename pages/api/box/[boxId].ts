import { db, storage } from "configs/firebase";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { withAuthentication } from "helpers/api-middlewares/with-authentication";
import { withMethods } from "helpers/api-middlewares/with-methods";
import { boxPatchSchema } from "helpers/validations/box-patch-schema";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { boxId } = req.query;
  if (typeof boxId === "undefined")
    res.status(400).json({ error: "Bad Request" });

  if (req.method === "GET") {
    const docRef = doc(db, "boxes", boxId as string);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      res.status(200).json({ res: docSnap.data() });
    } else {
      // doc.data() will be undefined in this case
      res.status(404);
    }
  } else if (req.method === "PATCH") {
    const { name, items, attachments, location } = req.body;

    type FormData = z.infer<typeof boxPatchSchema>;

    const requestData: FormData = {
      id: boxId as string
    };

    name !== undefined && (requestData.name = name);
    items !== undefined && (requestData.items = items);
    attachments !== undefined && (requestData.attachments = attachments);
    location !== undefined && (requestData.location = location);

    await setDoc(doc(db, "boxes", boxId as string), requestData, {
      merge: true
    });
    res.status(200).json({ id: boxId });
  } else if (req.method === "DELETE") {
    const { attachments } = req.body;

    attachments.forEach((attachment: { fileName: string }) => {
      // Create a reference to the file to delete
      const objectRef = ref(storage, "images/" + attachment.fileName);

      // Delete the file
      deleteObject(objectRef)
        .then(() => {
          // File deleted successfully
        })
        .catch((error) => {
          // Uh-oh, an error occurred!
        });
    });

    await deleteDoc(doc(db, "boxes", boxId as string));

    res.status(200).json({ id: boxId });
  }
}

export default withMethods(
  ["GET", "PATCH", "DELETE"],
  withAuthentication(handler)
);
