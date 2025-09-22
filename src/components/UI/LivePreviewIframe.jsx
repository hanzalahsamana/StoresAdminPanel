"use client";

// components/LivePreviewIframe.jsx
import { useEffect, useRef, useState } from "react";
import { devices } from "@/Structure/DefaultStructures";
import { useSelector } from "react-redux";
import { Base_Domain, HTTP } from "../../../config";

export default function LivePreviewIframe({ previewData }) {
    const iframeRef = useRef(null);
    const resizeRef = useRef(null);
    const [iframeLoaded, setIframeLoaded] = useState(false);
    const [scale, setScale] = useState(1);
    const { selectedDevicePreview } = useSelector((state) => state.livePreview);
    const { store } = useSelector((state) => state.store);


    useEffect(() => {
        if (!resizeRef.current) repointerturn;

        if (selectedDevicePreview === 'full') return setScale(1);

        const observer = new ResizeObserver((entries) => {
            for (let entry of entries) {
                const { width, height } = entry.contentRect;
                const targetWidth = devices?.[selectedDevicePreview]?.targetWidth;
                const targetHeight = devices?.[selectedDevicePreview]?.targetHeight;
                const maxScale = devices?.[selectedDevicePreview]?.maxScale;

                const scaleFactor = Math.min(width / targetWidth, height / targetHeight, maxScale); // max 1
                setScale(scaleFactor);
            }
        });

        observer.observe(resizeRef.current);

        return () => observer.disconnect();
    }, [selectedDevicePreview]);

    const sentMessageToIframe = () => {
        if (iframeRef.current?.contentWindow) {
            iframeRef.current.contentWindow.postMessage(
                {
                    type: "UPDATE_PREVIEW",
                    payload: previewData,
                },
                "*"
            );
        };
    };


    useEffect(() => {
        sentMessageToIframe()
    }, [previewData, iframeLoaded]);

    useEffect(() => {
        const handleMessage = (e) => {
            if (e.data?.type === "IFRAME_READY") {
                setIframeLoaded(true);
            }
        };
        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, []);

    return (
        <div ref={resizeRef} className=" w-full h-[calc(100vh_-_60px)] flex justify-center items-center overflow-hidden">
            <div
                style={{
                    width: selectedDevicePreview === "full"
                        ? '100%'
                        : `${devices?.[selectedDevicePreview]?.targetWidth * scale}px`,
                    height: selectedDevicePreview === "full"
                        ? '100%'
                        : `${devices?.[selectedDevicePreview]?.targetHeight * scale}px`,
                }}
                className=" w-max h-max relative overflow-hidden">

                <div
                    className=" bg-300 h-[calc(100vh_-_60px)] w-full  relative  origin-top-left"
                    style={{ transform: `scale(${scale})` }}>

                    <iframe
                        ref={iframeRef}
                        src={`${HTTP}${Base_Domain}/admin/${store?.id}/live-previeww"`}
                        className={`${devices?.[selectedDevicePreview]?.render} origin-top-left `}
                    />

                    <div className={`${devices?.[selectedDevicePreview]?.frame}  pointer-events-none absolute top-0 left-0 origin-top-left`}>
                    </div>

                </div>
            </div>
        </div>
    );
};