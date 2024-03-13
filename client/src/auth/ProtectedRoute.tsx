import {useAuth0} from "@auth0/auth0-react";
import {ReactNode, useEffect} from "react";
import {useNavigate} from "react-router-dom";

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute = ({children}: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const {isAuthenticated} = useAuth0();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/", {replace: true});
    }
  }, [navigate, isAuthenticated]);
  return <div>{children}</div>;
};

export default ProtectedRoute;
