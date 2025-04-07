import { setOffline, setOnline } from "@/Redux/Network/networkSlice";
import { useEffect, useState } from "react";
import { MdOutlineErrorOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

const NetworkStatus = () => {
    const dispatch = useDispatch();
    const isOnline = useSelector((state) => state.network.isOnline);

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        const handleOnline = () => dispatch(setOnline());
        const handleOffline = () => dispatch(setOffline());

        if (typeof window !== "undefined") {
            if (navigator.onLine) {
                dispatch(setOnline());
            } else {
                dispatch(setOffline());
            }

            window.addEventListener("online", handleOnline);
            window.addEventListener("offline", handleOffline);

            return () => {
                window.removeEventListener("online", handleOnline);
                window.removeEventListener("offline", handleOffline);
            };
        }
    }, [dispatch]);

    if (!isMounted) {
        return null;
    }

    if (!isOnline) {
        return (
            <div className="fixed bottom-0 w-full flex gap-2 justify-center items-center bg-red-500 text-white text-center p-2 z-[200]">
                No internet connection. Please check your network.<MdOutlineErrorOutline />
            </div>
        )
    }

    return null;
};

export default NetworkStatus;
