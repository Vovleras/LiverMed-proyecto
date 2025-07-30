import { useMemo } from "react";
import { Suspense } from "react";
import { modelos } from "../../models/modelsMap";
import Carousel from "./Carrusel";
import { images } from "../../data/images";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import LiverModel from "../../models/homeModel/homeModel";

const getRandomModelo1 = () => {
  const enfermedades = Object.keys(modelos);
  const random = Math.floor(Math.random() * enfermedades.length);
  const enfermedad = enfermedades[random];
  return modelos[enfermedad].Modelo1;
};

const Home = () => {
  const navigate = useNavigate();
  const ModeloAleatorio = useMemo(() => getRandomModelo1(), []);
  const [mostrarBoton, setMostrarBoton] = useState(true);
  const [scrollTop, setScrollTop] = useState(false);

  useEffect(() => {
    // Forzar el desplazamiento al inicio
    window.scrollTo({ top: 0, behavior: "auto" });

    // Evaluar la posición inicial del scroll
    const evaluateScrollPosition = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= documentHeight - 210) {
        setScrollTop(true);
      } else {
        setScrollTop(false);
      }
      setMostrarBoton(true);
    };

    // Evaluar la posición inicial
    evaluateScrollPosition();

    // evento de scroll
    const handleScrollEvent = () => {
      evaluateScrollPosition();
    };

    window.addEventListener("scroll", handleScrollEvent);
    return () => window.removeEventListener("scroll", handleScrollEvent);
  }, []);

  const handleClickScroll = () => {
    if (scrollTop) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    }
  };

  const handleLearn = () => {
    // Encuentra la enfermedad correspondiente al modelo aleatorio
    const enfermedad = Object.keys(modelos).find(
      (key) => modelos[key].Modelo1 === ModeloAleatorio
    );

    if (enfermedad) {
      // Navega a la ruta de la enfermedad
      navigate(`/enfermedades/${enfermedad}`);
    }
  };

  return (
    <div>
      <section className="homePresentation">
        <div className="homeText">
          <h1>LiverMed</h1>
          <p
            style={{
              textAlign: "justify",
              paddingTop: "15px",
              paddingBottom: "15px",
            }}
          >
            El hígado es un órgano con múltiples funciones esenciales, como
            regular la mayoría de los niveles químicos de la sangre, descomponer
            las grasas y prepararlas para su digestión y absorción. Detectar
            enfermedades hepáticas a tiempo es fundamental, por lo que es
            importante informarse sobre algunas de ellas.
          </p>
          <button className="BotonAprende" onClick={handleLearn}>
            {" "}
            Aprende ahora
          </button>
        </div>

        <div className="presentationModel">
          <Suspense fallback={<div>Cargando modelo 3D...</div>}>
            <ModeloAleatorio />
          </Suspense>
        </div>
      </section>

      <section className="exploracion">
        <h1>Explora con total inmersión</h1>
        <Suspense fallback={<div>Cargando modelo 3d</div>}>
          {LiverModel ? (
            <LiverModel />
          ) : (
            <img src="/imagenes/fallo.png" alt="fallo" />
          )}
        </Suspense>
      </section>

      <section className="enfermedadesComunes">
        <h1>Enfermedades comunes</h1>
        <Carousel images={images} />
      </section>
      {mostrarBoton && (
        <div
          className="position-fixed top-50 end-0 me-4 mt-5 pt-5 z-3"
          style={{ zIndex: 1030 }}
        >
          <button onClick={handleClickScroll} className="btn btn-personalizado">
            {scrollTop ? (
              <>
                Subir <i className="bi bi-arrow-up"></i>
              </>
            ) : (
              <>
                Ver más <i className="bi bi-arrow-down"></i>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;