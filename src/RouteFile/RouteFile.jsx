import React, { Suspense, useMemo } from "react";
import { useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import useGlobalMessageListener from "../Components/useGlobalMessageListener";

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
const UsersPage = React.lazy(() => import("../Pages/UsersPage"));
const Leaderboard = React.lazy(() => import("../Pages/Leaderboard"));
const Profile = React.lazy(() => import("../Pages/Profile"));
const UploadMeme = React.lazy(() => import("../Pages/UploadMeme"));
const Inbox = React.lazy(() => import("../Pages/Messages/Inbox"));
const Loader = React.lazy(() => import("../Components/Loader"));
const PageNotFound = React.lazy(() => import("../Pages/PageNotFound"));
const StoryPage = React.lazy(()=> import("../Pages/StoryPage"));

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
          path: "home",
          element: <Home />,
        },
        {
          path: "explore",
          element: <Explore />,
        },
        {
          path: "users",
          element: <UsersPage />,
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
        {
          path: "messages",
          element: <Inbox />,
        },
        {
          path: "/story",
          element: <StoryPage />,
        },
      ],
    },
    {
      path: "/*",
      element: <PageNotFound />,
    },
  ]);

  const { users } = useSelector((state) => state.meme);
  const username = localStorage.getItem("username");
  const { userToChat } = useSelector((state) => state.meme);

  // Wait for currentUser to be available
  const currentUser = useMemo(() => {
    return users.find((user) => user.username === username);
  }, [users, username]);

  useGlobalMessageListener(currentUser, userToChat);
  return (
    <>
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router}></RouterProvider>
      </Suspense>
    </>
  );
};
export default RouteFile;
