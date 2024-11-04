"use client";

import Header from "@/components/Header";
import Loader from "@/components/loader";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ProtectedRoute = (WrappedComponent) => {
  return () => {
    const { currUser, loading } = useSelector((state) => state.currentUser);
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    if (loading) {
      return <Loader />;
    }

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };

    if (currUser) {
      return (
        <div className="flex h-[calc(100vh-50px)]">
          <Sidebar isOpen={isSidebarOpen} />
          <div className="w-full flex justify-end">
            <Header toggleSidebar={toggleSidebar} />
            <div
              className={`${
                !isSidebarOpen ? "w-[calc(100%-250px)]" : "w-full"
              } mt-[50px] h-[100%] overflow-scroll no-scrollbar`}
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
