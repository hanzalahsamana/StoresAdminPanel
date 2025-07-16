"use client";
import { useSelector } from "react-redux";
import { Base_Domain, HTTP } from "../../../config";
import PopupMenu from "../Modals/PopupMenu";
import { IoEyeOutline } from "react-icons/io5";
import logo from "../../Assets/Images/logo.png";

export default function Header({ toggleSidebar }) {
  const { currUser } = useSelector((state) => state.currentUser);
  const { store } = useSelector((state) => state.store);

  return (
    <header className="bg-backgroundC border-b border-gray-300 px-3 md:px-10 text-textC flex justify-between items-center fixed w-full z-[110] top-0 left-0 h-[60px]">
      <button onClick={toggleSidebar} className="text-black  flex justify-center items-center gap-2 focus:outline-none text-xl  font-semibold ">
        <img src={logo?.src} alt="" className="w-12" />
        Multi Tenant
      </button>
      <div className="flex items-center ">

        <a target="_blank" href={`${HTTP}${store?.subDomain}.${Base_Domain}`} className="flex gap-1 text-[20px] items-center cursor-pointer px-[10px] rounded-md py-[7px] hover:opacity-80">
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
