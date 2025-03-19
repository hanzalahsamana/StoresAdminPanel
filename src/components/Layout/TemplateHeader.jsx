"use client";

import React, { useEffect, useState, useRef } from 'react';
import { selectPageByType } from '@/Redux/PagesData/PagesDataSlice';
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import Link from "next/link";
import { AiOutlineClose } from 'react-icons/ai';
import { FaBars } from 'react-icons/fa';
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { totalCalculate } from '@/Utils/TotalCalculator';
import { getBasePath } from '@/Utils/GetBasePath';

const TemplateHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef(null);

  const SiteLogo = useSelector((state) => selectPageByType(state, "Site Logo"));
  const { cartData } = useSelector((state) => state?.cartData || []);
  const { siteName } = useSelector((state) => state.siteName);
  const { categories } = useSelector((state) => state?.categories);
  const Storepath = getBasePath();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(document.body.getBoundingClientRect().top < -490);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkHeaderWidth = () => setShowMobileMenu(headerRef.current?.offsetWidth < 768);
    checkHeaderWidth();
    window.addEventListener('resize', checkHeaderWidth);
    return () => window.removeEventListener('resize', checkHeaderWidth);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { path: "/", label: "Home" },
    ...categories?.slice(0, 2).map((category) => ({ path: `/collection/${category.link}`, label: category.name })) || [],
    { path: "/products", label: "Products" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <header
      ref={headerRef}
      className={`w-full transition-all sticky duration-300 ease-in-out top-0 z-10 bg-[var(--tmp-acc)] text-[var(tmp-txt)] border-b border-[#5f5b5b2f]`}>
        
      <div className="mx-auto flex justify-between gap-10 items-center max-w-[1200px] min-h-[70px] py-4 px-[20px] md:px-[40px]">


        {showMobileMenu && (
          <button onClick={toggleMenu}>{isOpen ? <AiOutlineClose size={24} /> : <FaBars size={24} />}</button>
        )}

        <Link href={`${Storepath}/`} className="flex items-center">
          <img src={SiteLogo?.image} alt={siteName} className="w-20 max-h-16 object-contain" />
        </Link>

        {!showMobileMenu && (
          <nav className="flex gap-3 space-x-4">
            {navLinks.map(({ path, label }, i) => (
              <Link
                key={i}
                href={`${Storepath}${path}`}
                className={`text-[18px] text-[var(tmp-txt)] cursor-pointer hover:opacity-[0.6] ${pathname === `${Storepath}${path}` || (pathname === Storepath && path === '/') ? 'underline font-semibold' : ''}`}
                prefetch={true}
              >
                {label}
              </Link>
            ))}
          </nav>
        )}
        <div className="flex items-center space-x-4 text-[24px]">
          <Link className="hover:text-yellow-500 text-[var(--tmp-txt)]  cartButton relative" href={`${Storepath}/cart`}>
            <HiOutlineShoppingBag />
            <span className="absolute flex justify-center items-center text-[12px] w-[18px] h-[18px] rounded-full bg-[var(--tmp-acc)] right-[-4px] bottom-[-6px]">
              {totalCalculate(cartData)}
            </span>
          </Link>
        </div>
      </div>

      {showMobileMenu && (
        <div className={`max-w-[1500px] transition-all duration-3000 ease-in-out ${isOpen ? 'max-h-[260px]' : 'max-h-[0px] overflow-hidden'}`}>
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
      )}
    </header>
  );
};

export default TemplateHeader;
