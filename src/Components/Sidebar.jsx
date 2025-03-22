import React from "react";
import {
  CompassIcon,
  HeartIcon,
  HomeIcon,
  LogOut,
  MoonIcon,
  SearchIcon,
  UploadCloudIcon,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

function Sidebar() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const { users } = useSelector((state) => state.meme);
  const currentUser = users.filter((user) => user.username == username);

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
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=6GHAjsWpt9&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                alt=""
              />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900"></p>
              <p className="mt-1 text-sm text-gray-500">
                Sure! 8:30pm works great!
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => {
              toast.dismiss(t.id);
              localStorage.removeItem("Token");
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

  // function Logout() {
  //   if (showLogoutToast()) {
  //     localStorage.removeItem("Token");
  //     navigate("/");
  //   }
  // }

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
              to="/main/home"
              className="flex gap-3 text-lg mb-10 cursor-pointer"
            >
              <HomeIcon /> Home
            </NavLink>
            <NavLink
              to="/main/search"
              className="flex gap-3 text-lg mb-10 cursor-pointer"
              // onClick={() => navigate("/main/search")}
            >
              <SearchIcon /> Search
            </NavLink>
            <NavLink
              to="/main/explore"
              className="flex gap-3 text-lg mb-10 cursor-pointer"
              // onClick={() => navigate("/main/explore")}
            >
              <CompassIcon /> Explore
            </NavLink>
            <NavLink to="/main/upload" className="flex gap-3 text-lg mb-10">
              <UploadCloudIcon /> Upload
            </NavLink>
            <NavLink
              to="/main/leaderboard"
              className="flex gap-3 text-lg mb-10 cursor-pointer"
              // onClick={() => navigate("/main/leaderboard")}
            >
              <HeartIcon /> Leaderboard
            </NavLink>
            <div className="flex gap-3 text-lg mb-10">
              <MoonIcon /> Dark Mode
            </div>
            <NavLink to="/main/profile" className="flex gap-3 text-lg mb-10">
              <img className="h-7 rounded-full" src={currentUser[0]?.profile} />
              Profile
            </NavLink>
            <div
              className="flex gap-3 text-lg mb-10 cursor-pointer"
              onClick={showLogoutToast}
            >
              <LogOut /> Logout
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navbar */}
      <div className="fixed bottom-0 w-full bg-white border-t border-gray-300 flex justify-around items-center md:hidden p-2 z-50 py-4">
        <HomeIcon className="w-6 h-6" onClick={() => navigate("/main/home")} />
        <SearchIcon
          className="w-6 h-6"
          onClick={() => navigate("/main/search")}
        />
        <CompassIcon
          className="w-6 h-6"
          onClick={() => navigate("/main/explore")}
        />
        <HeartIcon
          className="w-6 h-6"
          onClick={() => navigate("/main/leaderboard")}
        />
        <UploadCloudIcon className="w-6 h-6" />
        <img className="h-7 w-7 rounded-full" src={currentUser[0]?.profile} />
      </div>
    </>
  );
}

export default Sidebar;
