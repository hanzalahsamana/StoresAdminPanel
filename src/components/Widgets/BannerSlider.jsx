"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

function BannerSlider({
    content,
    duration = 400,   // Slide transition duration in ms
    autoRun = true,   // Auto-slide enable/disable
    interval = 3500   // Auto-slide interval time in ms
}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [images, setImages] = useState([]);
    const [direction, setDirection] = useState(1);
    const isCooldown = useRef(false);

    useEffect(() => {
        if (Array.isArray(content?.imagesUrl)) {
            setImages(content.imagesUrl.map((image) =>
                image instanceof File || image instanceof Blob ? URL.createObjectURL(image) : image
            ));
        }
    }, [content]);

    useEffect(() => {
        if (!autoRun || images.length <= 1) return;

        const slideInterval = setInterval(() => {
            if (!isCooldown.current) {
                handleSlide("next");
            }
        }, interval);

        return () => clearInterval(slideInterval);
    }, [images, autoRun, interval]);

    const handleSlide = (action) => {
        if (isCooldown.current) return;
        isCooldown.current = true;

        setDirection(action === "next" ? 1 : -1);
        setCurrentIndex((prev) =>
            action === "next"
                ? (prev + 1) % images.length
                : (prev - 1 + images.length) % images.length
        );

        setTimeout(() => (isCooldown.current = false), duration);
    };

    return (
        <div className="relative h-[calc(100vh_-_60px)] w-full overflow-hidden">
            <div className="relative w-full h-full flex items-center justify-center">
                <AnimatePresence mode="popLayout" custom={direction}>
                    {images.length > 0 && (
                        <motion.img
                            key={currentIndex}
                            src={images[currentIndex]}
                            alt={`Slide ${currentIndex}`}
                            className="absolute w-full h-full object-cover"
                            initial={{ x: direction * 100 + "%", opacity: 1 }}
                            animate={{ x: "0%", opacity: 1 }}
                            exit={{ x: -direction * 100 + "%", opacity: 1 }}
                            transition={{ duration: duration / 1000, ease: "easeInOut" }}
                        />
                    )}
                </AnimatePresence>
            </div>

            {images.length > 1 && (
                <>
                    <button
                        onClick={() => handleSlide("prev")}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full text-[30px] text-[#f0eeee]"
                    >
                        <SlArrowLeft />
                    </button>
                    <button
                        onClick={() => handleSlide("next")}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full text-[30px] text-[#f0eeee]"
                    >
                        <SlArrowRight />
                    </button>
                </>
            )}
        </div>
    );
}

export default BannerSlider;
