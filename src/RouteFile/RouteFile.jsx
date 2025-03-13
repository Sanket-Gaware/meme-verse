import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Login = React.lazy(() => import("../Authentication/Login"));
const DontHaveAccount = React.lazy(() =>
  import("../Authentication/DontHaveAccount")
);
const ForgotPassword = React.lazy(() =>
  import("../Authentication/ForgotPassword")
);
const MainWrapper = React.lazy(() => import("../Pages/MainWrapper"));
const Home = React.lazy(() => import("../Pages/Home"));
const Explore = React.lazy(() => import("../Pages/Explore"));

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
      path: "/main",
      element: <MainWrapper />,
      children: [
        {
          index: true,
          path: "/main/home",
          element: <Home />,
        },
        {
          path: "/main/explore",
          element: <Explore />,
        },
      ],
    },
    // {
    //   path: "/*",
    //   element: <PageNotFound />,
    // },
  ]);
  return (
    <>
      <Suspense fallback={<div>Loding...</div>}>
        <RouterProvider router={router}></RouterProvider>
      </Suspense>
    </>
  );
};
export default RouteFile;
