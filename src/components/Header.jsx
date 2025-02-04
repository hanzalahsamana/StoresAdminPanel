"use client";
import { setLogout } from "@/Redux/Authentication/AuthSlice";
import Link from "next/link";
import { useState } from "react";
import { CiLogout, CiSettings } from "react-icons/ci";
import { HiOutlineUser } from "react-icons/hi2";
import { MdRemoveRedEye } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { FiLogOut } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";


export default function Header({ toggleSidebar }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { currUser, loading } = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(setLogout());
  };
  return (
    <header className="bg-backgroundC border-b border-gray-300 px-10 text-textC flex justify-between items-center fixed w-full z-10 top-0 left-0 h-[60px]">
      <button onClick={toggleSidebar} className="text-textC focus:outline-none text-2xl font-semibold ">
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg> */}
        Multi Nest
      </button>
      <div className="flex items-center gap-4">

        {/* <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <span>{currUser?.brandName}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-[120px] overflow-hidden bg-[#454545dc] text-backgroundC rounded-lg shadow-lg">
              <Link href="#" className="block px-4 py-2 hover:bg-[#454545c4]">
                Profile
              </Link>
              <Link href="#" className="block px-4 py-2 hover:bg-[#454545c4]">
                Settings
              </Link>
              <Link
                href="/"
                className="block px-4 py-2 hover:bg-[#454545c4]"
                onClick={() => logout()}
              >
                Logout
              </Link>
            </div>
          )}
        </div> */}
        <a target="_blank" href={`${currUser?.brandName}`} className="flex gap-2 items-center text-primaryC cursor-pointer bg-secondaryC px-[18px] rounded-md py-[7px] hover:opacity-80">
          <MdRemoveRedEye />
          View Store
        </a>
        <a target="_blank" href={`${currUser?.brandName}`} className="cursor-not-allowed flex gap-2 items-center text-primaryC  bg-secondaryC px-[18px] rounded-md py-[7px] hover:opacity-80">
        <FaRegUser />
          {currUser?.brandName}
          
        </a>
        <a target="_blank" href={`${currUser?.brandName}`} className="cursor-not-allowed text-[25px]">
        <CiSettings />
        
        </a>
        <p onClick={() => logout()} className="text-[25px] cursor-pointer hover:text-[red]">
        <CiLogout />
        </p>
      </div>

    </header>
  );
}
