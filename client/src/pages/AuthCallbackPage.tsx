import {useRegisterNewUser} from "@/hooks/user-hooks";
import {useAuth0} from "@auth0/auth0-react";
import {useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";

const AuthCallbackPage = () => {
  console.log("inside callback page");

  const {user} = useAuth0();
  const {registerUser} = useRegisterNewUser();
  const navigate = useNavigate();
  const hasCreated = useRef(false);
  useEffect(() => {
    console.log("UseEffect Running");

    if (user?.sub && user?.email && !hasCreated.current) {
      registerUser({auth0Id: user.sub!, email: user.email!, name: user.name!});
      hasCreated.current = true;
    }
    navigate("/");
  }, [registerUser, navigate, user]);
  return <div>Loading...</div>;
};

export default AuthCallbackPage;
