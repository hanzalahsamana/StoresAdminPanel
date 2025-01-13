import Link from "next/link";
import { useEffect } from "react";

function Sidebar({ isOpen, setIsOpen }) {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <aside
      className={`bg-[#071f28] text-white w-[250px] h-[calc(100vh-50px)] space-y-6 absolute inset-y-0 top-[50px] left-0 transform transition duration-200 ease-in-out z-10
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
    `}
    >
      <Link
        href="#"
        className="text-white text-2xl font-semibold block px-4 border-b py-4"
      >
        Admin Pannel
      </Link>
      <nav>
        <Link
          href="/"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
        >
          Dashboard
        </Link>
        <Link
          href={"/productsList"}
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
        >
          Products
        </Link>
        <Link
          href={"/categories"}
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
        >
          Categories
        </Link>
        <Link
          href={"/ordersList"}
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
        >
          Orders
        </Link>
        {/* <Link
          href={"/analytics"}
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
        >
          Analytics
        </Link> */}
        {/* <Link
          href={"/media"}
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
        >
          Media
        </Link> */}
        <Link
          href={"/content"}
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
        >
          Contents
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;
