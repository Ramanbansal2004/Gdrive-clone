import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useFolder } from "../context/FolderContext";
import axios from "axios";
const Search = () => {
  const { token } = useAuth();
  const { setFolders, setImages } = useFolder();
  const [search, setSearch] = useState("");
  const handleSearch = async () => {
    if (!search) return;
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL_BACKEND}/image/search?query=${search}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const folderData = await axios.get(
      `${process.env.REACT_APP_API_URL_BACKEND}/folder/search?query=${search}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setFolders(folderData.data);
    setImages(data);
  };
  return (
    <div className="flex w-full max-w-md">
      {/* Left Search Button */}
      <button
        onClick={handleSearch}
        className="flex items-center justify-center text-white px-4 rounded-l-full bg-blue-100 hover:bg-blue-200 active:scale-95 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          color="black"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
      <input
        value={search}
        placeholder="Image or Folder Name"
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1 border border-gray-300 rounded-r-full px-3 py-2 focus:outline-none"
      />
    </div>
  );
};

export default Search;
