import { storage } from "configs/firebase";
import { deleteObject, ref } from "firebase/storage";
import { withAuthentication } from "helpers/api-middlewares/with-authentication";
import { withMethods } from "helpers/api-middlewares/with-methods";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "DELETE") {
    const { fileName } = req.body;

    // Create a reference to the file to delete
    const objectRef = ref(storage, "images/" + fileName);

    // Delete the file
    deleteObject(objectRef)
      .then(() => {
        // File deleted successfully
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.error(error);
      });

    res.status(204).end();
  }
}

export default withMethods(["DELETE"], withAuthentication(handler));
