import React, { useState,useEffect } from "react";
import "../App.css";
import { MessagesSquare, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import UsersStory from "./UsersStory";
import AddStory from "./AddStory";
import axios from 'axios';
 import { setAllStories } from "../Store/memeSlice";

const TopBar = ({ currentUser, users, username }) => {
  const navigate = useNavigate(); 
  const dispatch = useDispatch();

  const { unreadUserCounts } = useSelector((state) => state.meme);
  const [showAddStory, setShowAddStory] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const[Response,setResponse]= useState([]);
  const [userStories, setuserStories] = useState([]);
  const allStories = useSelector((state) => state.meme.allStories);

  const openStory = (user) => { 
    setSelectedUser(user);
    setIsStoryOpen(true);
  };

  const closeStory = () => {
    setSelectedUser(null);
    setIsStoryOpen(false);
  };

useEffect(() => {
    const fetchStories = async () => {
        const BASE_URL = import.meta.env.VITE_BASE_URL;
        const VITE_GET_ALL_STORIES = import.meta.env.VITE_GET_ALL_STORIES;

        try {
          const response = await axios.get(`${BASE_URL}${VITE_GET_ALL_STORIES}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("Token")}`,
              "Content-Type": "application/json",
            },
          });

        console.log(response.data.stories[0]);
          // console.log("inside story fun")
          const userStories = response?.data?.stories?.filter(
            (item) => item.userId._id !== currentUser._id
          );
            // console.log("-+"+{userStories});
          dispatch(setAllStories( response?.data ));
          // setStories(userStories);
          // setCurrentStory(userStories?.[0]);
          console.log(userStories?.[0]?.mediaUrl + " <=");

          return response?.data;
        } catch (error) {
          console.error("Error fetching stories:", error);
        }
    };

     // if (allStories == '' || !allStories?.stories || allStories == 'undefined') {

      fetchStories();
    // } else {
      // const userStories = allStories?.stories?.filter(
      //   (item) => item.userId._id === currentUser._id
      // );
      // setStories(userStories);
      // setCurrentStory(userStories[current]);
    // }
  }, []);
// console.log("sto=> "+allStories);
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
            // onClick={() => 
            // navigate('/story', {
            //         state: {
            //           currentUser: currentUser
            //         }}
            //         )}
            onClick={()=>setShowAddStory(true)}
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
                  setShowAddStory={setShowAddStory}
                  currentUser={currentUser}
                />
              </div>
            )}

            <p className="text-xs mt-1 font-medium text-gray-700">You</p>
          </div>

         
         {/* {users.map((user, i) => {
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

          {users
  .filter(user => {
    // Check if there is any story in userStories for this user._id
    // const userHasStory = allStories.stories.some(
    //   item => item.userId._id === user._id
    // );
    const userHasStory = Array.isArray(allStories?.stories) 
  ? allStories.stories.some(item => item.userId._id === user._id)
  : false;
    return userHasStory && user.username !== username;
  })
  .map((user, i) => (
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
        className="h-14 w-14 rounded-full border-2 border-pink-500 object-cover"
        src={user.profile}
        alt={user.username}
      />
      <p className="text-xs mt-1 font-medium text-gray-700 truncate max-w-[60px]">
        {user.username}
      </p>
    </div>
  ))
}


        </div>
      </div>

      {/* Show Story Modal */}
      {isStoryOpen && selectedUser && (
        <UsersStory user={selectedUser} onClose={closeStory} />
      )}
    </>
  );
};

export default TopBar;
