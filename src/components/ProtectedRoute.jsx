import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const user = useSelector((store) => store.userState.user);

  if (!user) return <Navigate to="/" replace />;

  return children;
}

export default ProtectedRoute;
