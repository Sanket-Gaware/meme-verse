// import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   getLastMessage,
//   resetUnread,
//   setUserToChatR,
// } from "../Store/memeSlice";
// import { ArrowLeft, CheckCheck } from "lucide-react";

// export const AllUsers = ({
//   currentUser,
//   users,
//   username,
//   setUsertoChat,
//   home,
// }) => {
//   const dispatch = useDispatch();
//   // const navigate = useNavigate();
//   const { unreadCounts } = useSelector((state) => state.meme);
//   const [lastMessages, setLastMessages] = useState({});

//   const handleUserClick = (userId) => {
//     setUsertoChat(userId);
//     dispatch(setUserToChatR(userId));
//     dispatch(resetUnread(userId)); // Clear unread messages for this user
//   };

//   const LastMessage = async (id) => {
//     try {
//       const response = await dispatch(getLastMessage(id)).unwrap();
//       setLastMessages((prev) => ({
//         ...prev,
//         [id]: response.data?.message || "No message yet",
//       }));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     users.forEach((user) => {
//       if (user.username !== username) {
//         LastMessage(user._id);
//       }
//     });
//   }, [users, username]);

//   return (
//     <div className="md:mb-0 mb-5">
//       <div className="flex gap-3 items-center my-5 px-5">
//         <button className="cursor-pointer md:hidden" onClick={() => {}}>
//           <ArrowLeft />
//         </button>
//         <img
//           className="h-12 w-12 rounded-full aspect-square"
//           src={currentUser[0]?.profile}
//           alt="current-user"
//         />
//         <div>
//           <p className="text-sm tracking-wider font-semibold">
//             {currentUser[0]?.fullname}
//           </p>
//           <p className="text-sm text-gray-500">{currentUser[0]?.username}</p>
//         </div>
//       </div>
//       <div className="border-b border-gray-200 mx-5" />
//       <div className="px-5 mt-3">
//         <p className="font-bold text-gray-500 tracking-wide mb-3">Friends</p>
//         {users.map((user, i) => {
//           if (user.username === username) return null;

//           return (
//             <div
//               key={i}
//               className="flex justify-between items-center my-3 cursor-pointer"
//               onClick={() => handleUserClick(user._id)}
//             >
//               <div className="flex gap-3 items-center">
//                 <img
//                   className="h-12 w-12 rounded-full aspect-square"
//                   src={user.profile}
//                   alt="friend"
//                 />
//                 <div>
//                   <p className="text-sm tracking-wider font-semibold">
//                     {user.fullname}
//                   </p>
//                   <p className="text-sm text-gray-500 dark:text-red-500">
//                     <CheckCheck />
//                     {home == true
//                       ? user.username
//                       : lastMessages[user._id] || "No message yet"}
//                   </p>
//                 </div>
//               </div>

//               {unreadCounts[user._id] > 0 && (
//                 <span className="bg-sky-500 text-white text-xs px-2 py-1 rounded-full">
//                   {unreadCounts[user._id]}
//                 </span>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getLastMessage,
  resetUnread,
  setUserToChatR,
} from "../Store/memeSlice";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const AllUsers = ({
  currentUser,
  users,
  username,
  setUsertoChat,
  home,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { unreadCounts } = useSelector((state) => state.meme);
  // const [lastMessages, setLastMessages] = useState({});
const lastMessages = useSelector((state) => state.meme.lastMessages);

  const handleUserClick = (userId) => {
    setUsertoChat(userId);
    dispatch(setUserToChatR(userId));
    dispatch(resetUnread(userId)); // Clear unread messages for this user
  };

  // const LastMessage = async (id) => {
  //   try {
  //     const response = await dispatch(getLastMessage(id)).unwrap();
  //     setLastMessages((prev) => ({
  //       ...prev,
  //       [id]: response.data?.message || "No message yet",
  //     }));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
const LastMessage = async (id) => {
  try {
    const response = await dispatch(getLastMessage(id)).unwrap();
    dispatch(
      setLastMessage({
        userId: id,
        message: response.data?.message || "No message yet",
      })
    );
  } catch (error) {
    if (error?.response?.status === 404) {
      dispatch(
        setLastMessage({
          userId: id,
          message: "No message yet",
        })
      );
    } else {
      console.error("Failed to fetch last message:", error);
    }
  }
};


  // useEffect(() => {
  //   users.forEach((user) => {
  //     if (user.username !== username) {
  //       LastMessage(user._id);
  //     }
  //   });
  // }, [users, username]);
useEffect(() => {
  users.forEach((user) => {
    if (
      user.username !== username &&
      !lastMessages[user._id] 
    ) {
      LastMessage(user._id);
    }
  });
}, [users, username, lastMessages]);


  // Sort users by:
  // 1. Has unread messages? Those go first
  // 2. Then by last message timestamp or just order by username if no timestamp

  // Assuming lastMessages only contains message text, you might want to extend it to include timestamp
  // For now, we just sort by unread count and fallback to username alphabetically.

  // Create a sorted users array using useMemo for performance
  const sortedUsers = useMemo(() => {
    const usersWithLastMsg = users
      .filter((user) => user.username !== username)
      .map((user) => ({
        ...user,
        lastMsg: lastMessages[user._id] || "",
        unread: unreadCounts[user._id] || 0,
      }));

    // return usersWithLastMsg.sort((a, b) => {
    //   // Sort by unread count descending first
    //   if ((b.unread || 0) !== (a.unread || 0)) {
    //     return (b.unread || 0) - (a.unread || 0);
    //   }
    //   // Then by lastMsg existence (assuming newer messages come later in list)
    //   if (b.lastMsg && !a.lastMsg) return 1;
    //   if (a.lastMsg && !b.lastMsg) return -1;

    //   // Lastly, sort by username alphabetically (fallback)
    //   return a.username.localeCompare(b.username);
    // });
      return usersWithLastMsg.sort((a, b) => {
        if ((b.unread || 0) !== (a.unread || 0)) {
          return (b.unread || 0) - (a.unread || 0);
        }

        if (b.lastMsg && !a.lastMsg) return 1;
        if (a.lastMsg && !b.lastMsg) return -1;

        // Safely compare usernames
        return (a?.username ?? "").localeCompare(b?.username ?? "");
      });

  }, [users, username, lastMessages, unreadCounts]);

  return (
    <div className="md:mb-0 mb-5">
      <div className="flex gap-3 items-center my-5 px-5">
        <button
          className="cursor-pointer md:hidden"
          onClick={() => navigate("/home")}
        >
          <ArrowLeft />
        </button>
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
        {sortedUsers.map((user) => (
          <div
            key={user._id}
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
                  {home === true
                    ? user.username
                    : user.lastMsg || "No message yet"}
                </p>
              </div>
            </div>

            {user.unread > 0 && (
              <span className="bg-sky-500 text-white text-xs px-2 py-1 rounded-full">
                {user.unread}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
