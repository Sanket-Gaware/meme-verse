import React, { useEffect, useState } from "react";
import PostedMemeCard from "../Components/PostedMemeCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchMemes, fetchUsers, getUserMemes } from "../Store/memeSlice";
const Loader = React.lazy(() => import("../Components/Loader"));
function Home() {
  const username = localStorage.getItem("username");
  const dispatch = useDispatch();
  const { memes, users, loading, error, likedMemes, comments } = useSelector(
    (state) => state.meme
  );
  const [newMemes, setNewMemes] = useState(memes);

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
  }, []);
  useEffect(() => {
    handleUserMemes();
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
      <div className="col-span-8 text-center overflow-y-scroll">
        <PostedMemeCard
          memes={newMemes}
          likedMemes={likedMemes}
          comments={comments}
        />
      </div>
      <div className="col-span-4 col border-l-1 border-gray-300">
        <div className="fixed top-0 hidden md:block">
          <div className="flex gap-3 justify-items-start items-center my-5 px-5">
            <img className="h-12 rounded-full" src={currentUser[0]?.profile} />
            <div>
              <p className="text-sm tracking-wider font-semibold">
                {currentUser[0]?.username}
              </p>
              <p className="text-sm text-gray-500">
                {currentUser[0]?.fullname}
              </p>
            </div>
          </div>
          <div className="w-screen h-0.1 border border-b-gray-50 "></div>
          <div className="px-5 mt-3">
            <p className="font-bold text-gray-500 tracking-wide">Friends</p>
            {users.map((user, i) => {
              if (user.username === username) return null; // Don't display the current user in the list
              return (
                <div key={i} className="flex justify-between items-center my-3">
                  <div className="flex gap-3 items-center">
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
                  <div className="">
                    <label className="text-blue-700 font-bold text-sm">
                      Follow
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
