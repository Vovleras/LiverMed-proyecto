import { Link } from "react-router";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <ul>
          <li>
            <Link to="/">Casita</Link>
          </li>
      </ul>
    </footer>
  );
};

export default Footer;