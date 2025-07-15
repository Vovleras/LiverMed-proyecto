import { useEffect, useState } from "react";
import { obtenerPreguntas } from "../../store/preguntas";

const Quiz = () => {
  const [preguntas, setPreguntas] = useState([]);

  useEffect(() => {
    obtenerPreguntas().then(setPreguntas);
  }, []);
  console.log(preguntas);

  return <div>Quiz</div>;
};

export default Quiz;
