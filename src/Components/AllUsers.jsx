import React from "react";

export const AllUsers = ({ currentUser, users, username, setUsertoChat }) => {
  return (
    <div className="md:mb-0 mb-5">
      <div className="flex gap-3 justify-items-start items-center my-5 px-5">
        <img className="h-12 rounded-full" src={currentUser[0]?.profile} />
        <div>
          <p className="text-sm tracking-wider font-semibold">
            {currentUser[0]?.username}
          </p>
          <p className="text-sm text-gray-500">{currentUser[0]?.fullname}</p>
        </div>
      </div>
      <div className="w-screen h-0.1 border border-b-gray-50 "></div>
      <div className="px-5 mt-3">
        <p className="font-bold text-gray-500 tracking-wide">Friends</p>
        {users.map((user, i) => {
          if (user.username === username) return null; // Don't display the current user in the list
          return (
            <div key={i} className="flex justify-between items-center my-3">
              <div
                className="flex gap-3 items-center"
                onClick={() => setUsertoChat(user._id)}
              >
                <img
                  className="h-12 w-12 rounded-full aspect-square"
                  src={user.profile}
                />
                <div>
                  <p className="text-sm tracking-wider font-semibold">
                    {user.username}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-red-500">
                    {user.fullname}
                  </p>
                </div>
              </div>
              {/* <div className="">
                <label className="text-blue-700 font-bold text-sm">
                  Follow
                </label>
              </div> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};
