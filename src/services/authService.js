import { signInAnonymously, signOut } from "firebase/auth";
import { auth } from "./firebase";

export const AuthService = {
  loginAnonymous: async () => {
    return await signInAnonymously(auth);
  },
  logout: async () => {
    return await signOut(auth);
  },
  getCurrentUser: () => auth.currentUser,
};
