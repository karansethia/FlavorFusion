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
      <Link
        to="/order-status"
        className="flex bg-white items-center font-content hover:text-orange-500"
      >
        Order Status
      </Link>
      <Link
        to="/manage-restaurant"
        className="flex bg-white items-center font-content hover:text-orange-500"
      >
        Manage Restaurant
      </Link>
    </>
  );
};

export default MobileNavLinks;
