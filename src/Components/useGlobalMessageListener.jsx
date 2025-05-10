// hooks/useGlobalMessageListener.js
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUnreadUserCounts, incrementUnread } from "../Store/memeSlice";
import useSocket from "./useSocket";

const useGlobalMessageListener = (currentUser, userToChat) => {
  const BaseUrl = import.meta.env.VITE_BASE_URL;
  const socket = useSocket(`${BaseUrl}`);
  const dispatch = useDispatch();

  const playNotificationSound = () => {
    const audio = new Audio("/sound/adu1.mp3");
    audio.play();
  };
  const playMsgSound = () => {
    const audio = new Audio("/sound/chattingmsgtone.mp3");
    audio.play();
  };
  useEffect(() => {
    if (!socket || !currentUser?._id) return;

    const handleNewMessage = ({ participients }) => {
      //   const sid = currentUser._id;
      //   const rid = userToChat;

      //   if (participients.includes(rid)) {
      //     playMsgSound();
      //   }

      //   if (participients.includes(sid)) {
      //     const otherUserId = participients.find((id) => id !== sid);

      //     if (otherUserId && otherUserId !== currentUser._id) {
      //       dispatch(incrementUnread(otherUserId));
      //       dispatch(addUnreadUserCounts(otherUserId));
      //       playNotificationSound();
      //     }
      //   }
      // };

      const sid = currentUser._id; // your id
      const rid = userToChat; // id of user you're currently chatting with (may be null)

      if (participients.includes(rid)) {
        playMsgSound();
        return;
      }
      
      if (participients.includes(sid)) {
        const otherUserId = participients.find((id) => id !== sid);

        if (otherUserId) {
          dispatch(incrementUnread(otherUserId));
          dispatch(addUnreadUserCounts(otherUserId));
          playNotificationSound();
        }
      }
    };

    socket.on("sendMessage", handleNewMessage);
    return () => socket.off("sendMessage", handleNewMessage);
  }, [socket, currentUser, userToChat, dispatch]);
};

export default useGlobalMessageListener;
