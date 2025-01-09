"use client";
import { useState } from "react";
import { MdOutlinePermMedia } from "react-icons/md";
import { MdPlaylistRemove } from "react-icons/md";

const placeholderImageUrl =
  "https://res.cloudinary.com/duaxitxph/image/upload/v1736247980/cjzl4ivq2lduxqbtnfj1.webp";

const ImageUploader = ({ image, setImage }) => {
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
    setImage(placeholderImageUrl);
  };

  const isPlaceholder = image === placeholderImageUrl;

  return (
    <div
      className="relative h-full w-full  overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={image || placeholderImageUrl}
        alt="Uploaded"
        className="w-full h-full object-cover rounded-sm"
      />

      <div
        className={`${
          isHovered ? "bottom-0" : "bottom-[-100%]"
        } transition-all duration-100 absolute left-0 w-full bg-opacity-80 bg-gray-800 px-2 py-1 rounded-b-lg flex justify-between items-center`}
      >
        <label
          htmlFor="image-upload"
          className="text-white cursor-pointer py-3 flex gap-2"
        >
          {isPlaceholder ? "Upload" : "Change"}
          <MdOutlinePermMedia />
        </label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
        {!isPlaceholder && (
          <button
            onClick={handleImageRemove}
            className="text-white bg-red-500 px-2 py-2 rounded flex gap-2"
          >
            Remove
            <MdPlaylistRemove />
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
