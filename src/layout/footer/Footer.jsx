import { Link } from "react-router";

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
                <Link to="/" className="text-decoration-none text-dark">
                  Cancer
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-decoration-none text-dark">
                  Cirrosis
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-decoration-none text-dark">
                  Higado graso
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-decoration-none text-dark">
                  Hepatitis
                </Link>
              </li>
            </ul>
          </div>

          <div className="col">
            <h4>Información</h4>
            <ul className="list-unstyled d-flex flex-column gap-2 ">
              <li>
                <Link to="/" className="text-decoration-none text-dark">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-decoration-none text-dark">
                  Sobre Nosotros
                </Link>
              </li>
            </ul>
          </div>

          <div className="col ">
            <h4>Pruebas</h4>
            <ul className="list-unstyled d-flex flex-column gap-2 ">
              <li>
                <Link to="/" className="text-decoration-none text-dark">
                  Quiz
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="d-flex justify-content-between text-lg-start">
          <p>© 2025 LiverMed</p>
          <div className="d-flex gap-2 ">
            <Link to="/" className="text-dark">
              <i className="bi bi-instagram fs-10 me-3"></i>
            </Link>
            <Link to="/" className="text-dark">
              <i className="bi bi-facebook fs-10 me-3"></i>
            </Link>
            <Link to="/" className="text-dark">
              <i className="bi bi-twitter fs-10 me-3"></i>
            </Link>
            <Link to="/" className="text-dark">
              <i className="bi bi-linkedin fs-10 me-3"></i>
            </Link>
            <Link to="/" className="text-dark">
              <i className="bi bi-youtube fs-10"></i>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
