import { getFirestore } from "firebase/firestore";
import { getApps,getApp ,initializeApp} from 'firebase/app';
import { getAuth,Auth} from 'firebase/auth';
import { sign } from "crypto";
const firebaseconfig = {
    apiKey: "AIzaSyDrXX-J40F7lcEbRVo7wqjEkZXVXddgTRg",
    authDomain: "yamaokigumi.firebaseapp.com",
    projectId: "yamaokigumi",
    storageBucket: "yamaokigumi.appspot.com",
    messagingSenderId: "497049610870",
    appId: "1:497049610870:web:51c77ef049e1b8cc4fcd57",
    measurementId: "G-CK5PXFVZP2"
}
const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseconfig);
const firestore = getFirestore(firebaseApp)
export const auth = getAuth(firebaseApp)


// // サーバーサイドでレンダリングするときにエラーが起きないようにするための記述
// if (typeof window !== "undefined" && !getApps().length) {
//     firebaseApp = initializeApp(firebaseConfig);
//     auth = getAuth();
//     firestore = getFirestore();
//     }   
export default {firestore,auth,firebaseApp};