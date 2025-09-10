import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useFolder } from "../context/FolderContext";
import ImageManager from "./ImageManager";
import AddFolder from "./AddFolder";
const FolderExplorer = () => {
  const { token } = useAuth();
  const [currentFolder, setCurrentFolder] = useState(null); // null = root
  const { folders, setFolders } = useFolder();
  const { images, setImages } = useFolder();
  const [folderStack, setFolderStack] = useState([]); // to track navigation
  const [imageBool, setImageBool] = useState(false);
  const [search, setSearch] = useState("");
  console.log(process.env.REACT_APP_API_URL_BACKEND);
  // Fetch folders inside current folder
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL_BACKEND}/folder`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // Filter folders by parent = currentFolder (or null for root)
        const filtered = res.data.filter(
          (f) => (f.parent || null) === currentFolder
        );
        setFolders(filtered);
      });
  }, [currentFolder, token]);
  const handleSearch = async () => {
    if (!search) return;
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL_BACKEND}/image/search?query=${search}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setImages(data);
  };
  // Fetch images inside current folder
  useEffect(() => {
    if (currentFolder === null) {
      setImages([]); // no images at root level or handle as needed
      return;
    }
    axios
      .get(`${process.env.REACT_APP_API_URL_BACKEND}/image/by-folder/${currentFolder}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setImages(res.data));
  }, [currentFolder, token]);

  const openFolder = (folderId) => {
    setFolderStack([...folderStack, currentFolder]);
    setCurrentFolder(folderId);
  };

  const goBack = () => {
    if (folderStack.length === 0) return; // already at root
    const newStack = [...folderStack];
    const prevFolder = newStack.pop();
    setFolderStack(newStack);
    setCurrentFolder(prevFolder);
  };

  return (
    <div className="min-h-screen flex flex-col p-4 gap-6 bg-gray-50">
       <div className="flex gap-2 mb-3">
          <input
            value={search}
            placeholder="Image Name"
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleSearch}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Search
          </button>
        </div>
      {/* Navigation */}
      <div className="flex items-center gap-4">
        <button
          onClick={goBack}
          disabled={folderStack.length === 0}
          className={`px-3 py-1 rounded ${
            folderStack.length === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          ↑ Back
        </button>
        <span className="text-lg font-semibold">
          {currentFolder ? `Folder ID: ${currentFolder}` : "Root Folder"}
        </span>
      </div>
      {imageBool && <ImageManager setImageBool={setImageBool} currentFolder={currentFolder}/>}
      {/* Folder List - Top half */}
      <div className="bg-white rounded shadow p-4 max-h-[40vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-3">Folders</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {folders.map((folder) => (
              <button
                key={folder._id}
                onClick={() => openFolder(folder._id)}
                className="flex flex-col items-center p-3 bg-yellow-100 rounded-lg shadow cursor-pointer hover:bg-yellow-200 transition"
                aria-label={`Open folder ${folder.name}`}
              >
                {/* Folder Icon - simple SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mb-2 text-yellow-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 7h4l3 3h11v11H3V7z"
                  />
                </svg>
                <span className="text-center text-sm font-medium truncate w-full">
                  {folder.name}
                </span>
              </button>
            ))}
            <AddFolder currentFolder={currentFolder}/>
          </div>
      </div>

      {/* Images - Bottom half */}
      <div className="bg-white rounded shadow p-4 flex-1 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-3">Images</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((img) => (
            <div
              key={img._id}
              className="flex flex-col items-center bg-gray-50 p-3 rounded shadow hover:shadow-md"
            >
              <span className="text-sm font-medium mb-2 truncate">
                {img.name}
              </span>
              <img
                src={img.imageUrl}
                alt={img.name}
                className="w-24 h-24 object-cover rounded"
              />
            </div>
          ))}
          <div
              className="flex flex-col items-center bg-gray-50 p-3 rounded shadow hover:shadow-md" onClick={()=>{
                setImageBool(true);
              }}
            >
              <span className="text-sm font-medium mb-2 truncate">
                Upload Image
              </span>
              <img
                src="/"
                alt="Add Image"
                className="w-24 h-24 object-cover rounded"
              />
            </div>
        </div>
      </div>
    </div>
  );
};

export default FolderExplorer;
