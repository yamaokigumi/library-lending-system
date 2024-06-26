import { cert } from "firebase-admin/app";
import admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore"

const firebaseconfig = require("@/firebase_secret_key.json");

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: cert(firebaseconfig),
  });
}



const auth = getAuth();
const db = getFirestore();

export { auth, db, admin as default};
