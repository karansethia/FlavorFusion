import {Toaster} from "sonner";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./global.css";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import AuthProvider from "./auth/AuthProvider.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    {/* <AuthProvider> */}
    <Toaster visibleToasts={1} position="top-right" richColors />
    <App />
    {/* </AuthProvider> */}
  </QueryClientProvider>
);
