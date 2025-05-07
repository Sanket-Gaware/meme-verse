import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getLastMessage, resetUnread } from "../Store/memeSlice";

export const AllUsers = ({
  currentUser,
  users,
  username,
  setUsertoChat,
  home,
}) => {
  const dispatch = useDispatch();
  const { unreadCounts } = useSelector((state) => state.meme);
  const [lastMessages, setLastMessages] = useState({});

  const handleUserClick = (userId) => {
    setUsertoChat(userId);
    dispatch(resetUnread(userId)); // Clear unread messages for this user
  };

  const LastMessage = async (id) => {
    try {
      const response = await dispatch(getLastMessage(id)).unwrap();
      setLastMessages((prev) => ({
        ...prev,
        [id]: response.data?.message || "No message yet",
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    users.forEach((user) => {
      if (user.username !== username) {
        LastMessage(user._id);
      }
    });
  }, [users, username]);

  return (
    <div className="md:mb-0 mb-5">
      <div className="flex gap-3 items-center my-5 px-5">
        <img
          className="h-12 w-12 rounded-full aspect-square"
          src={currentUser[0]?.profile}
          alt="current-user"
        />
        <div>
          <p className="text-sm tracking-wider font-semibold">
            {currentUser[0]?.fullname}
          </p>
          <p className="text-sm text-gray-500">{currentUser[0]?.username}</p>
        </div>
      </div>

      <div className="border-b border-gray-200 mx-5" />

      <div className="px-5 mt-3">
        <p className="font-bold text-gray-500 tracking-wide mb-3">Friends</p>
        {users.map((user, i) => {
          if (user.username === username) return null;

          return (
            <div
              key={i}
              className="flex justify-between items-center my-3 cursor-pointer"
              onClick={() => handleUserClick(user._id)}
            >
              <div className="flex gap-3 items-center">
                <img
                  className="h-12 w-12 rounded-full aspect-square"
                  src={user.profile}
                  alt="friend"
                />
                <div>
                  <p className="text-sm tracking-wider font-semibold">
                    {user.fullname}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-red-500">
                    {home == true
                      ? user.username
                      : lastMessages[user._id] || "No message yet"}
                  </p>
                </div>
              </div>

              {unreadCounts[user._id] > 0 && (
                <span className="bg-sky-500 text-white text-xs px-2 py-1 rounded-full">
                  {unreadCounts[user._id]}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
