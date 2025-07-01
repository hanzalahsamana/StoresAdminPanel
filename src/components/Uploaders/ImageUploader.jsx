import { useState, useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { Tooltip } from "react-tooltip";
import { IoImageOutline } from "react-icons/io5";

const placeholderImageUrl =
  "https://res.cloudinary.com/duaxitxph/image/upload/v1736247980/cjzl4ivq2lduxqbtnfj1.webp";

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

const ImageUploader = ({
  image = placeholderImageUrl,
  setImage = () => { },
  size = "small",
  className,
}) => {
  const fileInputRef = useRef(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      if (imagePreviewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [imagePreviewUrl]);

  useEffect(() => {
    if (!image) return;

    if (imagePreviewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreviewUrl);
    }

    if (image instanceof File) {
      const objectUrl = URL.createObjectURL(image);
      setImagePreviewUrl(objectUrl);
    } else if (typeof image === "string") {
      setImagePreviewUrl(image);
    }
  }, [image]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      setError("Invalid file type. Allowed: JPEG, PNG, WEBP, GIF.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("File size exceeds 4MB limit.");
      return;
    }

    setError("");
    setImage(file);
    event.target.value = "";
  };

  const handleImageRemove = () => {
    setImage(placeholderImageUrl);
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const isPlaceholder =
    imagePreviewUrl === placeholderImageUrl || !imagePreviewUrl;

  return (
    <div className={`flex flex-col gap-2 justify-center items-start ${className}`}>

      <div>
        <p>Upload Image</p>
        <p className="text-gray-400"> <span className="italic">Recommended Ratio</span> - size:100 x 100 px ratio: 1/1 format:Webp </p>
      </div>
      <div
        className={`relative group ${size === "small"
            ? "w-[40px] h-[40px]"
            : size === "medium"
              ? "w-[60px] h-[60px]"
              : size === "large"
                ? "w-[100px] h-[100px]"
                : "w-[200px] h-[200px]"
          } rounded-md cursor-pointer`}
      >
        {!isPlaceholder ? (
          <div className="relative group w-full h-full rounded-md border hover:border-gray-300 transition-all border-gray-200">
            <img
              src={imagePreviewUrl}
              alt="Uploaded"
              onClick={handleClick}
              className="bg-transparent object-contain w-full h-full"
            />
            <button
              data-tooltip-id="my"
              data-tooltip-content="Remove Image"
              onClick={handleImageRemove}
              className={`absolute z-20 top-[-8px] right-[-8px] rounded-full text-backgroundC bg-red-500 ${size === "small"
                  ? "text-[10px] p-0.5"
                  : size === "medium"
                    ? "text-[10px] p-1"
                    : "text-[15px] p-1"
                } opacity-0 group-hover:opacity-100 transition-opacity duration-200`}
            >
              <IoMdClose />
              <Tooltip className="!text-[10px]" id="my" />
            </button>
          </div>
        ) : (
          <div
            className="flex flex-col justify-center border border-dashed border-primaryC items-center rounded-md bg-secondaryC w-full h-full"
            onClick={handleClick}
          >
            <IoImageOutline
              className={`text-primaryC font-bold ${size === "small"
                  ? "text-[15px]"
                  : size === "medium"
                    ? "text-[25px]"
                    : size === "large"
                      ? "text-[40px]"
                      : "text-[70px]"
                }`}
            />
          </div>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        accept={ALLOWED_MIME_TYPES.join(",")}
        onChange={handleImageUpload}
        className="hidden"
      />

      {error && <p className="text-red-500 text-[14px] font-medium">*{error}</p>}
    </div>
  );
};

export default ImageUploader;
