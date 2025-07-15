import "./Login.css";
import useAuthStore from "../../store/use-auth-store";
import { useNavigate } from "react-router";
import { useCallback } from "react";

const Login = () => {
  const { loginGoogleWithPopUp } = useAuthStore();
  const navigate = useNavigate();
  const handleLogin = useCallback(() => {
    loginGoogleWithPopUp()
      .then(() => navigate("/"))
      .catch(() => navigate("/login"));
  }, [loginGoogleWithPopUp, navigate]);
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
            src="/imagenes/google.png" // Cambia la ruta por la de tu imagen
            style={{
              width: "24px",
              height: "24px",
              marginRight: "10px",
              verticalAlign: "middle",
            }}
          />
          Inicar Sesión con Google
        </button>
      </div>
    </>
  );
};

export default Login;
