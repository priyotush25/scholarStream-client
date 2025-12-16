import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer} from 'react-toastify';
import "./index.css";
import { RouterProvider } from "react-router";
import Router from "./routes/Router";
import AuthProvider from "./context/AuthProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={Router} />
    </AuthProvider>
     <ToastContainer />
  </StrictMode>
);
