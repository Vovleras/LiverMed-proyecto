import { useRef, useState, useCallback, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import Floor from "../../models/quiz/models3d/Floor";
import Ball from "../../models/quiz/models3d/Ball";
import Controls from "../../models/quiz/controls/Controls";
import Target from "../../models/quiz/models3d/Target";
import { QUESTIONS } from "../../data/questions";
import useAuthStore from "../../store/use-auth-store";

const Quiz = () => {
  const ballRef = useRef();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [start, setStart] = useState(false);
  const [pause, setPause] = useState(false);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const {
    getCurrentQuestion,
    updateCurrentQuestion,
    resetScore,
    saveUserAnswer,
    getScore,
  } = useAuthStore();

  const currentQuestion = QUESTIONS[currentQuestionIndex];

  useEffect(() => {
    if (isQuizComplete) {
      const loadFinalScore = async () => {
        const finalScore = await getScore();
        setScore(finalScore);
      };
      loadFinalScore();
    }
  }, [isQuizComplete, getScore]);

  useEffect(() => {
    const loadCurrentQuestion = async () => {
      try {
        const preguntaActual = await getCurrentQuestion();
        console.log("Cargando pregunta:", preguntaActual);

        if (preguntaActual >= QUESTIONS.length) {
          setIsQuizComplete(true);
        } else {
          setCurrentQuestionIndex(preguntaActual);
        }
      } catch (error) {
        console.error("Error cargando pregunta:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCurrentQuestion();
  }, [getCurrentQuestion]);

  const reiniciar = useCallback(async () => {
    try {
      setCurrentQuestionIndex(0);
      setAnswered(false);
      setIsQuizComplete(false);
      setStart(false);
      setPause(false);
      await resetScore();
    } catch (error) {
      console.error("Error reiniciando:", error);
      window.location.reload();
    }
  }, [resetScore]);

  const handleResume = useCallback(() => {
    setPause(false);
    setAnswered(false);
  }, []);

  const handleStart = useCallback(() => {
    setStart(true);
  }, []);

  const handlePause = useCallback(() => {
    setPause(true);
  }, []);

  const handleAnswered = useCallback(
    async (selectedOptionIndex, isCorrect) => {
      if (answered) return;

      await saveUserAnswer(
        currentQuestionIndex,
        selectedOptionIndex,
        isCorrect
      );

      setTimeout(() => {
        setAnswered(true);
        if (ballRef.current && ballRef.current.resetBall) {
          ballRef.current.resetBall();
        }
      }, 1000);

      setTimeout(async () => {
        if (currentQuestionIndex < QUESTIONS.length - 1) {
          const nextQuestion = currentQuestionIndex + 1;
          setCurrentQuestionIndex(nextQuestion);
          await updateCurrentQuestion(nextQuestion);
          setAnswered(false);
        } else {
          await updateCurrentQuestion(QUESTIONS.length);
          setIsQuizComplete(true);
        }
      }, 1000);
    },
    [currentQuestionIndex, answered, updateCurrentQuestion, saveUserAnswer]
  );

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          fontSize: "18px",
          color: "#666",
        }}
      >
        <div>⏳ Cargando tu progreso...</div>
      </div>
    );
  }

  if (pause) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <h1 style={{ fontSize: "32px", fontWeight: "bold", color: "#333" }}>
          Juego Pausado
        </h1>
        <p style={{ fontSize: "16px", color: "#888" }}>
          Pregunta {currentQuestionIndex + 1} de {QUESTIONS.length}
        </p>
        <button
          onClick={handleResume}
          style={{
            fontSize: "20px",
            padding: "15px 30px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Continuar Juego
        </button>
      </div>
    );
  }

  if (!start) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <h1 style={{ fontSize: "32px", fontWeight: "bold", color: "#333" }}>
          ¡Bienvenido al Quiz de LiverMed!
        </h1>
        <p style={{ fontSize: "18px", color: "#666", textAlign: "center" }}>
          Responde {QUESTIONS.length} preguntas sobre enfermedades hepáticas
        </p>
        {currentQuestionIndex > 0 && (
          <p
            style={{
              fontSize: "16px",
              color: "#FF9800",
              fontWeight: "bold",
            }}
          >
            Continúa desde la pregunta {currentQuestionIndex + 1}
          </p>
        )}
        <button
          onClick={handleStart}
          style={{
            fontSize: "20px",
            padding: "15px 30px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {currentQuestionIndex > 0 ? "CONTINUAR JUEGO" : "EMPEZAR JUEGO"}
        </button>
      </div>
    );
  }

  if (isQuizComplete) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <h1 style={{ fontSize: "32px", fontWeight: "bold", color: "#00C853" }}>
          ¡Quiz Completado!
        </h1>
        <p style={{ fontSize: "18px", color: "#666" }}>
          ¡Felicidades! Has terminado todas las preguntas.
        </p>
        <p style={{ fontSize: "18px", color: "#666" }}>PUNTUACIÓN: {score}</p>

        <button
          onClick={reiniciar}
          style={{
            fontSize: "20px",
            padding: "15px 30px",
            backgroundColor: "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          REINICIAR QUIZ
        </button>
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          textAlign: "center",
          padding: "20px",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        Pregunta {currentQuestionIndex + 1} de {QUESTIONS.length}
        <div style={{ fontSize: "16px", margin: "10px 0" }}>
          {currentQuestion.question}
        </div>
      </div>

      <button
        onClick={handlePause}
        style={{
          position: "fixed",
          bottom: "390px",
          left: "500px",
          fontSize: "16px",
          padding: "12px 20px",
          backgroundColor: "#142f7bff",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "bold",
          zIndex: 1000,
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        }}
      >
        Pausar
      </button>

      <Canvas
        shadows
        style={{ height: "40vh" }}
        camera={{ position: [0, 4, 10], fov: 50 }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight
          castShadow
          position={[5, 10, 5]}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <Physics gravity={[0, -9.81, 0]} debug={false}>
          <Controls />
          <Floor />
          <Ball ref={ballRef} position={[0, 1, 4]} />

          {currentQuestion.options.map((option, index) => {
            const positions = [
              [-2, 1, -2],
              [2, 1, -2],
              [0, 1, -4],
            ];

            return (
              <Target
                key={`${currentQuestionIndex}-${index}`}
                position={positions[index]}
                ballRef={ballRef}
                answerText={option.label}
                res={option.correct}
                resIndex={index}
                onAnswered={handleAnswered}
                questionIndex={currentQuestionIndex}
                disabled={answered}
              />
            );
          })}
        </Physics>
      </Canvas>
    </div>
  );
};

export default Quiz;
