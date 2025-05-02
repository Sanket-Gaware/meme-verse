import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PostedMemeCard from "../Components/PostedMemeCard";

export default function Explore() {
  const { memes, loading, error } = useSelector((state) => state.meme);
  const [selectedMeme, setSelectedMeme] = useState(null);
  const [exploreMemes, setExploreMemes] = useState([]);

  useEffect(() => {
    // Shuffle logic using Fisher-Yates
    const shuffled = [...memes];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setExploreMemes(shuffled);
  }, [memes]);
  if (loading) return <p>Loading memes...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="md:p-5 p-1">
      <div className="columns-2 md:columns-3 lg:columns-3 gap-4 space-y-4">
        {exploreMemes.map((meme, i) => (
          <div
            key={i}
            className="break-inside-avoid cursor-pointer"
            onClick={() => setSelectedMeme(meme)}
          >
            <img
              className="w-full h-auto rounded-lg shadow-sm hover:scale-105 transition-transform"
              src={meme.url}
              alt={meme.name}
            />
          </div>
        ))}
      </div>
      {/* model after clicking on meme */}
      {selectedMeme && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 overflow-y-auto"
          onClick={() => setSelectedMeme(null)}
        >
          <div className="bg-white rounded-xl px-6 p-2 w-11/12 md:w-2/3 lg:w-1/2 relative shadow-lg ">
            <div className="flex items-center space-x-3 py-2">
              <img
                src={selectedMeme.url}
                alt="Meme thumbnail"
                className="w-10 h-10 rounded-full object-cover border border-gray-300"
              />
              <div>
                <h2 className="font-semibold text-gray-900 text-sm">
                  {selectedMeme.name}
                </h2>
              </div>
            </div>
            <img
              src={selectedMeme.url}
              alt={selectedMeme.name}
              className="w-90 h-auto rounded-lg"
            />
            <p className="mt-4 text-sm text-gray-600">
              Meme Id: <strong>{selectedMeme.id || "Unknown"}</strong>
            </p>
          </div>
        </div>
      )}
      {/* <div>
        <PostedMemeCard
          memes={memes}
          likedMemes={likedMemes}
          comments={comments}
        />
      </div> */}
    </div>
  );
}
