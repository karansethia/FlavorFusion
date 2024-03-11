import {Link} from "react-router-dom";

const MobileNavLinks = () => {
  return (
    <>
      <Link
        to="/user-profile"
        className="flex bg-white items-center font-content hover:text-orange-500"
      >
        Account
      </Link>
    </>
  );
};

export default MobileNavLinks;
