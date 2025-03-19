import { useSelector } from "react-redux";
import { Heart, MessageCircleMore, Trophy } from "lucide-react";

const Leaderboard = () => {
  const { memes, likedMemes, comments } = useSelector((state) => state.meme);

  // Count likes & comments per meme
  const memeStats = memes.map((meme) => {
    const likeCount = likedMemes.filter((id) => id === meme.id).length;
    const commentCount = comments[meme.id]?.length || 0;
    return { ...meme, likeCount, commentCount };
  });

  // Filter memes that are either liked or commented
  const filteredMemes = memeStats.filter(
    (meme) => meme.likeCount > 0 || meme.commentCount > 0
  );

  // Sort by likeCount first, then commentCount as tie-breaker
  const sortedMemes = filteredMemes.sort((a, b) => {
    if (b.likeCount !== a.likeCount) return b.likeCount - a.likeCount;
    return b.commentCount - a.commentCount;
  });

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold flex items-center gap-2 mb-6">
        <Trophy className="text-yellow-500" /> Meme Leaderboard
      </h1>

      {sortedMemes.length === 0 ? (
        <p className="text-center text-gray-500">
          No liked or commented memes yet.
        </p>
      ) : (
        <div className="space-y-4">
          {sortedMemes.map((meme, index) => (
            <div
              key={meme.id}
              className="flex items-center bg-white rounded-xl shadow-md p-4 justify-between"
            >
              <div className="flex items-center gap-4">
                <span className="text-xl font-bold text-gray-700 w-6">
                  #{index + 1}
                </span>
                <img
                  src={meme.url}
                  alt={meme.name}
                  className="w-14 h-14 rounded-full object-cover border border-gray-300"
                />
                <div>
                  <h2 className="font-semibold">{meme.name}</h2>
                  <p className="text-sm text-gray-500">ID: {meme.id}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-gray-600">
                {meme.likeCount > 0 && (
                  <div className="flex items-center gap-1 text-red-500 font-bold">
                    <Heart fill="red" className="w-5 h-5" />
                    {meme.likeCount}
                  </div>
                )}
                {meme.commentCount > 0 && (
                  <div className="flex items-center gap-1 text-blue-500 font-bold">
                    <MessageCircleMore className="w-5 h-5" />
                    {meme.commentCount}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
