import Link from "next/link";
import { useEffect } from "react";

function Sidebar({ isOpen, setIsOpen }) {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        console.log("hello world>>>>>");
        setIsOpen(true);
      } else {
        console.log("hello world");
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
      className={`bg-[#293438] text-white w-[250px] h-[calc(100vh-50px)] space-y-6 absolute inset-y-0 top-[50px] left-0 transform transition duration-200 ease-in-out z-10
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
          href={"/ordersList"}
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
        >
          Orders
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;
