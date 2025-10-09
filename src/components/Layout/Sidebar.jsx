'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { IoChevronForward } from 'react-icons/io5';
import { useSelector } from 'react-redux';

function Sidebar({ isOpen = true, setIsOpen = () => {}, sideBarData }) {
  const pathname = usePathname();
  const subNavRefs = useRef({});

  const { store } = useSelector((state) => state.store);

  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsOpen(window.innerWidth > 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    sideBarData.forEach((link, index) => {
      if (link.subLinks && pathname.startsWith(link.path) && link.path !== '/') {
        setOpenDropdown(index);
      }
    });
  }, [pathname]);

  const toggleDropdown = (index) => setOpenDropdown(openDropdown === index ? null : index);

  return (
    <aside
      className={`bg-backgroundC w-[230px] py-5 border-r border-borderC  h-[calc(100vh-60px)]  customScroll !overflow-y-scroll space-y-6 absolute top-[60px] left-0 transform transition duration-200 ease-in-out z-[100]
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <nav className="px-4 space-y-1">
        {sideBarData?.map(({ name, path, icon, subLinks }, index) => (
          <div key={path}>
            <Link
              href={subLinks ? '#' : `/admin/${store?._id}${path}`}
              onClick={() => subLinks && toggleDropdown(index)}
              className={`flex justify-between items-center gap-2 py-[10px] px-4 rounded transition duration-200 text-left
              ${pathname === `/admin/${store?._id}${path}` ? 'text-textC border-l-4 border-primaryC bg-[#eeeff1f0]' : 'text-textC hover:bg-[#eeeff1f0]'}`}
            >
              <span className="flex gap-2 items-center w-full">
                <img className="w-[22px] h-[22px]" src={icon} alt="home" /> {name}
              </span>
              {subLinks && <IoChevronForward className={`transition-transform ${openDropdown === index ? 'rotate-90' : 'rotate-0'}`} />}
            </Link>
            {subLinks && (
              <div
                ref={(el) => (subNavRefs.current[index] = el)}
                className="bg-[#fbfbfb] overflow-hidden transition-all duration-300"
                style={{ height: openDropdown === index ? `${subNavRefs.current[index]?.scrollHeight}px` : '0px' }}
              >
                {subLinks?.map(({ name, path }) => (
                  <Link
                    key={path}
                    href={`/admin/${store?._id}${path}`}
                    className={`block py-1.5 px-5 text-sm mt-1 rounded transition duration-200
                      ${pathname === path ? 'text-textTC bg-gray-100' : 'text-textTC hover:bg-gray-100'}`}
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
