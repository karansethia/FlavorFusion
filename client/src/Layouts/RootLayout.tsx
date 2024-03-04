import Footer from "@/components/Footer";
import Header from "@/components/Header";
import {Outlet} from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayout;
