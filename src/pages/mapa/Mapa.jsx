import "./Mapa.css";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";

import sitioWeb from "/imagenes/sitioweb.png";

const Mapa = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="mapa-container">
      <div className="mapa-content">
        <h1>MAPA DEL SITIO</h1>

        <h2>Página de Inicio</h2>

        <ul className="list-unstyled d-flex flex-column gap-2  text-start ps-custom">
          <li>
            <NavLink to="/">Inicio</NavLink>
          </li>
        </ul>
        <h2>Enfermedades</h2>
        <ul className="list-unstyled d-flex flex-column gap-2 text-start ps-custom">
          <li>
            <NavLink to="/enfermedades/cancer">Cancer</NavLink>
          </li>
          <li>
            <NavLink to="/enfermedades/cirrosis">Cirrosis</NavLink>
          </li>
          <li>
            <NavLink to="/enfermedades/higadoGraso">Higado graso</NavLink>
          </li>
          <li>
            <NavLink to="/enfermedades/hepatitis">Hepatitis</NavLink>
          </li>
        </ul>
        <h2>¿Quienes somos?</h2>
        <ul className="list-unstyled d-flex flex-column gap-2 text-start ps-custom">
          <li>
            <NavLink to="/nosotros">Sobre Nosotros</NavLink>
          </li>
        </ul>
        <h2>Autenticación</h2>
        <ul className="list-unstyled d-flex flex-column gap-2  text-start ps-custom">
          <li>
            <NavLink to="/login">Iniciar Sesión</NavLink>
          </li>
        </ul>
      </div>
      <div className="mapa-image">
        <img
          src={sitioWeb}
          alt="Mapa del sitio"
          style={{
            width: "200px",
            height: "200px",
            objectFit: "contain",
            display: "flex",

            filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))",
          }}
        />
      </div>
    </div>
  );
};

export default Mapa;
