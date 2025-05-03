import {
  CircleX,
  Heart,
  LogOut,
  MessageCircle,
  Share2Icon,
  Trash2,
} from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { deleteUserMeme, getUserMemes } from "../Store/memeSlice";

const Profile = () => {
  const username = localStorage.getItem("username");
  const { users } = useSelector((state) => state.meme);
  const currentUser = users.filter((user) => user.username == username);
  const navigate = useNavigate();
  const [selectedMeme, setSelectedMeme] = useState(null);
  const { userMemes } = useSelector((state) => state.meme);
  const dispatch = useDispatch();
  const newUserMemes = userMemes.data.map((meme) => ({
    box_count: meme.box_count,
    captions: meme.caption,
    id: meme._id,
    name: meme.title,
    url: meme.image,
  }));

  const user = {
    username: "meme_master",
    bio: "Making the internet laugh one meme at a time 😂",
    posts: 34,
    followers: 1200,
    following: 180,
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

  const confirmDeletePost = (id) => {
    toast.custom((t) => (
      <div className="bg-white shadow-md rounded-md p-4 flex items-center gap-4">
        <p className="text-sm font-medium">Delete this post?</p>
        <button
          onClick={() => {
            toast.dismiss(t.id);
            deleteUserPost(id);
          }}
          className="text-red-600 font-bold cursor-pointer"
        >
          Delete
        </button>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="text-gray-500 font-medium cursor-pointer"
        >
          Cancel
        </button>
      </div>
    ));
  };
  const deleteUserPost = async (id) => {
    const data = {
      memeId: id,
      userId: currentUser[0]._id,
    };
    setSelectedMeme(null);
    try {
      const response = await dispatch(deleteUserMeme(data)).unwrap();
      // console.log(response);
      if (response.status == 200) {
        await dispatch(getUserMemes(username)).unwrap();
        toast.success("Post Deleted Successfully");
      }
    } catch (error) {
      toast.error(error.message);
      // console.log(error);
    }
  };
  return (
    <div className="max-w-4xl mx-auto p-2 md:p-4">
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
              <span className="font-semibold">{newUserMemes.length}</span> posts
            </p>
            <p>
              <span className="font-semibold">{users.length - 1}</span>{" "}
              followers
            </p>
            <p>
              <span className="font-semibold">{users.length - 1}</span>{" "}
              following
            </p>
          </div>
          <p className="mt-3 text-center sm:text-left text-gray-600 text-sm">
            {user.bio}
          </p>
        </div>
      </div>

      <hr className="my-6 border-gray-300" />

      <div className="grid grid-cols-2 gap-2 md:grid-cols-3  md:pb-0 pb-12">
        {newUserMemes.map((meme, idx) => (
          <div
            key={idx}
            className="cursor-pointer relative group"
            onClick={() => setSelectedMeme(meme)}
          >
            <img
              src={meme?.url}
              alt={`Meme ${idx}`}
              className="aspect-square w-auto md:h-90 h-50 object-cover flex mx-auto"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
              <Heart color="white" size={32} />
            </div>
          </div>
        ))}
      </div>
      {selectedMeme && (
        <div className="fixed inset-0 z-50 bg-black/60 flex justify-center items-center p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full overflow-hidden relative">
            {/* Close Button */}
            <button
              onClick={() => setSelectedMeme(null)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 cursor-pointer"
            >
              <CircleX />
            </button>

            {/* Header */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                <img
                  src={currentUser[0].profile}
                  alt="Meme thumbnail"
                  className="w-10 h-10 rounded-full object-cover border border-gray-300"
                />
                <div>
                  <h2 className="font-semibold text-gray-900">
                    {currentUser[0]?.fullname}
                  </h2>
                  <p className="text-sm text-gray-500">{selectedMeme?.name}</p>
                </div>
              </div>
            </div>

            {/* Main Image */}
            <div className="border border-gray-300 py-0.3">
              <img
                src={selectedMeme?.url}
                alt={selectedMeme?.name}
                className="w-auto h-90 object-cover flex mx-auto"
              />
            </div>
            {/* Meta Info & Actions */}
            <div className="p-4 space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>
                  🗨️ Captions: <strong>{selectedMeme?.captions}</strong>
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex space-x-4 pt-2 text-gray-600 ">
                  <button className="hover:text-red-500 transition flex gap-1 cursor-pointer">
                    <Heart fill="red" color="red" />
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
                <div className=" pt-2 text-gray-600 ">
                  <button
                    className="hover:text-red-500 transition cursor-pointer"
                    onClick={() => confirmDeletePost(selectedMeme.id)}
                  >
                    <Trash2 />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
