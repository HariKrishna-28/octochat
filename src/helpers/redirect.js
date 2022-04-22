import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

export const AuthCheck = ({ auth }) => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  return !user && navigate("/");
};
