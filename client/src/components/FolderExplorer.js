import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import FolderTree from "./FolderTree";

const FolderExplorer = () => {
  const { token } = useAuth();
  const [currentFolder, setCurrentFolder] = useState(null); // null = root
  const [folders, setFolders] = useState([]);
  const [images, setImages] = useState([]);
  const [folderStack, setFolderStack] = useState([]); // to track navigation
  const [folderBool, setFolderBool] = useState(false);
  // Fetch folders inside current folder
  useEffect(() => {
    axios
      .get("http://localhost:5000/folder", {
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

  // Fetch images inside current folder
  useEffect(() => {
    if (currentFolder === null) {
      setImages([]); // no images at root level or handle as needed
      return;
    }
    axios
      .get(`http://localhost:5000/image/by-folder/${currentFolder}`, {
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
      {folderBool && <FolderTree setFolderBool={setFolderBool} currentFolder={currentFolder}/>}
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
            <button className="flex flex-col items-center p-3 bg-yellow-100 rounded-lg shadow cursor-pointer hover:bg-yellow-200 transition" onClick={()=>{
                setFolderBool(true);
            }}>
              {/* Folder Icon - simple SVG */}

              <span className="text-center text-sm font-medium truncate w-full">
                New Folder
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mb-2 text-yellow-600"
                fill="none"
                viewBox="0 0 32 32"
                stroke="currentColor"
                strokeWidth={2}
              >
                {/* Folder outline */}
                <rect
                  x="6"
                  y="10"
                  width="20"
                  height="12"
                  rx="3"
                  stroke="currentColor"
                  fill="none"
                />
                <path
                  d="M6 13V10c0-1.66 1.34-3 3-3h5l2 3h8c1.1 0 2 .9 2 2v1"
                  stroke="currentColor"
                  fill="none"
                />

                {/* Add circle */}
                <circle
                  cx="24"
                  cy="22"
                  r="5"
                  stroke="currentColor"
                  fill="none"
                />

                {/* Plus sign */}
                <line
                  x1="24"
                  y1="20.5"
                  x2="24"
                  y2="23.5"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                />
                <line
                  x1="22.5"
                  y1="22"
                  x2="25.5"
                  y2="22"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
      </div>

      {/* Images - Bottom half */}
      <div className="bg-white rounded shadow p-4 flex-1 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-3">Images</h2>
        {images.length === 0 && (
          <p className="text-gray-500">No images in this folder</p>
        )}
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
        </div>
      </div>
    </div>
  );
};

export default FolderExplorer;
