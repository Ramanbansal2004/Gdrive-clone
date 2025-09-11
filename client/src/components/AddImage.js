import React, {useState} from "react";
import { Plus } from "lucide-react";
import ImageManager from "./utils/ImageManager";
const AddImage = ({currentFolder}) => {
  const [imageBool, setImageBool] = useState(false);
  return (
    <>
      {imageBool && (
        <ImageManager
          setImageBool={setImageBool}
          currentFolder={currentFolder}
        />
      )}
      <div
        className="flex flex-col items-center justify-center w-32 h-36 bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition duration-300"
        onClick={() => setImageBool(true)}
      >
        <Plus className="w-8 h-8 text-gray-400 group-hover:text-blue-500 transition" />
        <span className="mt-2 text-sm font-medium text-gray-600">
          Upload Image
        </span>
      </div>
    </>
  );
};

export default AddImage;
