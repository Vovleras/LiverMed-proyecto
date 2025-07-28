import "./Login.css";
import useAuthStore from "../../store/use-auth-store";
import { useNavigate, useLocation } from "react-router-dom"; // Agregar useLocation
import { useCallback, useEffect } from "react";

const Login = () => {
  const { loginGoogleWithPopUp, userLooged } = useAuthStore(); // Agregar userLooged
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = useCallback(() => {
    loginGoogleWithPopUp().catch((error) => {
      console.error("Error en login:", error);
    });
  }, [loginGoogleWithPopUp]);

  useEffect(() => {
    if (userLooged) {
      navigate(from, { replace: true });
    }
  }, [userLooged, navigate, from]);

  return (
    <>
      <div className="medio-circulo"></div>
      <div className="Login">
        <h1>LiverMed</h1>
        <h5>Investiga y Aprende</h5>
        <button
          type="button"
          className="btn btn-secondary btn-lg Myboton"
          onClick={handleLogin}
        >
          <img
            src="/imagenes/google.png"
            style={{
              width: "24px",
              height: "24px",
              marginRight: "10px",
              verticalAlign: "middle",
            }}
          />
          {"Iniciar Sesión con Google"}
        </button>
      </div>
    </>
  );
};

export default Login;
