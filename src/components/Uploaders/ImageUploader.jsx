"use client";
import { useState, useEffect } from "react";
import Button from "../Actions/Button";
import { BsFillCloudArrowUpFill } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { Tooltip } from "react-tooltip";

const placeholderImageUrl =
  "https://res.cloudinary.com/duaxitxph/image/upload/v1736247980/cjzl4ivq2lduxqbtnfj1.webp";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

const ImageUploader = ({ image, setImage }) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState(image);
  const [error, setError] = useState("");

  useEffect(() => {
    if (imagePreviewUrl) {
      return () => URL.revokeObjectURL(imagePreviewUrl);
    }
  }, [imagePreviewUrl]);

  useEffect(() => {
    if (typeof image !== "object") {
      setImagePreviewUrl(image);
    }
  }, [image]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    // Validate File Type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      setError("Invalid file type. Allowed: JPEG, PNG, WEBP, GIF.");
      return;
    }

    // Validate File Size
    if (file.size > MAX_FILE_SIZE) {
      setError("File size exceeds 5MB limit.");
      return;
    }

    setError(""); // Clear any previous error
    const newObjectUrl = URL.createObjectURL(file);
    setImage(file);
    setImagePreviewUrl(newObjectUrl);
  };

  const handleImageRemove = () => {
    setImage(placeholderImageUrl);
    setImagePreviewUrl(placeholderImageUrl);
    setError(""); // Reset error
  };

  const isPlaceholder = image === placeholderImageUrl;

  return (
    <div className="relative flex flex-col gap-3 justify-center  items-center h-full w-full rounded-sm overflow-hidden">
      <div className="flex flex-1 items-center flex-col gap-4">
        {/* <BsFillCloudArrowUpFill className="text-primaryC text-[100px]" /> */}
        <p className="text-textTC font-[inter] text-center text-[14px] ">Upload your image here</p>
        <Button
          action={() => document.getElementById("fileInput").click()}
          label="Upload"
          className="w-max !text-[16px] min-w-[120px] shadow-lg"
          variant=""
        />
        <input
          id="fileInput"
          type="file"
          accept={ALLOWED_MIME_TYPES.join(",")}
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      <div className="relative">
        <img
          src={imagePreviewUrl}
          alt="Uploaded"
          className="w-[350px] h-[250px] bg-backgroundC object-cover border border-solid border-borderC shadow-inner rounded-sm"
        />
        {!isPlaceholder && (
          <button
            data-tooltip-id="my"
            data-tooltip-content="Remove Image"
            onClick={handleImageRemove}
            className="absolute z-20 top-[-8px] right-[-8px] rounded-full text-white bg-red-500 text-[12px] p-1"
          >
            <IoMdClose />
            <Tooltip className="!text-[10px]" id="my" />
          </button>
        )}
      </div>

      {/* <p className="absolute bottom-[0px] text-red-500 text-[14px] font-medium">hello</p> */}
      {error && (
        <p className="absolute bottom-[0px] text-red-500 text-[14px] font-medium">{error}</p>
      )}
    </div>
  );
};

export default ImageUploader;
