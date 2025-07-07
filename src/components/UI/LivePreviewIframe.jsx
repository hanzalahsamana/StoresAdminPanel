// components/LivePreviewIframe.jsx
import { useEffect, useRef, useState } from "react";

export default function LivePreviewIframe({ previewData }) {
    const iframeRef = useRef(null);
    const resizeRef = useRef(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const handleResize = () => {
            if (resizeRef.current) {
                const { width, height } = resizeRef.current.getBoundingClientRect();
                const scaleo = Math.min(width / 1024, height / 1024)
                setScale(scaleo)
                console.log('w', width, 'h', height);
            }
        };

        handleResize(); // call once
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // useEffect(() => {
    //     const handleResize = () => {
    //         const baseWidth = 1024;
    //         const padding = 40;
    //         const availableWidth = 580 - padding;
    //         const newScale = Math.min(1, availableWidth / baseWidth);
    //         setScale(newScale);
    //     };

    //     handleResize(); // Initial
    //     window.addEventListener("resize", handleResize);
    //     return () => window.removeEventListener("resize", handleResize);
    // }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            if (iframeRef.current?.contentWindow) {
                iframeRef.current.contentWindow.postMessage(
                    {
                        type: "UPDATE_PREVIEW",
                        payload: previewData,
                    },
                    "*"
                );
            }
        }, 300); // sends update every 300ms (or use debounce if needed)

        return () => clearInterval(timer);
    }, [previewData]);

    return (
        // <div className={`  overflow-visible   ${true ? 'w-[1280px] scale-[0.32] left-[30px] top-[220px] absolute h-[calc(((100vh-100px)/34)*100)]  ' : ''} origin-top-left`}>



        <div ref={resizeRef} className="w-full h-full bg-green-300 overflow-hidden relative">

            <div className="">
                <iframe
                    ref={iframeRef}
                    src="/admin/68416a1bd4645140e49c62d8/live-previeww"
                    style={{ pointerEvents: "auto", transform: `scale(${scale})` }}
                    className="!w-[1024px]  cale-[0.526] h-[626px] origin-top-left mt-[2.9%] ml-[11.8%]"
                />
            </div>

            <div className="LaptopFrameCover2 no-scrollbar absolute top-0 left-0">
            </div>

        </div>
    );
}
