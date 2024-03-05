import {useRegisterNewUser} from "@/hooks/user-hooks";
import {useAuth0} from "@auth0/auth0-react";
import {useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";

type AuthCallbackPageProps = {};

const AuthCallbackPage = (props: AuthCallbackPageProps) => {
  console.log("inside callback");

  const {user} = useAuth0();
  const {registerUser, isError, isPending, isSuccess} = useRegisterNewUser();
  const navigate = useNavigate();
  const hasCreated = useRef(false);
  useEffect(() => {
    if (user?.sub && user?.email && !hasCreated.current) {
      registerUser({auth0Id: user.sub!, email: user.email!, name: user.name!});
      hasCreated.current = true;
    }
    console.log(isSuccess);
    navigate("/");
  }, [registerUser, navigate, user]);
  return <div>Loading...</div>;
};

export default AuthCallbackPage;
