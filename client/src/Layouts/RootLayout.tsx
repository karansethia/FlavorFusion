import Header from "@/components/Header";
import {Outlet} from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* <div className="mx-auto container flex-1 py-10"> */}
      <Outlet />
      {/* </div> */}
    </div>
  );
};

export default RootLayout;
