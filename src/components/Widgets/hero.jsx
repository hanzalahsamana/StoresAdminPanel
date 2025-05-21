"use client";
import React, { useState, useEffect } from "react";

const Hero = ({ content }) => {
  const [videoSrc, setVideoSrc] = useState("/videos/WebsiteBannerVideo.mp4");
  const [imgSrc, setImgSrc] = useState("");
  const [isImageBroken, setIsImageBroken] = useState(false);

  useEffect(() => {
    const updateVideoSrc = () => {
      if (window.innerWidth <= 550) {
        setVideoSrc("/videos/MobileBannerVideo.mp4");
      } else {
        setVideoSrc("/videos/WebsiteBannerVideo.mp4");
      }
    };

    updateVideoSrc();
    window.addEventListener("resize", updateVideoSrc);
    return () => window.removeEventListener("resize", updateVideoSrc);
  }, []);

  useEffect(() => {
    if (content?.image && typeof content.image === "object") {
      setImgSrc(URL.createObjectURL(content.image));
    } else {
      setImgSrc(content?.image);
    }
  }, [content]);

  const handleImageError = () => {
    setIsImageBroken(true);
  };

  return (
    <div className="h-[100vh] max-h-[900px]">
      {!isImageBroken && imgSrc ? (
        <img
          className="w-full h-full bg-cover object-cover"
          src={imgSrc}
          alt={content?.title || "Banner"}
          onError={handleImageError}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-600 text-xl">
          Banner Image Not Found
        </div>
      )}
    </div>
  );
};

export default Hero;
