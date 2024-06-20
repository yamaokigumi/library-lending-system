import app from "./AuthConfig";
import { signInWithEmailAndPassword, getAuth, signOut } from "firebase/auth";


const auth = getAuth(app); 

// Function to sign in with email and password
export default async function signIn(email: string, password: string) {
    let result = null, 
        error = null; 

    try {
        result = await signInWithEmailAndPassword(auth, email, password); 
    } catch (e) {
        error = e; 
    }

    return { result, error }; 
}
export async function signOutUser() {
    try {
        return await signOut(auth);
    } catch (e) {
        console.error(e);
    }
}