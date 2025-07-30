import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './resultados.css';

import Podio from '../../models/podioModel/PodioModel.jsx';
import useAuthStore from '../../store/use-auth-store.js';

function Resultados() {
  const navigate = useNavigate();
  const [animationClass, setAnimationClass] = useState('fade-in-start');
  const [progressWidth, setProgressWidth] = useState(0);
  const [userInfo, setUserInfo] = useState({});

  const getUserInfo = useAuthStore(state => state.getUserInfo);
  const isLoading = useAuthStore(state => state.isLoading);
  const resetScore = useAuthStore(state => state.resetScore);
  const updateCurrentQuestion = useAuthStore(state => state.updateCurrentQuestion);

  const reiniciarQuiz = async () => {
    try {
      await resetScore();
      await updateCurrentQuestion(0);
      navigate('/quiz');
    } catch (error) {
      console.error("Error reiniciando quiz:", error);
    }
  };

  const iniciarQuiz = () => {
    navigate('/quiz');
  };

  useEffect(() => {
    if (isLoading) return;

    const loadUserInfo = async () => {
      try {
        const user = await getUserInfo();

        if (!user || typeof user !== 'object' || user.haydatos !== true) {
          setUserInfo({
            haydatos: false,
            puntaje: null,
          });
        } else {
          setUserInfo(user);
        }

      } catch (error) {
        console.error("Error loading user data:", error);
        setUserInfo({
          haydatos: false,
          puntaje: null,
        });
      }
    };


    loadUserInfo();
  }, [getUserInfo, isLoading]);

  useEffect(() => {
    setTimeout(() => {
      setAnimationClass('fade-in-end');
    }, 100);

    if (userInfo.puntaje !== undefined) {
      setTimeout(() => {
        setProgressWidth((userInfo.puntaje * 20));
      }, 800);
    }
  }, [userInfo.puntaje]);

  // Estilos reutilizables para el botón
  const buttonStyle = {
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
  };

  const buttonHoverEffect = (e) => {
    e.target.style.transform = "translateY(-3px) scale(1.05)";
    e.target.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.3)";
  };

  const buttonLeaveEffect = (e) => {
    e.target.style.transform = "translateY(0px) scale(1)";
    e.target.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.2)";
  };

  return (
    <div className="result-container">
      <div className="podio-section">
        <Podio />
      </div>
      
      <div className="results-section">
        <div className="results-content">
          <div className={`content-wrapper ${animationClass}`}>
            {userInfo.haydatos ? (
              <>
                <div className="header-section">
                  <h2 className="result-title">
                    Resultados de Tu Quiz
                  </h2>
                </div>

                <div className="score-section">
                  <div className="score-header">
                    <div>
                      <h3 className="score-title">
                        Tu puntaje
                      </h3>
                    </div>
                    <div className="score-display">
                      <div className="puntaje">
                        {userInfo.puntaje * 20}%
                      </div>
                    </div>
                  </div>

                  <div className="progress-container">
                    <div
                      className="progress-bar"
                      style={{ width: `${progressWidth}%` }}
                    ></div>
                  </div>
                </div>

                <div className="summary-section">
                  <h5 className="summary-title">Resumen de tu resultado:</h5>
                  <div className="user-summary-card">
                    {userInfo.foto && (
                      <img
                        src={userInfo.foto}
                        alt="Foto del usuario"
                        className="user-photo"
                      />
                    )}
                    <div className="user-info">
                      <p className="user-name"><strong>Nombre:</strong> {userInfo.nombre || 'No disponible'}</p>
                      <p className="user-score"><strong>Aciertos:</strong> {userInfo.puntaje}/5</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={reiniciarQuiz}
                  style={buttonStyle}
                  onMouseEnter={buttonHoverEffect}
                  onMouseLeave={buttonLeaveEffect}
                >
                  REINICIAR QUIZ
                </button>
              </>
            ) : (
              <div className="no-results-section">
                <h4 className="no-results-title">
                  Aún no hay datos de tu quiz 😞
                </h4>
                <h4 className="no-results-subtitle">
                  Presenta el quiz en:
                </h4>
                <button
                  onClick={iniciarQuiz}
                  className="quiz-button"
                  style={buttonStyle}
                  onMouseEnter={buttonHoverEffect}
                  onMouseLeave={buttonLeaveEffect}
                >
                  PRESENTAR
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resultados;