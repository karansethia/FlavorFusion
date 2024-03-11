import {createBrowserRouter, Router, RouterProvider} from "react-router-dom";
import RootLayout from "./Layouts/RootLayout";
import HomePage from "./pages/HomePage";
import AuthProvider from "./auth/AuthProvider";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {index: true, element: <HomePage />},
      {path: "/auth-callback", element: <AuthCallbackPage />},
      {path: "/search/:city", element: <RootLayout />},
      {path: "/detail/:restaurantId", element: <RootLayout />},
      {path: "order-status", element: <RootLayout />},
      {path: "/user-profile", element: <UserProfilePage />},
      {path: "/manage-restaurant", element: <RootLayout />},
    ],
  },
]);

function App() {
  return (
    // <AuthProvider>
    <RouterProvider router={router} />
    // </AuthProvider>
  );
}

export default App;
