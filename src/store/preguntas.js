import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.config";

export async function obtenerPreguntas() {
  try {
    const snapshot = await getDocs(collection(db, "Preguntas"));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error al obtener preguntas:", error);
    return [];
  }
}
