"use client";
import { setCurrentUser } from "@/Redux/Authentication/AuthSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Header from "./Header";
import Sidebar from "./Sidebar";

const ProviderWrap = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    dispatch(setCurrentUser(user));
  }, [dispatch]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
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
          {children}
        </div>
      </div>
    </div>
  );
};

export default ProviderWrap;
