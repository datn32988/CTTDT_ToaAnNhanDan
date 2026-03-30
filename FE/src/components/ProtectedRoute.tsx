import { Navigate } from "react-router-dom";
import { getAccessToken } from "../utils/auth";

type Props = {
  children: React.ReactNode;
};

function ProtectedRoute({ children }: Props) {

  const token = getAccessToken();
  if (!token) {
    return <Navigate to="/dangnhap" />;
  }

  return children;
}

export default ProtectedRoute;