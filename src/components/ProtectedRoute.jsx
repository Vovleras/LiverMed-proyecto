import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "../store/use-auth-store";

const ProtectedRoute = ({ children }) => {
  const { userLooged, isLoading } = useAuthStore();
  const location = useLocation();

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <p>Cargando...</p>
      </div>
    );
  }

  if (!userLooged) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
