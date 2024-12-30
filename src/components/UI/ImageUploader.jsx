"use client";
import { useState } from 'react';
import placeHolderImage from '@/Assets/Images/placeholder-image.webp';

const ImageUploader = () => {
  const [image, setImage] = useState(null); // State for the uploaded image
  const [isHovered, setIsHovered] = useState(false); // State to track hover

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Set the image once it's loaded
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setImage(null); // Remove the image and revert to the placeholder
  };

  return (
    <div
      className="relative w-64 h-64"
      onMouseEnter={() => setIsHovered(true)} // Hover effect on mouse enter
      onMouseLeave={() => setIsHovered(false)} // Hover effect on mouse leave
    >
      {/* Display the image or placeholder */}
      <img
        src={image || placeHolderImage.src} // Use uploaded image or placeholder
        alt="Uploaded"
        className="w-full h-full object-cover rounded-lg"
      />

      {/* Options to upload or remove image (appear on hover) */}
      {isHovered && (
        <div className="absolute bottom-0 left-0 w-full bg-opacity-80 bg-gray-800 p-2 rounded-b-lg flex justify-between items-center">
            <label
              htmlFor="image-upload"
              className="text-white cursor-pointer"
            >
              Upload Image
            </label>
          {image &&  (
            <button
              onClick={handleImageRemove}
              className="text-white bg-red-500 px-2 py-1 rounded"
            >
              Remove Image
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
      )}
    </div>
  );
};

export default ImageUploader;
