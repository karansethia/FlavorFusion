import {useAuth0} from "@auth0/auth0-react";
import {Button} from "./ui/button";
import UserMenu from "./UserMenu";
import {Link} from "react-router-dom";

const Navigation = () => {
  const {loginWithRedirect, isAuthenticated} = useAuth0();
  return (
    <div className="flex space-x-2 items-center">
      {isAuthenticated ? (
        <>
          <Link
            to="/order-status"
            className="font-medium text-white hover:text-orange-500"
          >
            Order Status
          </Link>
          <UserMenu />
        </>
      ) : (
        <Button
          variant="outline"
          onClick={async () => await loginWithRedirect()}
          className="text-orange-500 font-small-caps text-md"
        >
          Login
        </Button>
      )}
    </div>
  );
};

export default Navigation;
