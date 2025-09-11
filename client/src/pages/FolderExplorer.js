import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useFolder } from "../context/FolderContext";
import AddFolder from "../components/AddFolder";
import Image from '../components/Image'
import AddImage from "../components/AddImage";
const FolderExplorer = () => {
  const { token } = useAuth(); 
  const { folders, setFolders, images, setImages, currentFolder, setCurrentFolder } = useFolder();
  const [folderStack, setFolderStack] = useState([]); 
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL_BACKEND}/folder`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const filtered = res.data.filter(
          (f) => (f.parent || null) === currentFolder.id
        );
        setFolders(filtered);
      });
  }, [currentFolder, token]);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL_BACKEND}/image/by-folder/${currentFolder.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => setImages(res.data));
  }, [currentFolder, token]);

  const openFolder = (folderId, folderName) => {
    setFolderStack([...folderStack, {id:currentFolder.id, name:currentFolder.name}]);
    document.title=folderName;
    setCurrentFolder({
      id:folderId,
      name:folderName
    });
  };

  const goBack = () => {
    if (folderStack.length === 0) return;
    const newStack = [...folderStack];
    const prevFolder = newStack.pop();
    setFolderStack(newStack);
    document.title=prevFolder.name;
    setCurrentFolder({
      id:prevFolder.id,
      name:prevFolder.name
    });
  };

  return (
    <div className="min-h-screen flex flex-col p-4 gap-6 bg-gray-50">
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
          {`Folder: ${currentFolder.name}`}
        </span>
      </div>
      <div className="bg-white rounded shadow p-4 max-h-[40vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-3">Folders</h2>
        <div className="flex flex-wrap gap-4">
          {folders.map((folder) => (
            <button
              key={folder._id}
              onClick={() => openFolder(folder._id, folder.name)}
              className="flex items-center gap-3 p-3 bg-yellow-100 rounded-lg shadow cursor-pointer hover:bg-yellow-200 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-yellow-600"
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
              <span className="text-sm font-medium truncate">
                {folder.name}
              </span>
            </button>
          ))}
          <AddFolder currentFolder={currentFolder.id} />
        </div>
      </div>
      <div className="bg-white rounded shadow p-4 flex-1 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-3">Images</h2>
        <div className="flex flex-wrap gap-4">
          {images.map((img) => (
            <Image img={img}/>
          ))}
          <AddImage currentFolder={currentFolder.id}/>
        </div>
      </div>
    </div>
  );
};

export default FolderExplorer;
