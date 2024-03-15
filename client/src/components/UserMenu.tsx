import {UserRound} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {useAuth0} from "@auth0/auth0-react";
import {Link} from "react-router-dom";
import {Button} from "./ui/button";

// type User = {
//   email: string;
//   name: string;
// };

const UserMenu = () => {
  const {user, logout} = useAuth0();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center px-3 font-content text-white tracking-wide text-lg font-small-caps hover:text-orange-500 gap-2">
        <UserRound />
        <p>{user?.name}</p>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link to="/orders" className="font-content hover:text-orange-500 ">
            Orders
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            to="/user-profile"
            className="font-content hover:text-orange-500 "
          >
            Account
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            className="flex flex-1 bg-orange-500"
            onClick={() => logout()}
          >
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
