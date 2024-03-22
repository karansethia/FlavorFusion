import {Link} from "react-router-dom";
import logo from "@/assets/logodark.png";
import logo_sec from "@/assets/logolight.png";
import MobileNav from "./MobileNav";
import Navigation from "./Navigation";
import {useLocation} from "react-router-dom";

// type HeaderProps = {};

const Header = () => {
  const {pathname} = useLocation();
  console.log(pathname);

  return (
    <div className=" py-1 max-md:py-3 z-50">
      <div className="container flex justify-between items-center">
        {pathname !== "/" && (
          <Link to="/">
            <img
              src={logo_sec}
              alt="flavour fusion"
              className="w-[12rem] py-2 max-md:w-24"
            />
          </Link>
        )}
        {pathname === "/" && (
          <Link to="/">
            <img
              src={logo}
              alt="flavour fusion"
              className="w-[12rem] py-2 max-md:w-24"
            />
          </Link>
        )}
        <div className="md:hidden">
          <MobileNav />
        </div>
        <div className="hidden md:block">
          <Navigation />
        </div>
      </div>
    </div>
  );
};

export default Header;
