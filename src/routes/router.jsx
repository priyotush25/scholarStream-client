import { createBrowserRouter } from "react-router";
import Root from "../pages/Root/Root";
import HomeLayout from "../Layouts/HomeLayout/HomeLayout";
import Login from "../components/Auth/Login/Login";
import Register from "../components/Auth/Register/Register";
import AllScholarships from "../components/common/Scholarships/AllScholarships/AllScholarships";
import ScholarshipDetails from "../components/common/Scholarships/ScholarshipDetails.jsx/ScholarshipDetails";
import LearnMore from "../components/LandingPage/LearnMore";
import PaymentSuccess from "../pages/Payments/PaymentSuccess";

import HowItWorks from "../pages/FooterPages/HowItWorks";
import Blog from "../pages/FooterPages/Blog";
import HelpCenter from "../pages/FooterPages/HelpCenter";
import ContactUs from "../pages/FooterPages/ContactUs";
import SuccessStories from "../pages/FooterPages/SuccessStories";
import PrivacyPolicy from "../pages/FooterPages/PrivacyPolicy";
import Loader from "../components/common/Loader/Loader";
import Error from "../pages/Errors/Error";
import Forbidden from "../pages/Errors/Forbidden";
import Unauthorized from "../pages/Errors/Unauthorized";
import MainDashboard from "../Layouts/Dashboard/MainDashboard";
import MyProfile from "../pages/Dashboard/common/MyProfile";
import MyApplications from "../components/Student/MyApplications";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import PaymentFailed from "../pages/Payments/PaymentFailed";
import MyReviews from "../components/Student/MyReviews";
import AddScholarship from "../pages/Dashboard/Admin/AddScholarship";
import ManageScholarships from "../pages/Dashboard/Admin/ManageScholarships";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import ManageApplications from "../pages/Dashboard/Moderator/ManageApplications";
import AllReviews from "../pages/Dashboard/Moderator/AllReviews";

import PrivateRoutes from "../context/ProtecedRoutes/PrivateRoutes";
import AdminRoute from "../context/ProtecedRoutes/AdminRoute";
import ModeratorRoute from "../context/ProtecedRoutes/ModeratorRoute";

const router = createBrowserRouter([
  {
    path: "/",
    hydrateFallbackElement: <Loader />,
    errorElement: <Error />,
    element: <Root />, // এখানে Component -> element
    children: [
      {
        index: true,
        element: <HomeLayout />, // Component -> element
      },
      {
        path: "/login",
        element: <Login />, // Component -> element
      },
      {
        path: "/register",
        element: <Register />, // Component -> element
      },
      {
        path: "/how-it-works",
        element: <HowItWorks />,
      },
      {
        path: "/faq",
        element: <LearnMore />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/help-center",
        element: <HelpCenter />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/success-stories",
        element: <SuccessStories />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/forbidden",
        element: <Forbidden />,
      },
      {
        path: "/unauthorized",
        element: <Unauthorized />,
      },
      {
        path: "/all-scholarships",
        element: (
          <PrivateRoutes>
            <AllScholarships />
          </PrivateRoutes>
        ),
      },
      {
        path: "/scholarship-details/:id",
        element: (
          <PrivateRoutes>
            <ScholarshipDetails />
          </PrivateRoutes>
        ),
      },
      {
        path: "/payment-success",
        element: <PaymentSuccess />,
      },
      {
        path: "/payment-cancelled",
        element: <PaymentFailed />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <MainDashboard />
      </PrivateRoutes>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />, // Component -> element
      },
      {
        path: "my-profile",
        element: <MyProfile />,
      },
      {
        path: "my-applications",
        element: <MyApplications />,
      },
      {
        path: "my-reviews",
        element: <MyReviews />,
      },
      {
        path: "add-scholarship",
        element: (
          <AdminRoute>
            <AddScholarship />
          </AdminRoute>
        ),
      },
      {
        path: "manage-scholarships",
        element: (
          <AdminRoute>
            <ManageScholarships />
          </AdminRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "manage-applications",
        element: (
          <ModeratorRoute>
            <ManageApplications />
          </ModeratorRoute>
        ),
      },
      {
        path: "all-reviews",
        element: (
          <ModeratorRoute>
            <AllReviews />
          </ModeratorRoute>
        ),
      },
    ],
  },
]);

export default router;