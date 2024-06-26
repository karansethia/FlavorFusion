import {ReactNode} from "react";
import {type AppState, Auth0Provider} from "@auth0/auth0-react";
import {useNavigate} from "react-router-dom";
type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider = ({children}: AuthProviderProps) => {
  console.log("inside auth provider");

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
  //appState.returnTo if we are trying to login from other pages like restaurant details before checkout
  const redirectHandler = (appState?: AppState) => {
    navigate(appState?.returnTo || "/auth-callback");
  };
  return (
    <Auth0Provider
      clientId={clientId}
      domain={domain}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience,
      }}
      onRedirectCallback={redirectHandler}
      useRefreshTokens={true}
      cacheLocation="localstorage"
    >
      {children}
    </Auth0Provider>
  );
};

export default AuthProvider;
