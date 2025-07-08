// components/LivePreviewIframe.jsx
import { useEffect, useRef, useState } from "react";
import { devices } from "@/Structure/DefaultStructures";

export default function LivePreviewIframe({ previewData, selectedDevicePreview }) {
    const iframeRef = useRef(null);
    const resizeRef = useRef(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        if (!resizeRef.current) repointerturn;

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


    useEffect(() => {
        if (iframeRef.current?.contentWindow) {
            iframeRef.current.contentWindow.postMessage(
                {
                    type: "UPDATE_PREVIEW",
                    payload: previewData,
                },
                "*"
            );
        }
    }, [previewData]);

    return (
        <div ref={resizeRef} className=" w-full h-[calc(100vh_-_120px)] flex justify-center items-center overflow-hidden">
            <div
                style={{
                    width: `${devices?.[selectedDevicePreview]?.targetWidth * scale}px`,
                    height: `${devices?.[selectedDevicePreview]?.targetHeight * scale}px`,
                }}
                className=" w-max h-max relative overflow-hidden">

                <div
                    className=" bg-300 h-[calc(100vh_-_120px)] w-full  relative  origin-top-left transition-all duration-75"
                    style={{ transform: `scale(${scale})` }}>

                    <iframe
                        ref={iframeRef}
                        src="/admin/68416a1bd4645140e49c62d8/live-previeww"
                        className={`${devices?.[selectedDevicePreview]?.render} origin-top-left `}
                    />

                    <div className={`${devices?.[selectedDevicePreview]?.frame}  pointer-events-none absolute top-0 left-0 origin-top-left`}>
                    </div>

                </div>
            </div>
        </div>
    );
};