import AuthProvider from "@/auth/AuthProvider";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

import {Outlet} from "react-router-dom";

const RootLayout = () => {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="my-4">
          <Outlet />
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default RootLayout;
