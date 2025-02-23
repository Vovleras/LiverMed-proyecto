import { Link } from "react-router";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <ul>
        <li>
          <Link to="/enfermedades"> Enfermedades </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
