import { useRef, useState, useCallback, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import Floor from "../../models/quiz/models3d/Floor";
import Ball from "../../models/quiz/models3d/Ball";
import Controls from "../../models/quiz/controls/Controls";
import Target from "../../models/quiz/models3d/Target";
import { QUESTIONS } from "../../data/questions";
import useAuthStore from "../../store/use-auth-store";
import higadoIcono from "/imagenes/higadoIcono.png";

import tutoria from "/imagenes/tutoria.png";
import { useNavigate } from "react-router-dom";


const Quiz = () => {
  const ballRef = useRef();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const navigate = useNavigate();
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
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (isQuizComplete) {
      navigate("/resultados");
      const loadFinalScore = async () => {
        const finalScore = await getScore();
        setScore(finalScore);        
        /*
        setTimeout(() => { //esta vaina deja un tiempo adicional que al parecer no queremos para nada
          navigate("/resultados"); 
        }, 1);*/
        
      };
    }
  }, [isQuizComplete, getScore, navigate]);

  useEffect(() => {
    const loadCurrentQuestion = async () => {
      try {
        const preguntaActual = await getCurrentQuestion();
        console.log("Cargando pregunta:", preguntaActual);

        if (preguntaActual >= QUESTIONS.length) {
          setIsQuizComplete(true);
          setPause(false);
          setStart(false);
        } else {
          setCurrentQuestionIndex(preguntaActual);

          setPause(true);
          setStart(false);
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

  const handleStart = useCallback(() => {
    setStart(true);
    setPause(false);
    setAnswered(false);
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
        <div> Cargando quiz...</div>
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
          height: "90vh",
          flexDirection: "column",
          gap: "35px",
          textAlign: "center",
          padding: "20px",
          position: "relative",
          marginTop: "4%",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            position: "absolute",

            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
            radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 1px, transparent 1px),
            radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
          }}
        />

        <div
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            borderRadius: "20px",
            padding: "50px 40px",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            zIndex: 1,
            maxWidth: "500px",
          }}
        >
          <div
            style={{
              marginBottom: "5px",
            }}
          >
            <img
              src={higadoIcono}
              alt="Hígado"
              style={{
                width: "64px",
                height: "64px",
                objectFit: "contain",

                filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))",
              }}
            />
          </div>
          <h1
            style={{
              fontSize: "36px",
              fontWeight: "800",
              color: "#0d1533",
              marginBottom: "8px",
              letterSpacing: "1px",
            }}
          >
            LIVERMED
          </h1>

          <div
            style={{
              width: "60px",
              height: "4px",
              backgroundColor: "#AFBEF3",
              margin: "0 auto 20px auto",
              borderRadius: "2px",
            }}
          />
          <h2
            style={{
              fontSize: "20px",
              color: "#34495e",
              fontWeight: "600",
              marginBottom: "15px",
            }}
          >
            Quiz de Hepatología
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: "#7f8c8d",
              lineHeight: "1.6",
              marginBottom: "25px",
            }}
          >
            Evalúa tus conocimientos sobre el diagnóstico y tratamiento de
            enfermedades hepáticas
          </p>
          {currentQuestionIndex > 0 && (
            <div
              style={{
                color: "#0d1533",
                padding: "12px 20px",
                borderRadius: "25px",
                fontSize: "14px",
                fontWeight: "600",
                marginBottom: "20px",
              }}
            >
              Continuar desde pregunta {currentQuestionIndex + 1}
            </div>
          )}
        </div>

        <button
          onClick={handleStart}
          style={{
            fontSize: "18px",
            padding: "16px 40px",
            background: "linear-gradient(135deg, #1e2747 0%, #0d1533 100%)",
            color: "white",
            border: "2px solid white",
            borderRadius: "50px",
            cursor: "pointer",
            fontWeight: "700",
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
            transition: "all 0.3s ease",
            textTransform: "uppercase",
            letterSpacing: "1px",
            zIndex: 1,
            marginTop: "5%",
            flexWrap: "wrap",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-3px) scale(1.05)";
            e.target.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.3)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0px) scale(1)";
            e.target.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.2)";
          }}
        >
          {currentQuestionIndex > 0 ? "Continuar" : " Comenzar Quiz"}
        </button>
      </div>
    );
  }

  if (1 === isQuizComplete) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
          flexDirection: "column",
          gap: "35px",
          textAlign: "center",
          padding: "20px",
          position: "relative",
          marginTop: "30px",
        }}
      >
        <div
          style={{
            position: "absolute",

            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
            radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 1px, transparent 1px),
            radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
          }}
        />

        <div
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            borderRadius: "20px",
            padding: "50px 40px",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            zIndex: 1,
            maxWidth: "600px",
          }}
        >
          <div
            style={{
              marginBottom: "5px",
            }}
          >
            <img
              src={tutoria}
              alt="trofeo"
              style={{
                width: "114px",
                height: "114px",
                objectFit: "contain",

                filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))",
              }}
            />
          </div>

          <div
            style={{
              width: "60px",
              height: "4px",
              backgroundColor: "#afbef3",
              margin: "0 auto 20px auto",
              borderRadius: "2px",
            }}
          />

          <h2
            style={{
              fontSize: "20px",
              color: "#1E2747",
              lineHeight: "1.6",
              marginBottom: "5px",
              fontWeight: "700",
              marginTop: "10px",
            }}
          >
            ¡FELICITACIONES HAS COMPLETADO EL QUIZ!
          </h2>

          <div
            style={{
              color: "#404A6E",
              padding: "12px 20px",
              borderRadius: "25px",
              fontSize: "17px",
              fontWeight: "600",

              marginTop: "5px",
            }}
          >
            PUNTAJE <br />
            <h2
              style={{
                color: "#404A6E",
                fontWeight: "600",
                fontSize: "15px",
                marginTop: "5px",
              }}
            >
              {score} de {QUESTIONS.length}
            </h2>
          </div>
        </div>

        <button
          onClick={reiniciar}
          style={{
            fontSize: "18px",
            padding: "16px 40px",
            background: "linear-gradient(135deg, #1e2747 0%, #0d1533 100%)",
            color: "white",
            border: "2px solid white",
            borderRadius: "50px",
            cursor: "pointer",
            fontWeight: "700",
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
            transition: "all 0.3s ease",
            textTransform: "uppercase",
            letterSpacing: "1px",
            zIndex: 1,
            marginTop: "20px",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-3px) scale(1.05)";
            e.target.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.3)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0px) scale(1)";
            e.target.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.2)";
          }}
        >
          REINICIAR QUIZ
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "flex-start",
        width: "100%",
        marginTop: "125px",
        padding: "10px",
        gap: "0px",
        marginBottom: "5%",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "linear-gradient(135deg, #1E2747 0%, #404A6E 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "30px",
          color: "white",
          boxShadow: "5px 0 15px rgba(0,0,0,0.1)",
          borderRadius: "15px 0px 0px 15px",
          flexShrink: 0,
          height: "80vh",
          overflowY: "auto",
          maxHeight: "calc(100vh - 10px)",
        }}
      >
        <div>
          {/* Progreso */}
          <div
            style={{
              background: "rgba(255,255,255,0.2)",
              borderRadius: "15px",
              padding: "15px",

              textAlign: "center",
              marginTop: "10px",
            }}
          >
            <div
              style={{
                fontSize: "14px",
                marginBottom: "8px",
                opacity: "0.9",
              }}
            >
              Pregunta {currentQuestionIndex + 1} de {QUESTIONS.length}
            </div>
            <div
              style={{
                background: "rgba(255,255,255,0.3)",
                borderRadius: "10px",
                height: "8px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  background: "#AFBEF3",
                  height: "100%",
                  width: `${
                    ((currentQuestionIndex + 1) / QUESTIONS.length) * 100
                  }%`,
                  borderRadius: "10px",
                  transition: "width 0.3s ease",
                }}
              />
            </div>
          </div>

          {/* Pregunta */}

          <h1
            style={{
              fontSize: "22px",
              fontWeight: "700",
              margin: "90px 0px 0px 0px",
              lineHeight: "1.4",
            }}
          >
            PREGUNTA
          </h1>

          <div
            style={{
              background: "rgba(255,255,255,0.15)",
              borderRadius: "15px",
              padding: "20px",
              marginBottom: "20px",
              marginTop: "30px",
            }}
          >
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "600",
                margin: "0",
                lineHeight: "1.4",
              }}
            >
              {currentQuestion.question}
            </h3>
          </div>

          {/* Botón pausar */}
          <button
            onClick={handlePause}
            style={{
              fontSize: "16px",
              padding: "12px 24px",
              background: "linear-gradient(135deg, #1e2747 0%, #404a6e 100%)",
              color: "white",
              border: "2px solid white",
              borderRadius: "25px",
              cursor: "pointer",
              fontWeight: "700",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
              transition: "all 0.3s ease",
              textTransform: "uppercase",
              letterSpacing: "1px",
              width: "50%",
              marginTop: "20px",
              marginBottom: "10%",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 16px rgba(0, 0, 0, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0px)";
              e.target.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.2)";
            }}
          >
            Pausar
          </button>
        </div>

        {/* Instrucciones */}
        <div
          style={{
            background: "rgba(255,255,255,0.1)",
            borderRadius: "12px",
            padding: "15px",
            fontSize: "14px",
            lineHeight: "1.5",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <h4
            style={{
              margin: "0 0 10px 0",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            Instrucciones:
          </h4>
          <ul
            style={{
              margin: "0",
              paddingLeft: "15px",
              opacity: "0.9",
            }}
          >
            <li>Apunta con el mouse</li>
            <li>Click para disparar</li>
            <li>Golpea la respuesta correcta</li>
          </ul>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          minWidth: "300px",
          maxWidth: "110vh",
          background: "linear-gradient(135deg, #d2d5dfff 0%, #757E9D 80%)",
          borderRadius: "0px 15px 15px 0px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Canvas
          shadows
          style={{
            height: "80vh",
            width: "100%",
          }}
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
            <Ball ref={ballRef} position={[0, 0, 4.7]} />

            {currentQuestion.options.map((option, index) => {
              const positions = [
                [-3.5, 1, 1],
                [3.5, 1, 1],
                [0, 1, -1],
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
    </div>
  );
};

export default Quiz;
