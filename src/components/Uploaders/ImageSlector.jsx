"use client";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Tooltip } from "react-tooltip";
import { HiOutlineUpload } from "react-icons/hi";
import ImageSelectorModal from "../Modals/ImageSelectorModal";

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
    close: "text-[10px] p-1",
  },
  xlarge: {
    wrapper: "w-[200px] h-[200px]",
    icon: "text-[70px]",
    close: "text-[18px] p-2",
  },
};

const ImageSelector = ({
  image = "",
  setImage = () => { },
  label = "Upload Image",
  size = "small",
  className = "",
  multiple = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentSize = sizeClasses[size] || sizeClasses.small;
  const [selectedImage, setSelectedImage] = useState([]);

  useEffect(() => {
    const foramttedImage = Array.isArray(image)
      ? image
      : image
        ? [image]
        : []

    setSelectedImage(foramttedImage)
  }, [])

  const handleClick = () => setIsOpen(true);

  const handleImageRemove = (imgToRemove) => {
    if (multiple) {
      const arr = Array.isArray(selectedImage)
        ? selectedImage
        : typeof selectedImage === "string" && selectedImage
          ? [selectedImage]
          : [];
      const updated = arr.filter((img) => img !== imgToRemove);
      setSelectedImage(updated);
    } else {
      setSelectedImage([]);
    }
  };


  useEffect(() => {
    if (multiple) {
      const arr = Array.isArray(selectedImage)
        ? selectedImage
        : typeof selectedImage === 'string'
          ? [selectedImage]
          : [];
      setImage(arr.filter(Boolean));
    } else {
      const val = Array.isArray(selectedImage)
        ? selectedImage[0] || ''
        : typeof selectedImage === 'string'
          ? selectedImage
          : '';
      setImage(val);
    }
  }, [selectedImage]);


  return (
    <div className={`flex flex-col gap-2 justify-center items-start ${className}`}>
      {label && <p className="font-medium text-sm text-gray-700">{label}</p>}

      <div className="flex flex-wrap gap-3 items-center">

        {multiple && (

          selectedImage.map((img, idx) => (
            <div
              key={idx}
              className={`relative group ${currentSize.wrapper} rounded-md border border-gray-300 bg-white`}
            >
              <img
                src={img}
                alt={`Uploaded-${idx}`}
                onError={() => handleImageRemove(img)}
                className="object-contain w-full h-full rounded-md"
              />
              <button
                data-tooltip-id={`remove-${idx}`}
                data-tooltip-content="Remove Image"
                onClick={(e) => {
                  e.stopPropagation();
                  handleImageRemove(img);
                }}
                className={`absolute z-20 top-[-8px] right-[-8px] rounded-full text-white bg-red-500 ${currentSize.close}`}
              >
                <IoMdClose />
                <Tooltip id={`remove-${idx}`} className="!text-[10px]" />
              </button>
            </div>
          ))
        )}


        {/* Upload box */}
        <div
          role="button"
          tabIndex={0}
          onClick={handleClick}
          onKeyDown={(e) => e.key === "Enter" && handleClick()}
          className={`relative group ${currentSize.wrapper} rounded-md cursor-pointer border border-dashed border-gray-500 bg-gray-100 flex items-center justify-center`}
        >
          {(!multiple && selectedImage.length > 0) ? (
            <>
              <img
                src={selectedImage[0]}
                alt="Uploaded"
                onError={() => handleImageRemove(selectedImage[0])}
                className="object-contain w-full h-full rounded-md"
              />
              <button
                data-tooltip-id={`remove`}
                data-tooltip-content="Remove Image"
                onClick={(e) => {
                  e.stopPropagation();
                  handleImageRemove(selectedImage[0]);
                }}
                className={`absolute z-20 top-[-8px] right-[-8px] rounded-full text-white bg-red-500 ${currentSize.close}`}
              >

                <IoMdClose />
                <Tooltip id={`remove`} className="!text-[10px]" />
              </button>
            </>
          ) : (
            <HiOutlineUpload className={`text-gray-600 ${currentSize.icon}`} />
          )}
        </div>
      </div>

      <ImageSelectorModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        multiple={multiple}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
    </div>
  );
};

export default ImageSelector;
