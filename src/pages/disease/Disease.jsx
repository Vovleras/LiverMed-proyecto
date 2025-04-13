import { useParams } from 'react-router-dom';
import { useEffect, useState, Suspense } from 'react';
import { modelos } from '../../models/modelsMap';
import "./Disease.css";

const Disease = () => {

  const { nombre } = useParams();
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    import(`../../data/${nombre}.json`)
      .then((modulo) => setInfo(modulo.default))
      .catch(() => setError(true));
  }, [nombre]);

  if (error) return <div className="p-4 text-red-600">Enfermedad no encontrada.</div>;

  if (!info) return <div className="p-4">Cargando información...</div>;

  const Modelos = modelos[nombre] || {};

  return (
    <div className="enfermedad">
      <div className="nombreEnfermedad">{info.nombre}</div>

      <section className="enfermedadColumna">
        <div className="modeloPal">
          <Suspense fallback={<div>Cargando modelo 1...</div>}>
            {Modelos.Modelo1 ? <Modelos.Modelo1 /> : <img src="/imagenes/fallo.png" alt="fallo" />}
          </Suspense>
        </div>
        <div className="text">
          <h2>¿Qué es?</h2>
          <p>{info.descripcion}</p>
        </div>
      </section>

      <section className="enfermedadRow">
        <div className="text">
          <h2>Síntomas</h2>
          <p>{info.sintomas}</p>
        </div>
        <Suspense fallback={<div>Cargando modelo 1...</div>}>
          {Modelos.Modelo2 ? <Modelos.Modelo2 /> : <img src="/imagenes/fallo.png" alt="fallo" />}
        </Suspense>
      </section>

      <section className="enfermedadRow">
        <div className="modeloSec">
          <Suspense fallback={<div>Cargando modelo 1...</div>}>
            {Modelos.Modelo3 ? <Modelos.Modelo3 /> : <img src="/imagenes/fallo.png" alt="fallo" />}
          </Suspense>
        </div>
        <div className="text">
          <h2>Tratamiento</h2>
          <p>{info.tratamiento}</p>
        </div>        
      </section>

      <section className="enfermedadRow">
        <div className="text">
          <h2>Prevención y cuidados</h2>
          <p>{info.prevencionYcuidado}</p>
        </div>
        <div className="modeloSec">
          <Suspense fallback={<div>Cargando modelo 1...</div>}>
            {Modelos.Modelo4 ? <Modelos.Modelo4 /> : <img src="/imagenes/fallo.png" alt="fallo" />}
          </Suspense>
        </div>
      </section>

    </div>
  );
};

export default Disease;
