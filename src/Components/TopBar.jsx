import React from "react";
import "../App.css";
const TopBar = ({ currentUser, users, username }) => {
  return (
    <div className="w-full border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="flex overflow-x-auto no-scrollbar px-4 py-3 gap-4">
        {/* Current User Story */}
        <div className="flex flex-col items-center">
          <img
            className="h-14 w-14 rounded-full border-2 border-pink-500 object-cover"
            src={currentUser[0]?.profile}
            alt="Your Story"
          />
          <p className="text-xs mt-1 font-medium text-gray-700">You</p>
        </div>

        {/* Friends' Stories */}
        {users.map((user, i) => {
          if (user.username === username) return null;
          return (
            <div key={i} className="flex flex-col items-center">
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
        })}
      </div>
    </div>
  );
};

export default TopBar;
