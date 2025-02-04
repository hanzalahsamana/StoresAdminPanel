import { useState } from "react";

const MultiImageUploader = ({
    images,
    setImages,
    label = "Upload Images",
    error = "",
    accept = ["image/*"],
    validityText = "min 1",
}) => {

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        let validImages = [];

        files.forEach((file) => {
            validImages.push(file);
        });

        setImages((prevImages) => [...prevImages, ...validImages]);
    };

    const handleRemoveImage = (index) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
    };

    return (
        <div className="">
            <div className="flex h-24 items-center gap-2">

                <label className="flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg p-3 cursor-pointer hover:bg-gray-100 transition duration-300">

                    <span className="text-gray-600 text-[10px] text-center ">
                        {label} ({validityText})
                    </span>

                    <input
                        type="file"
                        accept={accept.join(",")}
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                    />
                </label>



                <div className="flex gap-2 overflow-auto">
                    {images.map((image, index) => (
                        <div key={index} className="relative w-24 h-24">
                            <img
                                src={typeof image === "string" ? image : URL.createObjectURL(image)}
                                alt={`Selected ${index}`}
                                className="w-24 h-24 object-cover rounded-md"
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveImage(index)}
                                className="absolute top-0 right-0 bg-black w-5 h-5 text-white rounded-full"
                            >
                                &times;
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
