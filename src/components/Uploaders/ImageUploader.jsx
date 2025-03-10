"use client";
import { useState, useEffect } from "react";
import Button from "../Actions/Button";
import { BsFillCloudArrowUpFill } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { Tooltip } from "react-tooltip";

const placeholderImageUrl =
  "https://res.cloudinary.com/duaxitxph/image/upload/v1736247980/cjzl4ivq2lduxqbtnfj1.webp";

const ImageUploader = ({ image, setImage }) => {
  const [objectUrl, setObjectUrl] = useState(image);

  useEffect(() => {
    if (objectUrl) {
      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    }
  }, [objectUrl]);

  useEffect(() => {
    if (typeof image !== "object") {
      setObjectUrl(image)
    }
  }, [image])

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newObjectUrl = URL.createObjectURL(file);
      setImage(file);
      setObjectUrl(newObjectUrl);
    }
  };

  const handleImageRemove = () => {
    setImage(placeholderImageUrl);
    setObjectUrl(placeholderImageUrl);
  };

  const isPlaceholder = image === placeholderImageUrl;

  return (
    <div
      className="relative flex gap-3 justify-center border-[1.5px] border-primaryC items-center p-[20px]  h-full w-full rounded-sm overflow-hidden"
    >
      <div className="flex flex-1  items-center flex-col gap-4">
        <BsFillCloudArrowUpFill className="text-primaryC text-[100px]" />

        <p className="text-textTC  font-[inter] text-[16px]">
          Upload your image here
        </p>
        <Button action={() => document.getElementById('fileInput').click()} label="Upload" className="w-max !text-[16px] min-w-[120px] shadow-lg" variant="" />
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>
      <div className="relative">
        <img
          src={objectUrl}
          alt="Uploaded"
          className="w-[350px] h-[250px] bg-backgroundC object-cover border border-solid border-borderC shadow-inner rounded-sm"
        />
        {!isPlaceholder && (
          <button
            data-tooltip-id="my"
            data-tooltip-content="Remove Image"
            onClick={handleImageRemove}
            className="absolute top-[-8px] right-[-8px] rounded-full text-white bg-red-500 text-[12px] p-1"
          >
            <IoMdClose />
            <Tooltip className="!text-[10px]" id="my" />
          </button>
        )}
      </div>

    </div>
  );
};

export default ImageUploader;
