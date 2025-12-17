import React from "react";
import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AllScholarships from "../pages/AllScholarships/AllScholarships";
import AddScholarship from "../pages/AddScholarship/AddScholarship";
import PrivateRoute from "./PrivateRoute";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/allscholarship",
        element: <AllScholarships/>
      },
      {
        path: "/addcholarship",
        element: <PrivateRoute>
          <AddScholarship/>
        </PrivateRoute>
      }
    ],
  },
]);

export default Router;
