import {Menu} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet";
import {Button} from "./ui/button";
import {useAuth0} from "@auth0/auth0-react";
import MobileNavLinks from "./MobileNavLinks";

const MobileNav = () => {
  const {user, logout, isAuthenticated, loginWithRedirect} = useAuth0();
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-orange-500" />
      </SheetTrigger>
      {!isAuthenticated && (
        <SheetContent>
          <SheetTitle className="pt-2 pb-6  max-md:text-xs">
            <span>Welcome to Flavour Fusion</span>
          </SheetTitle>
          <SheetDescription className="flex">
            <Button
              className="flex-1 bg-orange-500 font-semibold font-content font-small-caps"
              onClick={async () => await loginWithRedirect()}
            >
              Log in
            </Button>
          </SheetDescription>
        </SheetContent>
      )}
      {isAuthenticated && (
        <SheetContent>
          <SheetTitle className="pt-2 pb-6 flex flex-col">
            <span className=" text-orange-500 font-small-caps font-light font-header">
              Hey {user?.name}
            </span>
            <span className="text-sm text-slate-500 font-normal font-content">
              Food on your mind?
            </span>
          </SheetTitle>
          <SheetDescription className="flex flex-col gap-4">
            <MobileNavLinks />
            <Button
              className="flex-1 bg-orange-500 font-semibold font-content font-small-caps"
              onClick={() => logout()}
            >
              Log out
            </Button>
          </SheetDescription>
        </SheetContent>
      )}
    </Sheet>
  );
};

export default MobileNav;
