import { LogOut } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const username = localStorage.getItem("username");
  const { users } = useSelector((state) => state.meme);
  const currentUser = users.filter((user) => user.username == username);
  const navigate = useNavigate();

  const user = {
    username: "meme_master",
    bio: "Making the internet laugh one meme at a time 😂",
    posts: 34,
    followers: 1200,
    following: 180,
    memes: [
      // meme URLs
      "https://i.imgflip.com/1bij.jpg",
      "https://i.imgflip.com/30b1gx.jpg",
      "https://i.imgflip.com/3si4.jpg",
      "https://i.imgflip.com/26am.jpg",
      "https://i.imgflip.com/1otk96.jpg",
      "https://i.imgflip.com/2wifvo.jpg",
    ],
  };

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
    <div className="max-w-4xl mx-auto p-4">
      {/* Profile Header */}
      <div className="absolute right-0 z-50 flex md:hidden justify-end pr-2">
        <button
          onClick={showLogoutToast}
          className="flex gap-1 items-center font-bold text-red-400 border text-sm border-red-200 p-2 px-3 rounded-lg cursor-pointer hover:border-red-500"
        >
          Logout <LogOut size={17} />
        </button>
      </div>
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <img
          src={
            currentUser != ""
              ? currentUser[0]?.profile
              : "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?t=st=1742805601~exp=1742809201~hmac=64f7a109cb501fd22d07bf68bfef0d9142a1d68fad1b2c09189645fc012302b2&w=740"
          }
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border-2 border-gray-300"
        />
        <div className="flex-1">
          <div className="flex items-center justify-center sm:justify-start gap-4">
            <h2 className="text-2xl font-bold">{currentUser[0]?.fullname}</h2>
            <button className="bg-gray-200 px-4 py-1 rounded-md text-sm font-bold text-gray-600 cursor-pointer hover:text-black">
              Edit Profile
            </button>
          </div>
          <div className="flex justify-center sm:justify-start gap-6 mt-3 text-sm">
            <p>
              <span className="font-semibold">{user.posts}</span> posts
            </p>
            <p>
              <span className="font-semibold">{user.followers}</span> followers
            </p>
            <p>
              <span className="font-semibold">{user.following}</span> following
            </p>
          </div>
          <p className="mt-3 text-center sm:text-left text-gray-600 text-sm">
            {user.bio}
          </p>
        </div>
      </div>

      <hr className="my-6 border-gray-300" />

      <div className="grid grid-cols-3 gap-2 md:pb-0 pb-12">
        {user.memes.map((meme, idx) => (
          <img
            key={idx}
            src={meme}
            alt={`Meme ${idx}`}
            className="aspect-square object-cover"
          />
        ))}
      </div>
    </div>
  );
};

export default Profile;
