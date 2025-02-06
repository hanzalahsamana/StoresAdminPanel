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
        Multi Nest
      </button>
      <div className="flex items-center gap-4">

        <a target="_blank" href={`/${currUser?.brandName}`} className="flex gap-2 items-center text-primaryC cursor-pointer bg-secondaryC px-[18px] rounded-md py-[7px] hover:opacity-80">
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
