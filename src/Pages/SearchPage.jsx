import { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import _ from "lodash";
import { Search, ArrowLeft } from "lucide-react";
import PostedMemeCard from "../Components/PostedMemeCard";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [filteredMemes, setFilteredMemes] = useState([]);
  const [selectedMeme, setSelectedMeme] = useState(null);
  const { memes, loading, error, likedMemes, comments } = useSelector(
    (state) => state.meme
  );

  // Debounced search function
  const debouncedSearch = useMemo(
    () =>
      _.debounce((searchTerm) => {
        if (!searchTerm) {
          setFilteredMemes([]);
          return;
        }
        const results = memes.filter((meme) =>
          meme.name?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredMemes(results);
      }, 500),
    [memes]
  );

  useEffect(() => {
    if (query.trim() === "") {
      setFilteredMemes([]); // Clear if search is empty
      return;
    }
    debouncedSearch(query);
    return () => debouncedSearch.cancel();
  }, [query]);

  if (loading) return <p className="text-center my-auto">Loading memes...</p>;
  if (error) return <p className="text-center text-red-400">Error: {error}</p>;

  // Back to list
  const handleBack = () => setSelectedMeme(null);

  return (
    <div className="p-1 pb-0 max-w-3xl mx-auto">
      {!selectedMeme ? (
        <>
          {/*<div className="text-2xl font-bold mb-4 flex items-center gap-2 border  rounded-xl focus:ring-2 focus:ring-blue-500">
            <Search className="w-7 h-7 text-blue-600 ms-3" />
          <input
            type="text"
            placeholder="Search Memes..."
            className="w-full px-4 py-2 border-0 flex items-center focus:ring-0 focus:ring-blue-500"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>*/}
        <div className="relative">
          <div className="text-2xl font-bold mb-1 flex items-center gap-2 border border-gray-300 rounded-l px-2 focus-within:ring-2 focus-within:ring-blue-500">
            <Search className="w-7 h-7 text-blue-400 ms-1" />
            <input
              type="text"
              placeholder="Search Memes..."
              className="w-full px-4 py-2 border-0 outline-none bg-transparent text-base"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>


          {query && filteredMemes.length === 0 && (
            <p className="text-center text-gray-500">No memes found 😢</p>
          )}

          <div className="grid gap-4">
            {filteredMemes.map((meme, i) => (
              <div
                key={i}
                onClick={() => setSelectedMeme(meme)}
                className="bg-white cursor-pointer rounded-xl shadow p-4 flex items-center space-x-4 hover:shadow-md transition"
              >
                <img
                  src={meme.url}
                  alt={meme.name || "Meme"}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h2 className="font-semibold">
                    {meme.name || "Untitled Meme"}
                  </h2>
                  <p className="text-sm text-gray-500">
                    ID: {meme.id || "N/A"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <button
            onClick={handleBack}
            className="mb-4 flex items-center text-black"
          >
            <ArrowLeft className="mr-1 cursor-pointer" /> Back
          </button>
          <div className="pb-10">
            <PostedMemeCard
              memes={[selectedMeme]}
              likedMemes={likedMemes}
              comments={comments}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default SearchPage;
