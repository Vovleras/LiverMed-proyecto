import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Header.css";

const Header = () => {
  return (
    <nav
      style={{ backgroundColor: "#b1b6c8" }}
      className="navbar navbar-expand-md px-3 fixed-top "
    >
      <div className="container-fluid">
        <NavLink
          to="/"
          className="navbar-brand d-flex align-items-center gap-3"
        >
          <img
            src="/imagenes/LM.png"
            alt="Logo LiverMed"
            className="custom-img"
          />
          <span className="fw-normal text-custom">LiverMed</span>
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav gap-3">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Inicio
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
                style={{ cursor: "pointer", fontWeight: "500" }}
              >
                Enfermedades
              </span>

              <ul className="dropdown-menu dropdown-menu-custom">
                <li>
                  <NavLink
                    to="/enfermedades/cirrosis"
                    className="dropdown-item"
                  >
                    <span className="dropdown-text">Cirrosis</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/enfermedades/higadoGraso"
                    className="dropdown-item"
                  >
                    <span className="dropdown-text">Hígado Graso</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/enfermedades/hepatitis"
                    className="dropdown-item"
                  >
                    <span className="dropdown-text">Hepatitis B</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/enfermedades/cancer" className="dropdown-item">
                    <span className="dropdown-text">Cáncer</span>
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <NavLink to="/quiz" className="nav-link">
                Quiz
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/nosotros" className="nav-link">
                Sobre nosotros
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/login" className="btn btn-custom">
                Iniciar Sesión
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
