import { create } from "zustand";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc, collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase.config";

const provider = new GoogleAuthProvider();

const useAuthStore = create((set, get) => {
  const observeAuthState = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        set({ userLooged: user, isLoading: false });
      } else {
        set({ userLooged: null, isLoading: false });
      }
    });
  };

  observeAuthState();

  return {
    userLooged: null,
    isLoading: true,

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

    getCurrentQuestion: async () => {
      const { userLooged } = get();
      if (!userLooged) return 0;

      try {
        const userRef = doc(db, "Usuarios", userLooged.uid);
        const userSnap = await getDoc(userRef);
        return userSnap.exists() ? userSnap.data().PreguntaActual || 0 : 0;
      } catch (error) {
        console.error("Error obteniendo pregunta actual:", error);
        return 0;
      }
    },
    updateCurrentQuestion: async (questionIndex) => {
      const { userLooged } = get();
      if (!userLooged) return;

      try {
        const userRef = doc(db, "Usuarios", userLooged.uid);
        await updateDoc(userRef, {
          PreguntaActual: questionIndex,
        });

        console.log("Pregunta actual actualizada a:", questionIndex);
      } catch (error) {
        console.error("Error actualizando pregunta actual:", error);
      }
    },

    resetScore: async () => {
      const { userLooged } = get();
      if (!userLooged) return;
      try {
        const userRef = doc(db, "Usuarios", userLooged.uid);
        await updateDoc(userRef, {
          Puntuación: 0,
          Respuestas: [],
          PreguntaActual: 0,
        });
        console.log("Información reiniciada correctamente.");
      } catch (error) {
        console.error("Error reiniciando información:", error);
      }
    },

    getScore: async () => {
      const { userLooged } = get();
      if (!userLooged) return 0;

      try {
        // Obtener datos desde Firestore
        const userRef = doc(db, "Usuarios", userLooged.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          const puntuacion = userData.Puntuación || 0;
          console.log("Puntuación obtenida correctamente:", puntuacion);
          return puntuacion;
        } else {
          console.log("Usuario no encontrado en Firestore");
          return 0;
        }
      } catch (error) {
        console.error("Error al obtener puntuación:", error);
        return 0;
      }
    },

    saveUserAnswer: async (questionIndex, selectedOptionIndex, isCorrect) => {
      const { userLooged } = get();
      if (!userLooged) return;

      try {
        const userRef = doc(db, "Usuarios", userLooged.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          const currentAnswers = userData.Respuestas || [];

          currentAnswers[questionIndex] = selectedOptionIndex;

          await updateDoc(userRef, {
            Respuestas: currentAnswers,

            Puntuación: userData.Puntuación + (isCorrect ? 1 : 0),
          });

          console.log("Respuesta guardada:", {
            questionIndex,
            selectedOptionIndex,
            isCorrect,
            nuevaPuntuacion: userData.Puntuación + (isCorrect ? 1 : 0),
          });
        }
      } catch (error) {
        console.error("Error guardando respuesta:", error);
      }
    },

    getTopThreePlayers: async () => {
      try {
        const usersRef = collection(db, "Usuarios");
        const q = query(usersRef, orderBy("Puntuación", "desc"), limit(3));
        const querySnapshot = await getDocs(q);
        
        const topPlayers = [];
        
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          topPlayers.push({
            puntaje: userData.Puntuación || 0,
            nombre: userData.Nombre || "Anónimo",
            foto: userData.foto || "https://cdn-icons-png.flaticon.com/512/12225/12225881.png" //solo sirve si firebase tiene la foto del usuario
          });
        });
        while (topPlayers.length < 3) {
          topPlayers.push({
            puntaje: 0,
            nombre: "---",
            foto: "https://cdn-icons-png.flaticon.com/512/12225/12225881.png"
          });
        }

        return topPlayers;

      } catch (error) {
        console.error("Error obteniendo top 3:", error);
        return [
          {puntaje: 0, nombre: '---', foto: 'https://cdn-icons-png.flaticon.com/512/12225/12225881.png'},
          {puntaje: 0, nombre: '---', foto: 'https://cdn-icons-png.flaticon.com/512/12225/12225881.png'},
          {puntaje: 0, nombre: '---', foto: 'https://cdn-icons-png.flaticon.com/512/12225/12225881.png'}
        ];
      }
    },
    

    getUserInfo: async () => {
      const { userLooged } = get();
      if (!userLooged) return;

      try {
        const userRef = doc(db, "Usuarios", userLooged.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) return null;

        const userData = userSnap.data();
        
        const haydatos = !(userData.PreguntaActual === 0 && userData.Puntuación === 0);
        return {
          puntaje: userData.Puntuación || 0,
          nombre: userData.Nombre || "Anónimo",
          foto: userData.foto || "https://cdn-icons-png.flaticon.com/512/12225/12225881.png",
          haydatos
        };
      } catch (error) {
        console.error("Error obteniendo datos del usuario:", error);
        return null;
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