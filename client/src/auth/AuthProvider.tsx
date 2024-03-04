import {ReactNode} from "react";
import {type AppState, type User, Auth0Provider} from "@auth0/auth0-react";
import {useRegisterNewUser} from "@/hooks/user-hooks";
type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider = ({children}: AuthProviderProps) => {
  const {registerUser, isError, isPending, isSuccess} = useRegisterNewUser();

  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URI;
  if (!domain || !clientId || !redirectUri) {
    throw new Error("Unable to initialize auth");
  }

  const redirectHandler = (appState?: AppState, user?: User) => {
    console.log("User: ", user);
    if (user?.sub && user?.email) {
      registerUser({auth0Id: user.sub!, email: user.email!, name: user.name!});
    }
  };
  return (
    <Auth0Provider
      clientId={clientId}
      domain={domain}
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
      onRedirectCallback={redirectHandler}
    >
      {children}
    </Auth0Provider>
  );
};

export default AuthProvider;
