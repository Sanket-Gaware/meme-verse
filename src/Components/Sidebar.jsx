import React from "react";
import {
  CompassIcon,
  HeartIcon,
  HomeIcon,
  LucideMoreHorizontal,
  MoonIcon,
  SearchIcon,
  UploadCloudIcon,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Sidebar() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const { users } = useSelector((state) => state.meme);
  const currentUser = users.filter((user) => user.username == username);

  function Logout() {
    if (confirm("Do you want to logout?")) {
      localStorage.removeItem("Token");
      navigate("/");
    }
  }

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
            <div
              className="flex gap-3 text-lg mb-10 cursor-pointer"
              onClick={() => navigate("/main/search")}
            >
              <SearchIcon /> Search
            </div>
            <div
              className="flex gap-3 text-lg mb-10 cursor-pointer"
              onClick={() => navigate("/main/explore")}
            >
              <CompassIcon /> Explore
            </div>
            <div className="flex gap-3 text-lg mb-10">
              <UploadCloudIcon /> Upload
            </div>
            <div
              className="flex gap-3 text-lg mb-10 cursor-pointer"
              onClick={() => navigate("/main/leaderboard")}
            >
              <HeartIcon /> Leaderboard
            </div>
            <div className="flex gap-3 text-lg mb-10">
              <MoonIcon /> Dark Mode
            </div>
            <div className="flex gap-3 text-lg mb-10">
              <img className="h-7 rounded-full" src={currentUser[0]?.profile} />
              Profile
            </div>
            <div
              className="flex gap-3 text-lg mb-10 cursor-pointer"
              onClick={Logout}
            >
              <LucideMoreHorizontal /> More
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
