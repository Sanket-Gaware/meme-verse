import React from "react";
import {
  CompassIcon,
  HeartIcon,
  HomeIcon,
  LogOut,
  MessagesSquare,
  Users,
  UploadCloudIcon,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import store, { persister } from "../Store/store";


function Sidebar() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const { users } = useSelector((state) => state.meme);
  const currentUser = users?.filter((user) => user.username == username);
  const { unreadUserCounts } = useSelector((state) => state.meme);
  const dispatch = useDispatch();

  const showLogoutToast = () => {
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-gray-300 ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <img
                className="h-10 w-10 rounded-full"
                src={
                  currentUser != ""
                    ? currentUser[0]?.profile
                    : "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?t=st=1742805601~exp=1742809201~hmac=64f7a109cb501fd22d07bf68bfef0d9142a1d68fad1b2c09189645fc012302b2&w=740"
                }
                alt=""
              />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm text-gray-900 font-bold">
                {currentUser[0]?.fullname}
              </p>
              <p className="mt-1 text-sm text-gray-500">See you next time 👋</p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => {
              toast.dismiss(t.id);
              localStorage.removeItem("Token");
              persister.purge();
              store.dispatch({ type: "RESET" });
              sessionStorage.removeItem('hasFetchedMemes')
              navigate("/");
            }}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-bold text-red-600 hover:text-indigo-500 focus:outline-none focus:ring-0 focus:ring-indigo-500"
          >
            Logout
          </button>
        </div>
      </div>
    ));
  };

  return (
    <>
      {/* Sidebar */}
      <div className="border-r border-gray-300 hidden md:block col-span-3">
        <div className="md:fixed top-0">
          <p className="text-center my-5 font-bold tracking-wider text-2xl">
            Meme Verse
          </p>
          <div className="px-10 mt-10">
            <NavLink
              to="home"
              className="flex gap-3 text-lg mb-10 cursor-pointer hover:text-blue-800"
            >
              <HomeIcon /> Home
            </NavLink>
            <NavLink
              to="/messages"
              className="flex gap-3 text-lg mb-10 cursor-pointer  hover:text-blue-800"
            >
              <MessagesSquare size={28} />
              {unreadUserCounts?.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 py-[1px] rounded-full">
                  {unreadUserCounts?.length}
                </span>
              )}{" "}
              Messages
            </NavLink>
            <NavLink
              to="users"
              className="flex gap-3 text-lg mb-10 cursor-pointer  hover:text-blue-800"
              // onClick={() => navigate("/main/search")}
            >
              <Users /> Friends
            </NavLink>
            <NavLink
              to="explore"
              className="flex gap-3 text-lg mb-10 cursor-pointer  hover:text-blue-800"
              // onClick={() => navigate("/main/explore")}
            >
              <CompassIcon /> Explore
            </NavLink>
            <NavLink
              to="upload"
              className="flex gap-3 text-lg mb-10  hover:text-blue-800"
            >
              <UploadCloudIcon /> Upload
            </NavLink>
            <NavLink
              to="leaderboard"
              className="flex gap-3 text-lg mb-10 cursor-pointer  hover:text-blue-800"
              // onClick={() => navigate("/main/leaderboard")}
            >
              <HeartIcon /> Leaderboard
            </NavLink>
            {/* <div className="flex gap-3 text-lg mb-10">
              <MoonIcon /> Dark Mode
            </div> */}
            <NavLink
              to="profile"
              className="flex gap-3 text-lg mb-10  hover:text-blue-800"
            >
              <img
                className="h-7 rounded-full"
                src={
                  currentUser != ""
                    ? currentUser[0]?.profile
                    : "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?t=st=1742805601~exp=1742809201~hmac=64f7a109cb501fd22d07bf68bfef0d9142a1d68fad1b2c09189645fc012302b2&w=740"
                }
              />
              Profile
            </NavLink>
            <div
              className="flex gap-3 text-lg mb-10 cursor-pointer  hover:text-red-600"
              onClick={showLogoutToast}
            >
              <LogOut /> Logout
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navbar */}
      <div className="fixed bottom-0 w-full bg-white border-t border-gray-300 flex justify-around items-center md:hidden p-2 z-50 py-2">
        <HomeIcon className="w-6 h-6" onClick={() => navigate("home")} />
        <Users className="w-6 h-6" onClick={() => navigate("users")} />
        <CompassIcon className="w-6 h-6" onClick={() => navigate("explore")} />
        <HeartIcon
          className="w-6 h-6"
          onClick={() => navigate("leaderboard")}
        />

        <UploadCloudIcon
          className="w-6 h-6"
          onClick={() => navigate("upload")}
        />
        <img
          className="h-7 w-7 rounded-full"
          onClick={() => navigate("profile")}
          src={
            currentUser != ""
              ? currentUser[0]?.profile
              : "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?t=st=1742805601~exp=1742809201~hmac=64f7a109cb501fd22d07bf68bfef0d9142a1d68fad1b2c09189645fc012302b2&w=740"
          }
        />
      </div>
    </>
  );
}

export default Sidebar;
