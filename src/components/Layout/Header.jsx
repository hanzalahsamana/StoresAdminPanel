"use client";
import { useSelector } from "react-redux";
import { Base_Domain, HTTP } from "../../../config";
import PopupMenu from "../Modals/PopupMenu";
import { IoEyeOutline } from "react-icons/io5";


export default function Header({ toggleSidebar }) {
  const { currUser } = useSelector((state) => state.currentUser);

  return (
    <header className="bg-backgroundC border-b border-gray-300 px-3 md:px-10 text-textC flex justify-between items-center fixed w-full z-10 top-0 left-0 h-[60px]">
      <button onClick={toggleSidebar} className="text-textC focus:outline-none text-2xl font-semibold ">
        Multi Nest
      </button>
      <div className="flex items-center ">

        <a target="_blank" href={`${HTTP}${currUser?.subDomain || currUser?.brandName}.${Base_Domain}`} className="flex gap-1 text-[20px] items-center cursor-pointer px-[10px] rounded-md py-[7px] hover:opacity-80">
          <IoEyeOutline />
          <span className="sm:flex hidden text-[14px]" >
            view store
          </span>
        </a>
        <PopupMenu />
      </div>

    </header>
  );
}
