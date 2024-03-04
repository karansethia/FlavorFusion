import {Button} from "./components/ui/button";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import RootLayout from "./Layouts/RootLayout";
import HomePage from "./pages/HomePage";
import AuthProvider from "./auth/AuthProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {index: true, element: <HomePage />},
      {path: "/auth-callback", element: <RootLayout />},
      {path: "/search/:city", element: <RootLayout />},
      {path: "/detail/:restaurantId", element: <RootLayout />},
      {path: "order-status", element: <RootLayout />},
      {path: "/user-profile", element: <RootLayout />},
      {path: "/manage-restaurant", element: <RootLayout />},
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
