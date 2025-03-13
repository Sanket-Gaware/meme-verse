import { Heart, MessageCircle, Share2Icon } from "lucide-react";

const PostedMemeCard = ({ memes }) => {
  return (
    <div className="">
      {memes.map((meme, i) => {
        return (
          <div
            key={i}
            class="max-w-md mx-auto  bg-white rounded-2xl shadow-lg border border-gray-200 my-5"
          >
            <div class="flex items-center justify-between p-4">
              <div class="flex items-center space-x-3">
                <img
                  src={meme.url}
                  alt="Meme thumbnail"
                  class="w-10 h-10 rounded-full object-cover border border-gray-300"
                />
                <div>
                  <h2 class="font-semibold text-gray-900">{meme.name}</h2>
                  <p class="text-sm text-gray-500">Meme ID: {meme.id}</p>
                </div>
              </div>
              <button class="text-gray-400 hover:text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v.01M12 12v.01M12 18v.01"
                  />
                </svg>
              </button>
            </div>

            <img
              src={meme.url}
              alt="Drake Meme"
              class="w-full h-auto object-cover"
            />

            <div class="p-4 space-y-2">
              <div class="flex justify-between text-sm text-gray-600">
                <span>
                  🗨️ Captions: <strong>{meme.captions}</strong>
                </span>
                <span>
                  📦 Boxes: <strong>{meme.box_count}</strong>
                </span>
              </div>

              <div class="flex space-x-4 pt-2 text-gray-600">
                <button class="hover:text-red-500 transition flex gap-1">
                  <Heart />
                </button>
                <button class="hover:text-blue-500 transition">
                  <MessageCircle />
                </button>
                <button class="hover:text-green-500 transition">
                  <Share2Icon />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default PostedMemeCard;
