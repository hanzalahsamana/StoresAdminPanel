"use client";

import React, { useState } from 'react';
import { selectPageByType } from '@/Redux/PagesData/PagesDataSlice';
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import Link from "next/link";
import { AiOutlineClose } from 'react-icons/ai';
import { FaBars } from 'react-icons/fa';
import { totalCalculate } from '@/Utils/TotalCalculator';
import { getBasePath } from '@/Utils/GetBasePath';
import { SlHandbag } from 'react-icons/sl';

const TemplateHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const SiteLogo = useSelector((state) => selectPageByType(state, "Site Logo"));
  const { cartData } = useSelector((state) => state?.cartData || []);
  const { siteName } = useSelector((state) => state.siteName);
  const { categories } = useSelector((state) => state?.categories);
  const Storepath = getBasePath();


  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { path: "/", label: "Home" },
    ...categories?.slice(0, 2).map((category) => ({ path: `/collection/${category.link}`, label: category.name })) || [],
    { path: "/products", label: "Products" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`w-full transition-all sticky duration-300 ease-in-out top-0 z-10 bg-[var(--tmp-acc)] text-[var(--tmp-txt)] border-b border-[#b3b3b36f]`}>

      <div className="mx-auto flex justify-between gap-10 items-center max-w-[1200px] min-h-[70px] py-[12px] px-[20px] md:px-[40px]">


        <button className='md:hidden flex' onClick={toggleMenu}>{isOpen ? <AiOutlineClose size={24} /> : <FaBars size={24} />}</button>
        <Link href={`${Storepath}/`} className="flex items-center">
          <img src={SiteLogo?.image} alt={siteName} className="w-20 max-h-12 object-contain" />
        </Link>

        <nav className="hidden md:flex gap-3 space-x-4">
          {navLinks.map(({ path, label }, i) => (
            <Link
              key={i}
              href={`${Storepath}${path}`}
              className={`text-[18px] text-[var(--tmp-txt)] cursor-pointer hover:opacity-[0.6] ${pathname === `${Storepath}${path}` || (pathname === Storepath && path === '/') ? 'underline font-semibold' : ''}`}
              prefetch={true}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-4 text-[24px]">
          <Link className="hover:text-yellow-500 text-[var(--tmp-txt)]  cartButton relative" href={`${Storepath}/cart`}>
            <SlHandbag />
            <span className="absolute flex justify-center items-center text-[12px] w-[18px] h-[18px] rounded-full bg-[var(--tmp-acc)] right-[-4px] bottom-[-6px]">
              {totalCalculate(cartData)}
            </span>
          </Link>
        </div>
      </div>

      <div className={`md:hidden flex max-w-[1500px] transition-all duration-3000 ease-in-out ${isOpen ? 'max-h-[260px]' : 'max-h-[0px] overflow-hidden'}`}>
        <nav className="flex flex-col gap-6 p-[30px] py-4">
          {navLinks.map(({ path, label }, i) => (
            <Link
              key={i}
              href={`${Storepath}${path}`}
              className="text-[18px] cursor-pointer hover:opacity-[0.6]"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default TemplateHeader;
