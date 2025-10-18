import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getUserMemes } from "../Store/memeSlice";
 import {
  CircleX,
  Heart,
  LogOut,
  MessageCircle,
  Share2Icon,
  Trash2,
  ArrowLeft
} from "lucide-react";

const ProfileComponent = ( ) => {
  const navigate = useNavigate();
  const friends = useSelector((state) => state.meme.friends);
  const [newUserMemes, setNewUserMemes] = useState([]);
  const [selectedMeme, setSelectedMeme] = useState(null);
  const dispatch = useDispatch();

  // Get username from route params
  const { username } = useParams();

  // Selector to get users array
  const { users,userMemes } = useSelector((state) => state.meme);

  // Find the selected user based on username from route
  const selectedUser = users.find((user) => user.username === username);

  // Dummy data if user not found
  if (!selectedUser) {
    return <div>User not found</div>;
  }

  const currentUser = selectedUser;
  const usernameFriendList = friends.some(friend => friend.username === username);
useEffect(() => {
    userMemes == ""
      ? handleGetUserMemes()
      : userMemes.message == `Memes uploaded by ${username}`
      ? setNewUserMemes(
          userMemes.data.map((meme) => ({
            box_count: meme.box_count,
            captions: meme.caption,
            id: meme._id,
            name: meme.title,
            url: meme.image,
            uploadedBy: meme.uploadedBy,
          }))
        )
      : handleGetUserMemes();
  }, []);

  const handleGetUserMemes = async () => {
    try {
      const response = await dispatch(getUserMemes(username)).unwrap();
      // console.log(response);
      setNewUserMemes(
        response.data.map((meme) => ({
          box_count: meme.box_count,
          captions: meme.caption,
          id: meme._id,
          name: meme.title,
          url: meme.image,
          uploadedBy: meme.uploadedBy,
        }))
      );
      // console.log(newUserMemes);
    } catch (error) {
      console.error("Failed to fetch memes:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-2 md:p-4 relative">      
      <div className="absolute left-0 z-50 flex md:hidden justify-start pl-2">
              <button
                className="cursor-pointer"
                onClick={() => {
                  navigate(-1);
                }}> 
                <ArrowLeft />
              </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <img
          src={
            currentUser?.profile ||
            'https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?t=st=1742805601~exp=1742809201~hmac=64f7a109cb501fd22d07bf68bfef0d9142a1d68fad1b2c09189645fc012302b2&w=740'
          }
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border-2 border-gray-300"
        />
        <div className="flex-1">
          <div className="flex items-center justify-center sm:justify-start gap-4">
            <h2 className="text-2xl font-bold">{currentUser?.fullname}</h2>
           
          </div>
          <div className="flex justify-center sm:justify-start gap-6 mt-3 text-sm">
            <p>
              <span className="font-semibold">{newUserMemes?.length}</span> posts
            </p>
            <p>
              <span className="font-semibold">{users?.length - 1}</span> followers
            </p>
            <p>
              <span className="font-semibold">{users?.length - 1}</span> following
            </p>
          </div>
          <p className="mt-3 text-center sm:text-left text-gray-600 text-sm">
           Making the internet laugh one meme at a time 😂{/*{user.bio}*/}
          </p>
        </div>
      </div>
      <hr className="my-6 border-gray-300" />
      {usernameFriendList ? 
      (<div className="grid grid-cols-2 gap-2 md:grid-cols-3  md:pb-0 pb-12">
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
              <Heart color="white" fill="white" size={32} />
            </div>
          </div>
        ))} 
      </div>)
      : ( <div className='flex justify-center items-center text-xl text-gray-400'>Posts Not Visible</div> )
    }

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
                  src={currentUser.profile}
                  alt="Meme thumbnail"
                  className="w-10 h-10 rounded-full object-cover border border-gray-300"
                />
                <div>
                  <h2 className="font-semibold text-gray-900">
                    {currentUser?.fullname}
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
                  {/*<button
                    className="hover:text-red-500 transition cursor-pointer"
                    onClick={() => confirmDeletePost(selectedMeme.id)}
                  >
                    <Trash2 />
                  </button>*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;
