import React from "react";

const Image = ({img}) => {
  return (
    <div
      key={img._id}
      onClick={()=>window.open(img.imageUrl, "_blank")}
      className="group flex flex-col items-center bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-3 w-32 cursor-pointer"
    >
      <div className="relative w-24 h-24 overflow-hidden rounded-xl">
        <img
          src={img.imageUrl}
          alt={img.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <span className="mt-2 text-sm font-semibold text-gray-700 truncate w-full text-center">
        {img.name}
      </span>
    </div>
  );
};

export default Image;
