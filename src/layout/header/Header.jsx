import { NavLink } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";

const Header = () => {
  return (
    <nav
      style={{ backgroundColor: "#b1b6c8" }}
      className="navbar navbar-expand-md   px-3"
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
          <span className="fw-bold text-custom">LiverMed</span>
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
          className="collapse navbar-collapse justify-content-end "
          id="navbarNav"
        >
          <ul className="navbar-nav gap-3">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/enfermedades" className="nav-link">
                Enfermedades
              </NavLink>
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
