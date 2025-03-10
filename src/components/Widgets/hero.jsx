"use client";
import { selectPageByType } from "@/Redux/PagesData/PagesDataSlice";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Hero = ({content}) => {

  const [videoSrc, setVideoSrc] = useState("/videos/WebsiteBannerVideo.mp4");

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
    <div className="h-[100vh] max-h-[900px]">
      {/* <video className="w-full h-full bg-cover object-cover" playsInline autoPlay loop muted>
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video> */}

      <img className="w-full h-full bg-cover object-cover" src={content?.image} alt={content?.title} />
    </div>
  );
};

export default Hero;
