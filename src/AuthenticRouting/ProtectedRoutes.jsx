"use client";

import Header from "@/components/Header";
import Loader from "@/components/loader";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";

const ProtectedRoute = (WrappedComponent) => {
  return () => {
    const { currUser, loading } = useSelector((state) => state.currentUser);
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    if (loading) {
      return <Loader />;
    }

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };

    if (currUser) {
      return (
        <div className="flex h-[calc(100vh-50px)]">
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
          <div className="w-full flex justify-end">
            <Header toggleSidebar={toggleSidebar} />
            <div
              className={`${isSidebarOpen ? "lg:w-[calc(100%-250px)]" : "lg:w-full"
                } w-full mt-[60px] h-[100%] overflow-scroll no-scrollbar bg-[#06a4a712]`}
            >
              <WrappedComponent />
            </div>
          </div>
        </div>
      );
    }

    return router.push("/authentication/login");
  };
};

export default ProtectedRoute;
