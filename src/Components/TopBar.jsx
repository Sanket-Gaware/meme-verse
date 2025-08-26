import React, { useState,useEffect } from "react";
import "../App.css";
import { MessagesSquare, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UsersStory from "./UsersStory"; // Import the story modal component
import AddStory from "./AddStory";

const TopBar = ({ currentUser, users, username }) => {
  const navigate = useNavigate();
  const { unreadUserCounts } = useSelector((state) => state.meme);
  const [showAddStory, setShowAddStory] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const[Response,setResponse]= useState([]);
  const [userStories, setuserStories] = useState([]);

  const openStory = (user) => {
    setSelectedUser(user);
    setIsStoryOpen(true);
  };

  const closeStory = () => {
    setSelectedUser(null);
    setIsStoryOpen(false);
  };

useEffect(() => {
    async function fetchStories() {
      try {
        const BASE_URL = import.meta.env.VITE_BASE_URL;
        const VITE_GET_ALL_STORIES = import.meta.env.VITE_GET_ALL_STORIES;
        const response = await axios.get(`${BASE_URL}${VITE_GET_ALL_STORIES}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
            "Content-Type": "application/json",
          },
        });
        setResponse(response);
       const userStories1 = response?.data?.stories?.filter(
            (item) => item.userId._id === user._id
          );
       setuserStories(userStories1);
      } catch (error) {
        console.error(error);
      }
    }

    // if (!Response) {
      fetchStories();
    // }
  }, [Response]);
  return (
    <>
      <div className="w-full bg-white sticky top-0 z-50 md:hidden">
        <div className="flex justify-between px-3 pt-2">
          <div className="text-2xl font-bold font-serif">Meme verse</div>
          <div
            onClick={() => navigate("/messages")}
            className="relative cursor-pointer"
          >
            <MessagesSquare size={28} />
            {unreadUserCounts?.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 py-[1px] rounded-full">
                {unreadUserCounts?.length}
              </span>
            )}
          </div>
        </div>

        {/* Story Avatars */}
        <div className="flex overflow-x-auto no-scrollbar px-4 py-3 gap-4">
          {/* Your Story */}
          <div
            className="flex flex-col items-center relative flex-shrink-0"
            onClick={() => setShowAddStory(true)}
          >
            <img
              className="h-14 w-14 rounded-full border-2 border-pink-500 object-cover"
              src={currentUser[0]?.profile}
              alt="Your Story"
            />
            <div className="absolute bottom-3 right-0 bg-white rounded-full p-1 shadow-md">
              <Plus className="h-3 w-3 text-pink-500" />
            </div>
            {showAddStory && (
              <div className="fixed inset-0 z-50 bg-white flex items-center justify-center overflow-auto">
                <AddStory
                  userId={currentUser[0]?._id}
                  onClose={() => setShowAddStory(false)}
                />
              </div>
            )}

            <p className="text-xs mt-1 font-medium text-gray-700">You</p>
          </div>

         
          {/*{users.map((user, i) => {
            if (user.username === username) return null;
            return (
            
              <div
                key={i}
                className="flex flex-col items-center flex-shrink-0 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault(); // Prevent default navigation or form submission
                  e.stopPropagation(); // Stop bubbling to parent
                  openStory(user); // Open the story modal
                }}
              >
                <img
                  className="h-14 w-14 rounded-full border-2 border-pink-500 object-cover"
                  src={user.profile}
                  alt={user.username}
                />
                <p className="text-xs mt-1 font-medium text-gray-700 truncate max-w-[60px]">
                  {user.username}
                </p>
              </div>
            );
          })}*/}

          {users.map((user, i) => {
            if (user.username === username) return null;

            // Check if the user has any story
            const hasStory = userStories.some(story => story.userId._id !== user._id);

            return (
              <div
                key={i}
                className="flex flex-col items-center flex-shrink-0 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  openStory(user);
                }}
              >
                <img
                  className={`h-14 w-14 rounded-full object-cover border-2 ${hasStory ? 'border-pink-500' : 'border-transparent'}`}
                  src={user.profile}
                  alt={user.username}
                />
                <p className="text-xs mt-1 font-medium text-gray-700 truncate max-w-[60px]">
                  {user.username}
                </p>
              </div>
            );
          })}

        </div>
      </div>

      {/* Show Story Modal */}
      {isStoryOpen && selectedUser && (
        <UsersStory user={selectedUser} onClose={closeStory} Response={Response} />
      )}
    </>
  );
};

export default TopBar;
