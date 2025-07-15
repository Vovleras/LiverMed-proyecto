import { create } from "zustand";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase.config";

const provider = new GoogleAuthProvider();

const useAuthStore = create((set) => {
  const observeAuthState = () => {
    onAuthStateChanged(auth, (user) => {
      user ? set({ userLooged: user }) : set({ userLooged: null });
    });
  };
  observeAuthState();

  return {
    userLooged: null,

    loginGoogleWithPopUp: async () => {
      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        const userRef = doc(db, "Usuarios", user.uid);
        const userSnap = await getDoc(userRef);

        const userData = {
          Email: user.email,
          Nombre: user.displayName,
          PreguntaActual: 0,
          Puntuación: 0,
          Respuestas: [],
        };

        if (!userSnap.exists()) {
          console.log("Guardando nuevo usuario:", userData);
          await setDoc(userRef, userData);
        }

        return result;
      } catch (error) {
        console.error("Error logging in:", error);
      }
    },

    logout: async () => {
      return await signOut(auth)
        .then(() => set({ userLooged: null }))
        .catch((error) => console.error("Error logging out:", error));
    },
  };
});

export default useAuthStore;
