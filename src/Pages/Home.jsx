import React, { useEffect, useState } from "react";
import PostedMemeCard from "../Components/PostedMemeCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchMemes, fetchUsers, getUserMemes } from "../Store/memeSlice";
import TopBar from "../Components/TopBar";
import Conversation from "./Messages/Conversation";
import { AllUsers } from "../Components/AllUsers";
const Loader = React.lazy(() => import("../Components/Loader"));

function Home() {
  const username = localStorage.getItem("username");
  const dispatch = useDispatch();
  const { memes, users, loading, error, likedMemes, comments } = useSelector(
    (state) => state.meme
  );
  const [newMemes, setNewMemes] = useState(memes);
  const [userToChat, setUsertoChat] = useState(null);

  const handleUserMemes = async () => {
    try {
      const response = await dispatch(getUserMemes(username)).unwrap();
      const userMemes = response.data.map((meme) => ({
        box_count: 0,
        captions: meme.caption,
        id: meme._id,
        name: meme.title,
        url: meme.image,
      }));
      setNewMemes(memes.concat(userMemes));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    dispatch(fetchMemes());
    dispatch(fetchUsers());
    handleUserMemes();
    userToChat;
  }, []);

  if (loading) return <Loader />;
  if (error)
    return (
      <p className="flex items-center my-auto justify-center text-red-400">
        Error: {error}
      </p>
    );

  const currentUser = users.filter((user) => user.username == username);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 w-full">
      <TopBar
        currentUser={currentUser}
        users={users}
        username={username}
        setUsertoChat={setUsertoChat}
      />
      <div
        className={
          userToChat
            ? "col-span-8 text-center overflow-y-hidden px-0"
            : "col-span-8 text-center overflow-y-scroll px-3"
        }
      >
        {userToChat == null ? (
          <PostedMemeCard
            memes={newMemes}
            likedMemes={likedMemes}
            comments={comments}
          />
        ) : (
          <Conversation suid={userToChat} setUsertoChat={setUsertoChat} />
        )}
      </div>
      <div className="col-span-4 col border-l-1 border-gray-300">
        <AllUsers
          currentUser={currentUser}
          users={users}
          username={username}
          setUsertoChat={setUsertoChat}
        />
      </div>
    </div>
  );
}

export default Home;
