import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Login = React.lazy(() => import("../Authentication/Login"));
const DontHaveAccount = React.lazy(() =>
  import("../Authentication/DontHaveAccount")
);
const ForgotPassword = React.lazy(() =>
  import("../Authentication/ForgotPassword")
);
const AuthRoutes = React.lazy(() => import("./AuthGuard"));
const MainWrapper = React.lazy(() => import("../Pages/MainWrapper"));
const Home = React.lazy(() => import("../Pages/Home"));
const Explore = React.lazy(() => import("../Pages/Explore"));
const Search = React.lazy(() => import("../Pages/SearchPage"));
const Leaderboard = React.lazy(() => import("../Pages/Leaderboard"));
const Profile = React.lazy(() => import("../Pages/Profile"));
const UploadMeme = React.lazy(() => import("../Pages/UploadMeme"));
const Loader = React.lazy(() => import("../Components/Loader"));
const PageNotFound = React.lazy(() => import("../Pages/PageNotFound"));

const RouteFile = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/register",
      element: <DontHaveAccount />,
    },
    {
      path: "/forgotpassword",
      element: <ForgotPassword />,
    },
    {
      path: "/",
      element: (
        <AuthRoutes>
          <MainWrapper />
        </AuthRoutes>
      ),
      children: [
        {
          index: true,
          path: "home",
          element: <Home />,
        },
        {
          path: "explore",
          element: <Explore />,
        },
        {
          path: "search",
          element: <Search />,
        },
        {
          path: "leaderboard",
          element: <Leaderboard />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "upload",
          element: <UploadMeme />,
        },
      ],
    },
    {
      path: "/*",
      element: <PageNotFound />,
    },
  ]);
  return (
    <>
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router}></RouterProvider>
      </Suspense>
    </>
  );
};
export default RouteFile;
