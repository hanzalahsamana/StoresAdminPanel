import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { GrDeliver } from "react-icons/gr";
import { IoAnalyticsOutline, IoHomeOutline, IoShirtOutline, IoChevronForward, IoColorPaletteOutline } from "react-icons/io5";
import { TfiLayoutMediaCenterAlt, TfiWorld } from "react-icons/tfi";
import { BiBookContent, BiCategoryAlt, BiTransferAlt } from "react-icons/bi";
import { PiTreeStructureLight } from "react-icons/pi";
import { useSelector } from "react-redux";
import Loader from "../Loader/loader";

function Sidebar({ isOpen, setIsOpen }) {
  const { pagesData, pagesDataLoading } = useSelector((state) => state.pagesData);
  const { sectionsData, sectionsDataLoading } = useSelector((state) => state.sectionsData);
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState(null);
  const subNavRefs = useRef({});

  const links = [
    { name: "Home", icon: 'https://img.icons8.com/fluency/48/home.png', path: "/" },
    { name: "Analytics", icon: 'https://img.icons8.com/fluency/48/combo-chart--v1.png', path: "/analytics" },
    {
      name: "Products", icon: 'https://img.icons8.com/doodle/48/t-shirt--v1.png', path: "/products",
    },
    { name: "Categories", icon: 'https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-collections-modelling-agency-flaticons-lineal-color-flat-icons.png', path: "/categories", },
    { name: "Orders", icon: 'https://img.icons8.com/color/48/cardboard-box.png', path: "/ordersList" },
    { name: "Domain", icon: 'https://img.icons8.com/fluency/48/domain.png', path: "/domain" },
    { name: "Color Theme", icon: 'https://img.icons8.com/emoji/48/artist-palette.png', path: "/theme" },
    {
      name: "Contents", icon: 'https://img.icons8.com/color/48/design--v1.png', path: "/content",
      subLinks: [
        { name: "Over View", path: "/content" },
        ...(Array.isArray(pagesData) ? pagesData.map(item => ({
          name: item.type,
          path: `/content/${item._id}`
        })) : [])
      ],
    },

    {
      name: "Design / Layout", icon:'https://img.icons8.com/color/48/channel-mosaic.png', path: "/design",
      subLinks: [
        { name: "Over View", path: "/design" },
        ...(Array.isArray(sectionsData) ? sectionsData.map(item => ({
          name: item?.sectionName,
          path: `/design/${item._id}`
        })) : [])
      ],
    },
    { name: "Migration", icon: 'https://img.icons8.com/fluency/48/back-sorting.png', path: "/migration" },

  ];

  useEffect(() => {
    const handleResize = () => setIsOpen(window.innerWidth > 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsOpen]);

  useEffect(() => {
    links.forEach((link, index) => {
      if (link.subLinks && pathname.startsWith(link.path) && link.path !== "/") {
        setOpenDropdown(index);
      }
    });
  }, [pathname]);

  if (pagesDataLoading || sectionsDataLoading) {
    return <Loader />
  }

  const toggleDropdown = (index) => setOpenDropdown(openDropdown === index ? null : index);

  return (
    <aside
      className={`bg-backgroundC w-[230px] py-5 border-r border-borderC text-backgroundC h-[calc(100vh-60px)] customScroll !overflow-y-scroll space-y-6 absolute top-[60px] left-0 transform transition duration-200 ease-in-out z-[100]
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <nav className="px-4 space-y-1">
        {links?.map(({ name, path, icon, subLinks }, index) => (
          <div key={path}>
            <Link
              href={subLinks ? "#" : path}
              onClick={() => subLinks && toggleDropdown(index)}
              className={`flex justify-between items-center gap-2 py-[10px] px-4 rounded transition duration-200 text-left
                ${(pathname.startsWith(path) && path !== "/") || pathname === path ? "text-textC border-l-4 border-primaryC bg-[#eeeff1f0]" : "text-textC hover:bg-[#eeeff1f0]"}`}
            >
              <span className="flex gap-2 items-center w-full"><img className="w-[22px] h-[22px]" src={icon} alt="home" /> {name}</span>
              {subLinks && (
                <IoChevronForward className={`transition-transform ${openDropdown === index ? "rotate-90" : "rotate-0"}`} />
              )}
            </Link>
            {subLinks && (
              <div
                ref={(el) => (subNavRefs.current[index] = el)}
                className="bg-[#fbfbfb] overflow-hidden transition-all duration-300"
                style={{ height: openDropdown === index ? `${subNavRefs.current[index]?.scrollHeight}px` : "0px" }}
              >
                {subLinks?.map(({ name, path }) => (
                  <Link
                    key={path}
                    href={path}
                    className={`block py-1.5 px-5 text-sm mt-1 rounded transition duration-200
                      ${pathname === path ? "text-textTC bg-gray-100" : "text-textTC hover:bg-gray-100"}`}
                  >
                    {name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
