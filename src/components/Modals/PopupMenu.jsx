import { setLoading, setLogout } from "@/Redux/Authentication/AuthSlice";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { FaRegUser } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { IoBagAddOutline } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";

const PopupMenu = () => {
  const { allStores } = useSelector((state) => state.allStores);

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const currStore = useSelector((state) => state.store.store);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(setLoading(true));
    dispatch(setLogout());
    dispatch(setLoading(false));
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef} className="relative inline-block text-gray-700">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex gap-2 items-center text-primaryC bg-secondaryC px-[18px] rounded-md py-[7px] hover:opacity-80 cursor-pointer transition-all ease-in-out duration-300 ${isOpen ? "scale-105 shadow-am" : "scale-100"
          }`}
      >
        <FaRegUser />
        {currStore?.storeName}
        <IoIosArrowDown className={`text-[12px] transition-all ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
      </button>

      {isOpen && (
        <nav
          className="w-max min-w-[120px] mt-[5px]  absolute p-2.5 bg-backgroundC text-gray-700 font-sans rounded-lg shadow-md border border-gray-300 transition-transform duration-300 transform scale-100 opacity-100"
        >
          <legend className="text-gray-500 text-[10px] font-semibold py-1">
            Switch  Stores
          </legend>
          <ul className="list-none p-0 m-0">
            {allStores?.map((store) => {
              if (store._id === currStore._id) return null;
              return (
                <li key={store._id}>
                  <Link
                    href={`/admin/${store._id}`}
                    className="flex items-center px-2 py-2 w-full text-[14px] rounded-md hover:bg-secondaryC hover:text-primaryC transition-all"
                  >
                    <FaRegUser className="text-primaryC mr-2" />
                    {store.storeName}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link href={'/admin/stores'} className="flex items-center px-2 py-2 w-full text-[14px] rounded-md hover:bg-secondaryC hover:text-primaryC transition-all">
                <IoBagAddOutline className="text-primaryC mr-2" />
                Create Store
              </Link>
            </li>
            <li>
              <Link href={'#'} onClick={() => logout()} className="flex items-center px-2 py-2 w-full text-[14px] rounded-md hover:bg-secondaryC hover:text-primaryC transition-all">
                <TbLogout2 className="text-primaryC mr-2" />
                Logout
              </Link>
            </li>
            {/* <li>
              <button className="flex items-center px-2 py-2 w-full text-[14px] rounded-md hover:bg-secondaryC hover:text-primaryC transition-all">
                <CiSettings className="text-primaryC mr-2" />
                Setting
              </button>
            </li>
            <li>
              <button className="flex items-center px-2 py-2 w-full text-[14px] rounded-md hover:bg-secondaryC hover:text-primaryC transition-all">
                <LuUserCog className="text-primaryC mr-2" />
                Profile
              </button>
            </li> */}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default PopupMenu;