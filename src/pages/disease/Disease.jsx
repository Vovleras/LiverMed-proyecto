import { useParams } from "react-router-dom";
import { useEffect, useState, Suspense } from "react";
import { modelos } from "../../models/modelsMap";
import "./Disease.css";

const Disease = () => {
  const { nombre } = useParams();
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(false);
  const [mostrarBoton, setMostrarBoton] = useState(true);
  const [scrollTop, setScrollTop] = useState(false);

  useEffect(() => {
    import(`../../data/${nombre}.json`)
      .then((modulo) => setInfo(modulo.default))
      .catch(() => setError(true));

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
  }, [nombre]);

  if (error)
    return <div className="p-4 text-red-600">Enfermedad no encontrada.</div>;

  if (!info) return <div className="p-4">Cargando información...</div>;

  const Modelos = modelos[nombre] || {};

  const renderLista = (lista) =>
    Array.isArray(lista) ? (
      <ul>
        {lista.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    ) : null;

  const handleClickScroll = () => {
    if (scrollTop) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    }
  };

  return (
    <div className="enfermedad">
      <div className="nombreEnfermedad">{info.nombre}</div>

      <section className="enfermedadColumna">
        <div className="modeloPal">
          <Suspense fallback={<div>Cargando modelo 1...</div>}>
            {Modelos.Modelo1 ? (
              <Modelos.Modelo1 />
            ) : (
              <img src="/imagenes/fallo.png" alt="fallo" />
            )}
          </Suspense>
        </div>
        <div className="text">
          <h2>¿Qué es?</h2>
          {info.queEs?.parrafo1 && <p>{info.queEs.parrafo1}</p>}
          {info.queEs?.parrafo2 && <p>{info.queEs.parrafo2}</p>}
        </div>
      </section>

      <section className="enfermedadRow">
        <div className="text">
          <h2>Síntomas</h2>
          {info.sintomas?.parrafo1 && <p>{info.sintomas.parrafo1}</p>}
          {renderLista(info.sintomas.lista)}
          {info.sintomas?.parrafo2 && <p>{info.sintomas.parrafo2}</p>}
        </div>
        <div className="modeloSec">
          <Suspense fallback={<div>Cargando modelo 2...</div>}>
            {Modelos.Modelo2 ? (
              <Modelos.Modelo2 />
            ) : (
              <img src="/imagenes/fallo.png" alt="fallo" />
            )}
          </Suspense>
        </div>
      </section>

      <section className="enfermedadRow">
        <div className="modeloSec">
          <Suspense fallback={<div>Cargando modelo 3...</div>}>
            {Modelos.Modelo3 ? (
              <Modelos.Modelo3 />
            ) : (
              <img src="/imagenes/fallo.png" alt="fallo" />
            )}
          </Suspense>
        </div>
        <div className="text">
          <h2>Tratamiento</h2>
          {info.tratamiento?.parrafo1 && <p>{info.tratamiento.parrafo1}</p>}
          {renderLista(info.tratamiento.lista)}
          {info.tratamiento?.parrafo2 && <p>{info.tratamiento.parrafo2}</p>}
        </div>
      </section>

      <section className="enfermedadRow">
        <div className="text">
          <h2>Prevención y cuidados</h2>
          {info.prevencion?.parrafo1 && <p>{info.prevencion.parrafo1}</p>}
          {renderLista(info.prevencion.lista)}
          {info.prevencion?.parrafo2 && <p>{info.prevencion.parrafo2}</p>}
        </div>
        <div className="modeloSec">
          <Suspense fallback={<div>Cargando modelo 4...</div>}>
            {Modelos.Modelo4 ? (
              <Modelos.Modelo4 />
            ) : (
              <img src="/imagenes/fallo.png" alt="fallo" />
            )}
          </Suspense>
        </div>
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

export default Disease;
