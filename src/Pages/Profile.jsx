import { Heart, LogOut, MessageCircle, Share2Icon } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const username = localStorage.getItem("username");
  const { users } = useSelector((state) => state.meme);
  const currentUser = users.filter((user) => user.username == username);
  const navigate = useNavigate();
  const [selectedMeme, setSelectedMeme] = useState(null);

  const user = {
    username: "meme_master",
    bio: "Making the internet laugh one meme at a time 😂",
    posts: 34,
    followers: 1200,
    following: 180,
    memes: [
      {
        id: "1",
        name: "Drake Hotline Bling",
        url: "https://i.imgflip.com/1bij.jpg",
      },
      {
        id: "2",
        name: "Distracted Boyfriend",
        url: "https://i.imgflip.com/30b1gx.jpg",
      },
      {
        id: "3",
        name: "One Does Not Simply",
        url: "https://i.imgflip.com/3si4.jpg",
      },
      {
        id: "4",
        name: "Grumpy Cat",
        url: "https://i.imgflip.com/26am.jpg",
      },
      {
        id: "5",
        name: "UNO Draw 25",
        url: "https://i.imgflip.com/1otk96.jpg",
      },
      {
        id: "6",
        name: "Surprised Pikachu",
        url: "https://i.imgflip.com/2wifvo.jpg",
      },
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
            src={meme.url}
            onClick={() => setSelectedMeme(meme)}
            alt={`Meme ${idx}`}
            className="aspect-square object-cover"
          />
        ))}
      </div>
      {selectedMeme && (
        <div
          className="fixed inset-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center z-50 overflow-y-auto"
          onClick={() => setSelectedMeme(null)}
        >
          <div
            className="bg-white rounded-2xl w-11/12 md:w-2/3 lg:w-1/2 shadow-lg border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                <img
                  src={selectedMeme.url}
                  alt="Meme thumbnail"
                  className="w-10 h-10 rounded-full object-cover border border-gray-300"
                />
                <h2 className="font-semibold text-gray-900">
                  {selectedMeme.name}
                </h2>
              </div>
            </div>

            <img
              src={selectedMeme.url}
              alt={selectedMeme.name}
              className="w-full h-auto object-cover rounded-b-2xl"
            />

            <div className="p-4 space-y-2">
              <div className="flex space-x-4 pt-2 text-gray-600">
                <button
                  className={`hover:text-red-500 transition flex gap-1 cursor-pointer ${"text-red-500"}`}
                >
                  <Heart fill="red" />
                </button>

                <div className="relative inline-flex">
                  <button className="hover:text-blue-500 transition cursor-pointer">
                    <MessageCircle />
                  </button>
                </div>

                <button className="hover:text-green-500 transition cursor-pointer">
                  <Share2Icon />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
