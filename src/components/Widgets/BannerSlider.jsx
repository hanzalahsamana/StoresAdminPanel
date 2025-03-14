"use client";

import { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";

function BannerSlider({ content }) {
    const [images, setImages] = useState([]);

    useEffect(() => {
        if (Array.isArray(content?.imagesUrl)) {
            setImages(content.imagesUrl.map(image => 
                (image instanceof File || image instanceof Blob) ? URL.createObjectURL(image) : image
            ));
        }
    }, [content]);

    return (
        <Carousel pause={false}  controls indicators interval={2500} className="h-[calc(100vh_-_75px)] overflow-hidden">
            {images.length > 0 ? (
                images.map((image, index) => (
                    <Carousel.Item interval={2500} key={index}>
                        <img
                            className="w-full h-[calc(100vh_-_75px)] object-cover"
                            src={image}
                            alt={`Slide ${index}`}
                        />
                    </Carousel.Item>
                ))
            ) : (
                <Carousel.Item>
                    <div className="flex justify-center items-center h-[calc(100vh_-_75px)] bg-gray-200">
                        No images available
                    </div>
                </Carousel.Item>
            )}
        </Carousel>
    );
}

export default BannerSlider;
