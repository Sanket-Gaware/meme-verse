import { Heart, MessageCircle, Navigation, Share2Icon } from "lucide-react";
import { useDispatch } from "react-redux";
import { likeMeme, addComment } from "../Store/memeSlice";
import { useState } from "react";

const PostedMemeCard = ({ memes, likedMemes, comments }) => {
  const dispatch = useDispatch();

  const [commentInput, setCommentInput] = useState({});
  const [openCommentBox, setOpenCommentBox] = useState({});

  //meme likes
  const handleLike = (id) => {
    dispatch(likeMeme(id));
  };

  //comments toggle
  const toggleCommentBox = (id) => {
    setOpenCommentBox((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  //comment change
  const handleCommentChange = (id, value) => {
    setCommentInput((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  //comment post
  const handleCommentSubmit = (id) => {
    if (commentInput[id]?.trim()) {
      dispatch(addComment({ memeId: id, comment: commentInput[id] }));
      setCommentInput((prev) => ({ ...prev, [id]: "" }));
    }
  };

  return (
    <div>
      {memes.map((meme) => {
        const isLiked = likedMemes.includes(meme.id);
        const memeComments = comments[meme.id] || [];

        return (
          <div
            key={meme.id}
            className="max-w-md mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 my-5"
          >
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                <img
                  src={meme.url}
                  alt="Meme thumbnail"
                  className="w-10 h-10 rounded-full object-cover border border-gray-300"
                />
                <div>
                  <h2 className="font-semibold text-gray-900">{meme.name}</h2>
                  <p className="text-sm text-gray-500">Meme ID: {meme.id}</p>
                </div> 
              </div>
            </div>

            <img
              src={meme.url}
              alt={meme.name}
              className="w-full h-auto object-cover"
            />

            <div className="p-4 space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>
                  🗨️ Captions: <strong>{meme.captions}</strong>
                </span>
                <span>
                  📦 Boxes: <strong>{meme.box_count}</strong>
                </span>
              </div>

              <div className="flex space-x-4 pt-2 text-gray-600">
                <button
                  className={`hover:text-red-500 transition flex gap-1 ${
                    isLiked ? "text-red-500" : ""
                  }`}
                  onClick={() => handleLike(meme.id)}
                >
                  <Heart fill={isLiked ? "red" : "none"} />
                </button>
                <button
                  className="hover:text-blue-500 transition"
                  onClick={() => toggleCommentBox(meme.id)}
                >
                  <MessageCircle />
                </button>
                <button className="hover:text-green-500 transition">
                  <Share2Icon />
                </button>
              </div>

              {openCommentBox[meme.id] && (
                <div className="pt-3">
                  <div className="flex justify-between">
                    <input
                      type="text"
                      className="border w-full rounded-lg px-2 py-1"
                      placeholder="Write a comment..."
                      value={commentInput[meme.id] || ""}
                      onChange={(e) =>
                        handleCommentChange(meme.id, e.target.value)
                      }
                    />
                    <button
                      className="ml-2 bg-blue-500 text-white rounded-lg px-2 py-1"
                      onClick={() => handleCommentSubmit(meme.id)}
                    >
                      <Navigation />
                    </button>
                  </div>
                  <ul className="mt-2 space-y-1 text-sm text-gray-700">
                    {memeComments.map((cmt, idx) => (
                      <li key={idx} className="flex pb-1 px-2 text-gray-500">
                        💬 {cmt}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PostedMemeCard;
