"use client";
import { placeholderImageUrl } from "@/Structure/DefaultStructures";
import React, { useState, useEffect, forwardRef } from "react";

const Hero = forwardRef(({ sectionData, ...rest }, ref) => {
  const { image } = sectionData;

  const [videoSrc, setVideoSrc] = useState("/videos/WebsiteBannerVideo.mp4");
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

  return (
    <div {...rest} ref={ref} className="">
      {!isImageBroken && image ? (
        <img
          className="w-full h-full max-h-[100vh] bg-cover object-cover"
          src={image}
          alt={"Hero Banner"}
          onError={() => setIsImageBroken(true)}
        />
      ) : (
        <img
          className="w-full h-full max-h-[100vh] bg-cover object-cover"
          src={placeholderImageUrl}
          alt={"Hero Banner"}
        />
      )}
    </div>
  );
});

export default Hero;
