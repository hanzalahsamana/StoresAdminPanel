"use client";
import { useState, useEffect, useRef } from "react";
import Button from "../Actions/Button";
import { BsFillCloudArrowUpFill } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { Tooltip } from "react-tooltip";
import { CiCamera } from "react-icons/ci";

const placeholderImageUrl =
  "https://res.cloudinary.com/duaxitxph/image/upload/v1736247980/cjzl4ivq2lduxqbtnfj1.webp";

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

const ImageUploader = ({ image = placeholderImageUrl, setImage = ()=>{} }) => {
  const fileInputRef = useRef(null);
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
    event.target.value = "";
  };

  const handleImageRemove = () => {
    setImage(placeholderImageUrl);
    setImagePreviewUrl(placeholderImageUrl);
    setError(""); // Reset error
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const isPlaceholder = image === placeholderImageUrl;

  return (
    <div className="flex flex-col gap-6 justify-center items-start w-full">

      <div className="flex gap-3">

        <div
          onClick={() => document.getElementById("fileInput").click()}
          className="flex flex-col justify-center items-center border-2 border-primaryC bg-secondaryC w-[100px] h-[100px] cursor-pointer">

          <CiCamera className={'text-[50px] text-primaryC font-bold'} />
          <p className="text-primaryC text-center text-[12px] ">Upload image</p>

        </div>

        <div className="relative group">

          <img
            src={imagePreviewUrl}
            alt="Uploaded"
            className="w-[100px] h-[100px] bg-transparent object-cover border border-solid border-borderC rounded-sm "
          />

          {!isPlaceholder && (
            <button
              data-tooltip-id="my"
              data-tooltip-content="Remove Image"
              onClick={handleImageRemove}
              className="absolute z-20 top-[-8px] right-[-8px] rounded-full text-backgroundC bg-red-500 text-[10px] p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <IoMdClose />
              <Tooltip className="!text-[10px]" id="my" />
            </button>
          )}
        </div>
      </div>



      <ul className="font-inter text-[12px] text-yellow-500 space-y-1 list-disc list-inside">
        <li>Allowed formats: JPEG, PNG, WEBP, GIF</li>
        <li>Max file size: 5MB</li>
      </ul>

      <input
        id="fileInput"
        type="file"
        ref={fileInputRef}
        accept={ALLOWED_MIME_TYPES.join(",")}
        onChange={handleImageUpload}
        className="hidden"
      />

      {error && (
        <p className="text-red-500 text-[14px] font-medium">*{error}</p>
      )}
    </div>
  );
};

export default ImageUploader;
