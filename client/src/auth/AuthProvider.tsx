import {ReactNode} from "react";
import {type AppState, type User, Auth0Provider} from "@auth0/auth0-react";
import {useNavigate} from "react-router-dom";
type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider = ({children}: AuthProviderProps) => {
  const navigate = useNavigate();
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URI;
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;
  if (!domain || !clientId || (!redirectUri && !audience)) {
    throw new Error("Unable to initialize auth");
  }

  /**
   * The auth logic is shifted to '/auth-callback' routes because useAuth0 and getAccessTokenSilently are required to be inside AuthProvider
   */
  const redirectHandler = (appState?: AppState, user?: User) => {
    console.log("User: ", user);
    navigate("/auth-callback");
  };
  return (
    <Auth0Provider
      clientId={clientId}
      domain={domain}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience: audience,
      }}
      onRedirectCallback={redirectHandler}
    >
      {children}
    </Auth0Provider>
  );
};

export default AuthProvider;
