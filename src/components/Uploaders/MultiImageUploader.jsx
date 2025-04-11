import { useEffect, useState } from "react";
import { CiCamera } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { Tooltip } from "react-tooltip";

const MultiImageUploader = ({
    images,
    setImages,
    label = "Upload Images",
    error = "",
    accept = ["image/jpeg", "image/png", "image/webp", "image/gif"],
    validityText = "min 1",
}) => {

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        let validImages = [];

        files.forEach((file) => {
            validImages.push(file);
        });

        setImages([...(images || []), ...validImages]);
    };

    const handleRemoveImage = (index) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
    };

    useEffect(() => console.log(images, "👍l"), [images])

    return (
        <div className="flex flex-col gap-6 justify-center items-start w-full">
            <div className="flex w-full gap-3">
                <div
                    onClick={() => document.getElementById("multiFileInput").click()}
                    className="flex mt-[10px] flex-col justify-center items-center border border-primaryC bg-secondaryC min-w-[100px] min-h-[100px] cursor-pointer">

                    <CiCamera className={'text-[50px] text-textTC opacity-40'} />
                    <p className="text-textTC font-[inter] opacity-80 text-center text-[12px] ">Upload images</p>

                </div>



                <input
                    id="multiFileInput"
                    type="file"
                    accept={accept.join(",")}
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                />



                <div className="flex flex-1 pt-[10px] overflow-x-auto w-[300px] customScroll">
                    <div className="flex gap-2">

                        {images?.map((image, index) => (
                            <div key={index} className="relative w-[100px] h-[100px]">
                                <img
                                    src={image instanceof File || image instanceof Blob
                                        ? URL.createObjectURL(image)
                                        : image}
                                    alt={`Selected ${index}`}
                                    className="w-[100px] h-[100px] bg-transparent object-cover border border-solid border-borderC rounded-sm"
                                />
                                <button
                                    data-tooltip-id="my"
                                    data-tooltip-content="Remove Image"
                                    onClick={() => handleRemoveImage(index)}
                                    className="absolute z-20 top-[-8px] right-[-8px] rounded-full text-white bg-red-500 text-[12px] p-1"
                                >
                                    <IoMdClose />
                                    <Tooltip className="!text-[8px]" id="my" />
                                </button>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            {error && <p className="text-red-500 mt-[3px]  text-xs">{error}</p>}


        </div>
    );
};

export default MultiImageUploader;
