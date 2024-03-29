import {createBrowserRouter, RouterProvider} from "react-router-dom";
import RootLayout from "./Layouts/RootLayout";
import HomePage from "./pages/HomePage";

import AuthCallbackPage from "./pages/AuthCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";
import ManageRestaurantPage from "./pages/ManageRestaurantPage";
import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {index: true, element: <HomePage />},
      {path: "/auth-callback", element: <AuthCallbackPage />},
      {path: "/search/:city", element: <SearchPage />},
      {path: "/details/:restaurantId", element: <DetailPage />},
      {path: "order-status", element: <RootLayout />},
      {
        path: "/user-profile",
        // loader: userDetailLoader,
        element: (
          <ProtectedRoute>
            <UserProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/manage-restaurant",
        element: (
          <ProtectedRoute>
            <ManageRestaurantPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
