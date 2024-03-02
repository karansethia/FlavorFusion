import {Menu} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet";
import {Button} from "./ui/button";

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-orange-500" />
      </SheetTrigger>
      <SheetContent>
        <SheetTitle className="pt-2 pb-6  max-md:text-xs">
          <span>Welcome to Flavour Fusion</span>
        </SheetTitle>
        <SheetDescription className="flex">
          <Button className="flex-1 bg-orange-500 font-semibold font-content font-small-caps">
            Log in
          </Button>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
