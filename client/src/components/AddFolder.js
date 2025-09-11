import React, {useState} from "react";
import FolderTree from "./utils/FolderTree";
const AddFolder = ({currentFolder}) => {
  const [folderBool, setFolderBool] = useState(false);
  return (
    <div>
        {folderBool && <FolderTree setFolderBool={setFolderBool} currentFolder={currentFolder}/>}
      <button
        className="flex flex-col items-center p-3 bg-yellow-100 rounded-lg shadow cursor-pointer hover:bg-yellow-200 transition"
        onClick={() => {
          setFolderBool(true);
        }}
      >
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
          <circle cx="24" cy="22" r="5" stroke="currentColor" fill="none" />

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
  );
};

export default AddFolder;
