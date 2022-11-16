import { initializeApp } from "firebase/app";
import { enableIndexedDbPersistence, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

// Enable presistance
if (typeof window !== "undefined") {
  // if (location.hostname === "localhost") {
  //   db.useEmulator("localhost", 8080);
  // }

  enableIndexedDbPersistence(db).catch((err) => {
    if (err.code == "failed-precondition") {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
      console.error(
        "Multiple tabs open, persistence can only be enabled in one tab at a time."
      );
    } else if (err.code == "unimplemented") {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
      console.error(
        "The current browser does not support all of the features required to enable persistence"
      );
    }
  });
  // Subsequent queries will use persistence, if it was enabled successfully
}

export { app, db, storage };
