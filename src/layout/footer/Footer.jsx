import { NavLink } from "react-router-dom";

import "./Footer.css";

import "./Footer.css";

const Footer = () => {
  return (
    <footer className="py-14 pt-0">
      <div className="mt-0 container px-4">
        <hr className="mt-0" />
        <div className="row">
          <div className=" col-6 col-lg-4">
            <h3 className=" fw-medium">LiverMed</h3>
          </div>

          <div className="col">
            <h4>Enfermedades</h4>
            <ul className="list-unstyled d-flex flex-column gap-2 ">
              <li>
                <NavLink
                  to="/enfermedades/cancer"
                  className="text-decoration-none text-dark"
                >
                  Cancer
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/enfermedades/cirrosis"
                  className="text-decoration-none text-dark"
                >
                  Cirrosis
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/enfermedades/higadoGraso"
                  className="text-decoration-none text-dark"
                >
                  Higado graso
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/enfermedades/hepatitis"
                  className="text-decoration-none text-dark"
                >
                  Hepatitis
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="col">
            <h4>Información</h4>
            <ul className="list-unstyled d-flex flex-column gap-2 ">
              <li>
                <NavLink to="/" className="text-decoration-none text-dark">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/nosotros"
                  className="text-decoration-none text-dark"
                >
                  Sobre Nosotros
                </NavLink>
              </li>
              <li>
                <NavLink to="/mapa" className="text-decoration-none text-dark">
                  Mapa del sitio
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="col ">
            <h4>Pruebas</h4>
            <ul className="list-unstyled d-flex flex-column gap-2 ">
              <li>
                <NavLink to="/quiz" className="text-decoration-none text-dark">
                  Quiz
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="d-flex justify-content-between text-lg-start">
          <p>© 2025 LiverMed</p>
          <div className="d-flex gap-2 ">
            <a
              href="https://www.instagram.com/"
              to="/"
              className="text-dark"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-instagram fs-10 me-3"></i>
            </a>
            <a
              href="https://www.facebook.com/?locale=es_LA"
              to="/"
              className="text-dark"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-facebook fs-10 me-3"></i>
            </a>
            <a
              href="https://x.com/?lang=es"
              to="/"
              className="text-dark"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-twitter fs-10 me-3"></i>
            </a>
            <a
              href="https://co.linkedin.com/"
              to="/"
              className="text-dark"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-linkedin fs-10 me-3"></i>
            </a>
            <a
              href="https://www.youtube.com/?app=desktop&hl=es"
              to="/"
              className="text-dark"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-youtube fs-10"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
