import React, { useState, useEffect } from 'react';
import './resultados.css';

import Podio from '../../models/podioModel/PodioModel.jsx'
import useAuthStore from '../../store/use-auth-store.js';

function Resultados() {
  const [animationClass, setAnimationClass] = useState('fade-in-start');
  const [progressWidth, setProgressWidth] = useState(0);
  const [userInfo, setuserInfo] = useState({});

  const getUserInfo = useAuthStore(state => state.getUserInfo);
  const isLoading = useAuthStore(state => state.isLoading);

  useEffect(() => {
    if (isLoading) return;

    const loadUserInfo = async () => {
      try {
        const user = await getUserInfo();
        console.log("Información del usuario:", user);
        setuserInfo(user)
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };

    loadUserInfo();
  }, [getUserInfo, isLoading]);

  useEffect(() => {
    setTimeout(() => {
      setAnimationClass('fade-in-end');
    }, 100);

    if (userInfo.puntaje) {
      setTimeout(() => {
        setProgressWidth((userInfo.puntaje*20));
      }, 800);
    }
  }, [userInfo.puntaje]);

  return (
    <div className="result-container">
      <div className="podio-section">
        <Podio />
      </div>
      
      <div className="results-section">
        <div className="results-content">
          <div className={`content-wrapper ${animationClass}`}>
            {userInfo.puntaje ? (
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
                    <img
                      src={userInfo.foto}
                      alt="Foto del usuario"
                      className="user-photo"
                    />
                    <div className="user-info">
                      <p className="user-name"><strong>Nombre:</strong> {userInfo.nombre}</p>
                      <p className="user-score"><strong>Aciertos:</strong> {userInfo.puntaje}/5</p>
                    </div>
                  </div>
                </div>

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
                  className="quiz-button"
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
                  Presentar Quiz
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