import React from "react";
import { useSelector } from "react-redux";
import PostedMemeCard from "../Components/PostedMemeCard";

export default function Explore() {
  const { memes, loading, error } = useSelector((state) => state.meme);

  if (loading) return <p>Loading memes...</p>;
  if (error) return <p>Error: {error}</p>;

  const exploreMemes = [...memes].reverse(); // clone to avoid mutating original array
  return (
    <div className="p-5">
      <div className="columns-2 md:columns-3 lg:columns-3 gap-4 space-y-4">
        {exploreMemes.map((meme, i) => (
          <div key={i} className="break-inside-avoid">
            <img
              className="w-full h-auto rounded-lg shadow-sm"
              src={meme.url}
              alt={meme.name}
            />
          </div>
        ))}
      </div>
      <div>
        <PostedMemeCard memes={memes}  />
      </div>
    </div>
  );
}
