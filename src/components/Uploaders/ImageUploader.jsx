import { useState, useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { Tooltip } from "react-tooltip";
import { IoImageOutline } from "react-icons/io5";
import { HiOutlineInformationCircle } from "react-icons/hi";

const placeholderImageUrl =
  "https://res.cloudinary.com/duaxitxph/image/upload/v1736247980/cjzl4ivq2lduxqbtnfj1.webp";

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const RECOMMENDED_SIZE = '100x100';
const RECOMMENDED_RATIO = '1:1';

const sizeClasses = {
  small: {
    wrapper: "w-[40px] h-[40px]",
    icon: "text-[15px]",
    close: "text-[10px] p-0.5",
  },
  medium: {
    wrapper: "w-[60px] h-[60px]",
    icon: "text-[25px]",
    close: "text-[10px] p-1",
  },
  large: {
    wrapper: "w-[100px] h-[100px]",
    icon: "text-[40px]",
    close: "text-[15px] p-1",
  },
  xlarge: {
    wrapper: "w-[200px] h-[200px]",
    icon: "text-[70px]",
    close: "text-[18px] p-2",
  },
};

const ImageUploader = ({
  image = placeholderImageUrl,
  setImage,
  label = 'Upload Image',
  size = "small",
  formats = ALLOWED_MIME_TYPES,
  maxFileSize = MAX_FILE_SIZE,
  recommendedSize = RECOMMENDED_SIZE,
  recommendedRatio = RECOMMENDED_RATIO,
  error = "",
  className = "",
}) => {
  const fileInputRef = useRef(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState();
  const [validateError, setValidateError] = useState("");

  useEffect(() => {
    if (error) setValidateError(error);
  }, [error]);

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

  useEffect(() => {
    if (imagePreviewUrl?.startsWith("blob:")) {
      return () => URL.revokeObjectURL(imagePreviewUrl);
    }
  }, [imagePreviewUrl]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!formats.includes(file.type || "")) {
      setValidateError(`Invalid file type. Allowed: ${formats.join(", ")}`);
      return;
    }

    if (file.size > maxFileSize) {
      setValidateError(`File size exceeds ${Math.floor(maxFileSize / 1024 / 1024)}MB limit.`);
      return;
    }

    setValidateError("");
    setImage?.(file);
    event.target.value = "";
  };

  const handleImageRemove = () => {
    setImage?.(placeholderImageUrl);
    setValidateError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const isPlaceholder = imagePreviewUrl === placeholderImageUrl || !imagePreviewUrl;
  const currentSize = sizeClasses[size] || sizeClasses.small;

  return (
    <div className={`flex flex-col gap-2 justify-center items-start ${className}`}>
      {label && <p className="font-medium text-sm text-gray-700">{label}</p>}

      <div
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={(e) => e.key === "Enter" && handleClick()}
        className={`relative group ${currentSize.wrapper} rounded-md cursor-pointer`}
      >
        {!isPlaceholder ? (
          <div className={`relative w-full h-full rounded-md border transition-all ${validateError ? 'border-red-500' : 'border-gray-200'} hover:border-gray-300`}>
            <img
              src={imagePreviewUrl}
              alt="Uploaded"
              className="bg-transparent object-contain w-full h-full"
            />
            <button
              data-tooltip-id="my"
              data-tooltip-content="Remove Image"
              onClick={handleImageRemove}
              className={`absolute z-20 top-[-8px] right-[-8px] rounded-full text-backgroundC bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${currentSize.close}`}
            >
              <IoMdClose />
              <Tooltip id="my" className="!text-[10px]" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col justify-center border border-dashed border-[#6b7280] items-center rounded-md bg-gray-100 w-full h-full">
            <IoImageOutline className={`text-[#6b7280] font-bold ${currentSize.icon}`} />
          </div>
        )}
      </div>

      <div className="flex items-start gap-2 text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-md p-2 mt-2">
        <HiOutlineInformationCircle className="text-blue-500 mt-0.5 flex-shrink-0" size={16} />
        <div>
          <p className="font-medium text-gray-700">Recommended:</p>
          <span>
            Size: <b>{recommendedSize}</b> px, Max Size: <b>{Math.floor(maxFileSize / 1024 / 1024)}MB</b>
          </span>
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        accept={formats.join(",")}
        onChange={handleImageUpload}
        className="hidden"
      />

      {validateError && <p className="text-red-500 text-[12px]">* {validateError}</p>}
    </div>
  );
};

export default ImageUploader;
