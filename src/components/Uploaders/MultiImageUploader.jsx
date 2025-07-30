import { useEffect } from "react";
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

    return (
        <div className="flex flex-col justify-center items-start w-full">
            <div className="flex w-full gap-3">
                <input
                    id="multiFileInput"
                    type="file"
                    accept={accept.join(",")}
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                />



                <div className="flex flex-wrap gap-2 w-full">
                    <div
                        onClick={() => document.getElementById("multiFileInput").click()}
                        className="flex flex-col justify-center items-center border-2 border-primaryC bg-secondaryC min-w-[100px] min-h-[100px] cursor-pointer">

                        <CiCamera className={'text-[50px] text-primaryC font-bold '} />
                        <p className="text-primaryC  text-center text-[12px] ">Upload images</p>

                    </div>

                    {images?.map((image, index) => (
                        <div key={index} className="relative w-[100px] h-[100px] group">
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
                                className="absolute top-[-8px] right-[-8px] rounded-full text-backgroundC bg-red-500 text-[10px] p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            >
                                <IoMdClose />
                                <Tooltip className="!text-[8px]" id="my" />
                            </button>
                        </div>

                    ))}

                </div>
            </div>

            {error && <p className="text-red-500 mt-[3px]  text-xs">{error}</p>}


        </div>
    );
};

export default MultiImageUploader;
