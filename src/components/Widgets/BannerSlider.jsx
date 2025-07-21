"use client";

import { useState, useEffect, useRef, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { useSwipeable } from "react-swipeable";

const BannerSlider = forwardRef(({ sectionData, duration = 400, autoRun = true, interval = 3500, ...rest }, ref) => {

    const { imagesUrl } = sectionData
    const [currentIndex, setCurrentIndex] = useState(0);
    const [images, setImages] = useState([]);
    const [direction, setDirection] = useState(1);
    const [failedImages, setFailedImages] = useState(new Set());
    const isCooldown = useRef(false);

    useEffect(() => {
        if (Array.isArray(imagesUrl)) {
            setImages(imagesUrl);
        }
    }, [imagesUrl]);

    useEffect(() => {
        if (!autoRun || images.length <= 1) {
            setCurrentIndex(0);
            return;
        }

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

    const handlers = useSwipeable({
        onSwipedLeft: () => handleSlide("next"),
        onSwipedRight: () => handleSlide("prev"),
        trackMouse: true,
    });

    const handleImageError = (url) => {
        setFailedImages(prev => new Set(prev).add(url));
    };

    const currentImage = images[currentIndex];
    const isImageValid = currentImage && !failedImages.has(currentImage);

    return (
        <div {...rest} ref={ref} className="relative h-[calc(100vh_-_60px)] max-h-[1000px] w-full overflow-hidden">
            <div className="relative w-full h-full flex items-center justify-center" {...handlers}>
                {images.length === 0 ? (
                    <div className="absolute w-full h-full flex items-center justify-center bg-gray-500 text-white">
                        <p className="text-xl">No image selected</p>
                    </div>
                ) : !isImageValid ? (
                    <div className="absolute w-full h-full flex items-center justify-center bg-gray-300 text-gray-700">
                        <p className="text-lg">Slide Image Not Availabel</p>
                    </div>
                ) : (
                    <AnimatePresence mode="popLayout" custom={direction}>
                        <motion.img
                            key={currentIndex}
                            src={currentImage}
                            alt={`Slide ${currentIndex}`}
                            className="absolute w-full h-full object-cover"
                            initial={{ x: direction * 100 + "%", opacity: 1 }}
                            animate={{ x: "0%", opacity: 1 }}
                            exit={{ x: -direction * 100 + "%", opacity: 1 }}
                            transition={{ duration: duration / 1000, ease: "easeInOut" }}
                            onError={() => handleImageError(currentImage)}
                        />
                    </AnimatePresence>
                )}
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
})

export default BannerSlider;
