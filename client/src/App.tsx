import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import RootLayout from "./Layouts/RootLayout";
import AuthProvider from "./auth/AuthProvider";
import HomePage from "./pages/HomePage";

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
      {
        path: "/user-profile",
        // loader: userDetailLoader,
        element: <UserProfilePage />,
      },
      {path: "/manage-restaurant", element: <RootLayout />},
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
