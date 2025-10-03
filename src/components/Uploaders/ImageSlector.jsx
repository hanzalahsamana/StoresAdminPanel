'use client';
import { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { Tooltip } from 'react-tooltip';
import { HiOutlineUpload } from 'react-icons/hi';
import ImageSelectorModal from '../Modals/ImageSelectorModal';

const sizeClasses = {
  small: {
    wrapper: 'w-[40px] h-[40px]',
    icon: 'text-[15px]',
    close: 'text-[10px] p-0.5',
  },
  medium: {
    wrapper: 'w-[60px] h-[60px]',
    icon: 'text-[25px]',
    close: 'text-[10px] p-1',
  },
  large: {
    wrapper: 'w-[100px] h-[100px]',
    icon: 'text-[40px]',
    close: 'text-[10px] p-1',
  },
  xlarge: {
    wrapper: 'w-[160px] h-[160px]',
    icon: 'text-[70px]',
    close: 'text-[14px] p-1',
  },
};

const ImageSelector = ({ image = '', setImage = () => {}, label = 'Upload Image', size = 'small', className = '', multiple = true, error = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentSize = sizeClasses[size] || sizeClasses.small;

  const handleClick = () => setIsOpen(true);

  const handleImageRemove = (imgToRemove) => {
    if (multiple) {
      const arr = Array.isArray(image) ? image : typeof image === 'string' && image ? [image] : [];
      const updated = arr.filter((img) => img !== imgToRemove);
      setImage(updated);
    } else {
      setImage('');
    }
  };

  return (
    <div className={`flex flex-col gap-2 justify-center items-start ${className}`}>
      {label && <label className="text-[15px] font-medium text-textC  mb-1 block">{label}</label>}

      <div className="flex flex-wrap gap-3 items-start">
        {multiple &&
          image.map((img, idx) => {
            return (
              <div key={idx} className={`relative group ${currentSize.wrapper} rounded-md border border-gray-300 bg-white`}>
                <img src={img} alt={`Uploaded-${idx}`} onError={() => handleImageRemove(img)} className="object-contain w-full h-full rounded-md" />
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
            );
          })}

        {/* Upload box */}
        <div
          role="button"
          tabIndex={0}
          onClick={handleClick}
          onKeyDown={(e) => e.key === 'Enter' && handleClick()}
          className={`relative group ${currentSize.wrapper} rounded-md cursor-pointer border border-dashed border-gray-500 bg-gray-100 flex items-center justify-center`}
        >
          {!multiple && image ? (
            <>
              <img src={image} alt="Uploaded" onError={() => handleImageRemove(image)} className="object-contain w-full h-full rounded-md" />
              <button
                data-tooltip-id={`remove`}
                data-tooltip-content="Remove Image"
                onClick={(e) => {
                  e.stopPropagation();
                  handleImageRemove(image);
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
      {error && <p className="text-sm text-red-600">{error}</p>}

      <ImageSelectorModal isOpen={isOpen} setIsOpen={setIsOpen} multiple={multiple} selectedImage={image} setSelectedImage={setImage} />
    </div>
  );
};

export default ImageSelector;
