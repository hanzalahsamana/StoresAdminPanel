"use client";
import { useSelector } from "react-redux";
import { Base_Domain, HTTP } from "../../../config";
import PopupMenu from "../Modals/PopupMenu";
import { IoEyeOutline } from "react-icons/io5";
import logo from "../../Assets/Images/logo.png";
import PopupMenu2 from "../Modals/PopupMenu2";

export default function Header({ toggleSidebar }) {
  const { currUser } = useSelector((state) => state.currentUser);
  const { store } = useSelector((state) => state.store);

  return (
    <header className="bg-backgroundC border-b border-gray-300 px-3 md:px-10 text-textC flex justify-between items-center fixed w-full z-[110] top-0 left-0 h-[60px]">
      <button onClick={toggleSidebar} className="text-black  flex justify-center items-center gap-2 focus:outline-none text-xl  font-semibold ">
        <img src={logo?.src} alt="" className="w-12" />
        Multi Tenant
      </button>
      <div className="flex items-center gap-2 ">

        <a target="_blank" href={`${HTTP}${store?.subDomain}.${Base_Domain}`} className="flex gap-2 text-[18px] items-center cursor-pointer px-[10px] rounded-md py-[7px] bg-gray-200 font-medium">
          <IoEyeOutline />
          <span className="sm:flex hidden text-[15px]" >
            view your store
          </span>
        </a>
        <PopupMenu />
        <PopupMenu2 />
      </div>

    </header>
  );
}
