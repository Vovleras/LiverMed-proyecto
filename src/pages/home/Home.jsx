import { useMemo } from "react";
import { Suspense } from "react";
import { modelos } from "../../models/modelsMap";
import Carousel from "./Carrusel";
import { images } from "../../data/images";
import { useEffect, useState } from "react";
import "./Home.css";

const getRandomModelo1 = () => {
  const enfermedades = Object.keys(modelos);
  const random = Math.floor(Math.random() * enfermedades.length);
  const enfermedad = enfermedades[random];
  return modelos[enfermedad].Modelo1;
};

const Home = () => {
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
            El hígado es un órgano de color marrón rojizo que tiene múltiples
            funciones como regular la mayor parte de los niveles químicos de la
            sangre y excretar un producto llamado bilis, que ayuda a descomponer
            las grasas y las prepara para su posterior digestión y absorción.
          </p>
          <button className="BotonAprende">Aprende ahora</button>
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
          <img src="/imagenes/liver.png" alt="liver" />
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
