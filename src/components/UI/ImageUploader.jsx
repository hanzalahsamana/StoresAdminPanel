"use client";
import { useState } from 'react';
import placeHolderImage from '@/Assets/Images/placeholder-image.webp';
import { MdOutlinePermMedia } from "react-icons/md";
import { MdPlaylistRemove } from "react-icons/md";


const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setImage(null);
  };

  return (
    <div
      className="relative min-w-[230px] max-w-[230px] min-h-[230px] max-h-[230px] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={image || placeHolderImage.src}
        alt="Uploaded"
        className="w-full h-full object-cover rounded-lg"
      />

      <div className={`${isHovered ? 'bottom-0' : 'bottom-[-100%]'} transition-all duration-100 absolute left-0 w-full bg-opacity-80 bg-gray-800 px-2 py-1 rounded-b-lg flex justify-between items-center `}>
        <label
          htmlFor="image-upload"
          className="text-white cursor-pointer py-3 flex gap-2"
        >
          {image ? 'Change' : 'Upload'}
          <MdOutlinePermMedia />
        </label>
        {image && (
          <button
            onClick={handleImageRemove}
            className="text-white bg-red-500 px-2 py-2 rounded flex gap-2"
          >
            Remove
            <MdPlaylistRemove />
          </button>
        )}
        {!image && (
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
