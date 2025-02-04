import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { GrDeliver } from "react-icons/gr";
import { IoHomeOutline, IoShirtOutline } from "react-icons/io5";
import { TfiWorld } from "react-icons/tfi";
import { BiBookContent, BiCategoryAlt } from "react-icons/bi";



const links = [
  { name: "Home", icon: <IoHomeOutline />, path: "/" },
  { name: "Products", icon: <IoShirtOutline />, path: "/productsList" },
  { name: "Categories", icon: <BiCategoryAlt />, path: "/categories" },
  { name: "Orders", icon: <GrDeliver />, path: "/ordersList" },
  { name: "Add Domain", icon: <TfiWorld />, path: "/domain", extra: "(working)" },
  { name: "Contents", icon: <BiBookContent />, path: "/content" },
];

function Sidebar({ isOpen, setIsOpen }) {
  const router = useRouter();
  const pathname = usePathname();

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
      className={`bg-backgroundC py-[20px] border-r border-gray-300 text-white w-[250px] h-[calc(100vh-60px)] space-y-6 absolute inset-y-0 top-[60px] left-0 transform transition duration-200 ease-in-out z-10
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
    `}
    >
      {/* <Link
        href="#"
        className="text-primaryC text-2xl font-semibold block px-4 border-b py-4"
      >
        Admin Panel
      </Link> */}
      <nav className="px-[15px]">
        {links.map(({ name, path, extra , icon }) => (
          <Link
            key={path}
            href={path}
            className={`flex gap-2 items-center my-[3px] py-[14px] px-4 rounded transition duration-200  ${pathname === path ? "text-primaryC bg-secondaryC" : "text-textC hover:bg-[#d1d1d180]"
              }`}
          >
            {icon} {name} {extra && <span className="text-[10px]">{extra}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
