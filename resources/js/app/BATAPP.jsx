import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AOS from "aos";
import { useEffect } from "react";

// Import your layout component from the correct path
import Layout from "../Components/BATComponents/layout";

// Import the DashboardProvider from the correct path
import { DashboardProvider } from '../Components/DashboardContext';

// Import your pages from the BATPages folder with the correct file paths
import Home from "../BATPages/home/index.jsx";
import HomeTwo from "../BATPages/homeTwo/index.jsx";
import Statistics from "../BATPages/statistics/index.jsx";
import Analytics from "../BATPages/analytics/index.jsx";
import Transaction from "../BATPages/transaction/index.jsx";
import MyWallet from "../BATPages/myWallet/index.jsx";
import Inbox from "../BATPages/inbox/index.jsx";
import Integrations from "../BATPages/integrations/index.jsx";
import Users from "../BATPages/users/index.jsx";
import Calender from "../BATPages/calender/index.jsx";
import History from "../BATPages/history/index.jsx";
import Support from "../BATPages/supportTicket/index.jsx";
import Settings from "../BATPages/settings/index.jsx";
import SignIn from "../BATPages/signin/index.jsx";
import SignUp from "../BATPages/signup/index.jsx";
import ComingSoon from "../BATPages/commingSoon/index.jsx";
import Error from "../BATPages/error/index.jsx";
import PersonalInfo from "../BATPages/settings/personal-info/index.jsx";
import Notification from "../BATPages/settings/notifaction/index.jsx";
import ProgramAndResources from "../BATPages/settings/program&resourses/index.jsx";
import Payment from "../BATPages/settings/payment/index.jsx";
import Faq from "../BATPages/settings/faq/index.jsx";
import Security from "../BATPages/settings/security/index.jsx";
import TermsAndCondition from "../BATPages/settings/terms&condition/index.jsx";
import HomeFive from "../BATPages/homeFive/index.jsx";
import LandingPage from "../BATPages/landingPage/index.jsx";

// Import your CSS files
import "../../css/BAT/style.css";
import "../../css/BAT/font-awesome-all.min.css";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/home-2",
        element: <HomeTwo />,
      },
      {
        path: "/home-3",
        element: <Statistics />,
      },
      {
        path: "/home-4",
        element: <Analytics />,
      },
      {
        path: "/statistics",
        element: <Statistics />,
      },
      {
        path: "/analytics",
        element: <Analytics />,
      },
      {
        path: "/transaction",
        element: <Transaction />,
      },
      {
        path: "/messages",
        element: <Inbox />,
      },
      {
        path: "/integrations",
        element: <Integrations />,
      },
      {
        path: "/calender",
        element: <Calender />,
      },
      {
        path: "/settings",
        Component: Settings,
        children: [
          {
            index: true,
            element: <PersonalInfo />,
          },
          {
            path: "notification",
            element: <Notification />,
          },
          {
            path: "program&resources",
            element: <ProgramAndResources />,
          },
          {
            path: "payment",
            element: <Payment />,
          },
          {
            path: "faq",
            element: <Faq />,
          },
          {
            path: "security",
            element: <Security />,
          },
          {
            path: "terms&conditions",
            element: <TermsAndCondition />,
          },
        ],
      },
      {
        path: "/my-wallet",
        element: <MyWallet />,
      },
      {
        path: "/history",
        element: <History />,
      },
      {
        path: "/support-ticket",
        element: <Support />,
      },
      {
        path: "/users",
        element: <Users />,
      }
    ],
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/coming-soon",
    element: <ComingSoon />,
  },
  {
    path: "/home-5",
    element: <HomeFive />,
  },
  {
    path: "/404",
    element: <Error />,
  },
  {
    index: true,
    element: <LandingPage />,
  },
]);

function App() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <DashboardProvider>
      <RouterProvider router={router} />
    </DashboardProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);