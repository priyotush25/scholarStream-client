import { createBrowserRouter } from "react-router";
import Root from "../pages/Root/Root";
import HomeLayout from "../Layouts/HomeLayout/HomeLayout";
import Login from "../components/Auth/Login/Login";
import Register from "../components/Auth/Register/Register";
import AllScholarships from "../components/common/Scholarships/AllScholarships/AllScholarships";
import ScholarshipDetails from "../components/common/Scholarships/ScholarshipDetails.jsx/ScholarshipDetails";
import LearnMore from "../components/LandingPage/LearnMore";
import PaymentSuccess from "../pages/Payments/PaymentSuccess";
import PrivateRoutes from "../contexts/ProtecedRoutes/PrivateRoutes";
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
import AdminRoute from "../contexts/ProtecedRoutes/AdminRoute";
import ModeratorRoute from "../contexts/ProtecedRoutes/ModeratorRoute";

const router = createBrowserRouter([
  {
    path: "/",
    hydrateFallbackElement: <Loader />,
    errorElement: <Error />,
    Component: Root,
    children: [
      {
        index: true,
        Component: HomeLayout,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/how-it-works",
        Component: HowItWorks,
      },
      {
        path: "/faq",
        Component: LearnMore,
      },
      {
        path: "/blog",
        Component: Blog,
      },
      {
        path: "/help-center",
        Component: HelpCenter,
      },
      {
        path: "/contact-us",
        Component: ContactUs,
      },
      {
        path: "/success-stories",
        Component: SuccessStories,
      },
      {
        path: "/privacy-policy",
        Component: PrivacyPolicy,
      },
      {
        path: "/forbidden",
        Component: Forbidden,
      },
      {
        path: "/unauthorized",
        Component: Unauthorized,
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
        Component: PaymentSuccess,
      },
      {
        path: "/payment-cancelled",
        Component: PaymentFailed,
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
        Component: DashboardHome,
      },
      {
        path: "my-profile",
        Component: MyProfile,
      },
      {
        path: "my-applications",
        Component: MyApplications,
      },
      {
        path: "my-reviews",
        Component: MyReviews,
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