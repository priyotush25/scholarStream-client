import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "../components/common/PrivateRoute";
import PublicRoute from "../components/common/PublicRoute";

import Home from "../pages/Home";
import AllScholarships from "../pages/AllScholarships";
import ScholarshipDetails from "../pages/ScholarshipDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Checkout from "../pages/Checkout";
import PaymentSuccess from "../pages/PaymentSuccess";
import PaymentFailed from "../pages/PaymentFailed";
import NotFound from "../pages/NotFound";

// Dashboard Pages
import DashboardHome from "../pages/Dashboard/DashboardHome";
import Profile from "../pages/Dashboard/Profile";

// Admin
import AddScholarship from "../pages/Dashboard/Admin/AddScholarship";
import UpdateScholarship from "../pages/Dashboard/Admin/UpdateScholarship";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import ManageScholarships from "../pages/Dashboard/Admin/ManageScholarships";
import Analytics from "../pages/Dashboard/Admin/Analytics";

// Moderator
import ManageApplications from "../pages/Dashboard/Moderator/ManageApplications";
import ManageReviews from "../pages/Dashboard/Moderator/ManageReviews";

// Student
import MyApplications from "../pages/Dashboard/Student/MyApplications";
import EditApplication from "../pages/Dashboard/Student/EditApplication";
import MyReviews from "../pages/Dashboard/Student/MyReviews";
import MyWishlist from "../pages/Dashboard/Student/MyWishlist";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "scholarships",
        element: <AllScholarships />,
      },
      {
        path: "scholarship/:id",
        element: <ScholarshipDetails />,
      },
      {
        path: "login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: "register",
        element: (
          <PublicRoute>
            <Register />
          </PublicRoute>
        ),
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "checkout/:id",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },
      {
        path: "payment-success",
        element: <PaymentSuccess />,
      },
      {
        path: "payment-failed",
        element: <PaymentFailed />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      // Admin Routes
      {
        path: "manage-users",
        element: (
          <PrivateRoute requiredRole="admin">
            <ManageUsers />
          </PrivateRoute>
        ),
      },
      {
        path: "add-scholarship",
        element: (
          <PrivateRoute requiredRole="admin">
            <AddScholarship />
          </PrivateRoute>
        ),
      },
      {
        path: "update-scholarship/:id",
        element: (
          <PrivateRoute requiredRole="admin">
            <UpdateScholarship />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-scholarships",
        element: (
          <PrivateRoute requiredRole="admin">
            <ManageScholarships />
          </PrivateRoute>
        ),
      },
      {
        path: "analytics",
        element: (
          <PrivateRoute requiredRole="admin">
            <Analytics />
          </PrivateRoute>
        ),
      },
      // Moderator Routes
      {
        path: "manage-applications",
        element: (
          <PrivateRoute requiredRole="moderator">
            <ManageApplications />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-reviews",
        element: (
          <PrivateRoute requiredRole="moderator">
            <ManageReviews />
          </PrivateRoute>
        ),
      },
      // Student Routes
      {
        path: "my-applications",
        element: (
          <PrivateRoute requiredRole="student">
            <MyApplications />
          </PrivateRoute>
        ),
      },
      {
        path: "my-wishlist",
        element: (
          <PrivateRoute requiredRole="student">
            <MyWishlist />
          </PrivateRoute>
        ),
      },
      {
        path: "edit-application/:id",
        element: (
          <PrivateRoute requiredRole="student">
            <EditApplication />
          </PrivateRoute>
        ),
      },
      {
        path: "my-reviews",
        element: (
          <PrivateRoute requiredRole="student">
            <MyReviews />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
