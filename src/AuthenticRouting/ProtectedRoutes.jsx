"use client";

import Header from "@/components/Layout/Header";
import Loader from "@/components/Loader/loader";
import Sidebar from "@/components/Layout/Sidebar";
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
        <div className="flex h-[calc(100vh-60px)]">
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
          <div className="w-full flex justify-end">
            <Header toggleSidebar={toggleSidebar} />
            <div
              className={`${isSidebarOpen ? "lg:w-[calc(100%-230px)]" : "lg:w-full"
                } w-full mt-[60px] h-[100%] transition-all duration-200 ease-in-out overflow-scroll no-scrollbar bg-lbgC`}
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
