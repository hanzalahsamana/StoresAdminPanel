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

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef(null);
  const SiteLogo = useSelector((state) => selectPageByType(state, "Site Logo"));
  const { cartData } = useSelector((state) => state?.cartData || []);
  const { siteName } = useSelector((state) => state.siteName);
  const { categories } = useSelector((state) => state?.categories);
  const { currUser } = useSelector((state) => state.currentUser);

  const Storepath = getBasePath();


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(document.body.getBoundingClientRect().top < -490);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkHeaderWidth = () => {
      if (headerRef.current) {
        setShowMobileMenu(headerRef.current.offsetWidth < 768);
      }
    };

    checkHeaderWidth();
    window.addEventListener('resize', checkHeaderWidth);
    return () => window.removeEventListener('resize', checkHeaderWidth);
  }, []);

  useEffect(() => {
    console.log(pathname, Storepath, "oooooooooooooo");

  }, [pathname])

  const toggleMenu = () => setIsOpen(!isOpen);

  const generateLink = (path, label, i) => (
    <Link
      key={i}
      href={`${Storepath}${path}`}
      className={`text-[18px] cursor-pointer hover:opacity-[0.6] ${pathname === `${Storepath}${path}` || (pathname === Storepath && path === '/') ? 'underline font-semibold' : ''}`}
      prefetch={true}
    >
      {label}
    </Link>
  );

  return (
    <header
      ref={headerRef}
      className={`w-full transition-all duration-300 ease-in-out top-0 z-10 
        ${pathname === "/a" ? 'fixed' : 'sticky'} 
        ${pathname === `/a${siteName}` && !isScrolled && !isOpen ?
          'bg-gradient-to-b from-[#000000c4] to-transparent text-white' :
          'bg-white text-black shadow-md '}`}
    >
      <div className="container mx-auto flex justify-between gap-10 items-center max-w-[1200px] py-4 px-[20px] md:px-[40px]">
        {showMobileMenu && (
          <div className="flex items-center">
            <button onClick={toggleMenu}>
              {isOpen ? <AiOutlineClose size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        )}

        <Link href={`${Storepath}/`} className="flex items-center">
          <img src={SiteLogo?.image} alt={siteName} className="w-20 max-h-16 object-contain" />
        </Link>

        {!showMobileMenu && (
          <nav className="flex gap-3 space-x-4">
            {generateLink("/", "Home")}
            {categories?.slice(0, 2).map((category, i) => generateLink(`/collection/${category?.link}`, category?.name, i))}
            {generateLink("/products", "Products")}
            {generateLink("/contact", "Contact")}
          </nav>
        )}

        <div className="flex items-center space-x-4 text-[24px]">
          <button className="hover:text-yellow-500 relative">
            <Link href={`${Storepath}/cart`}>
              <HiOutlineShoppingBag />
              <span className="absolute text-black flex justify-center items-center text-[12px] w-[18px] h-[18px] rounded-full bg-white right-[-4px] bottom-[-6px]">
                {totalCalculate(cartData)}
              </span>
            </Link>
          </button>
        </div>
      </div>

      {showMobileMenu && (
        <div className={`max-w-[1500px] transition-all duration-3000 ease-in-out ${isOpen ? 'max-h-[260px]' : 'max-h-[0px] overflow-hidden'}`}>
          <nav className="flex flex-col gap-6 p-[30px] py-4">
            {generateLink("/", "Home")}
            {categories?.slice(0, 2).map((category, i) => generateLink(`/collection/${category?.link}`, category?.name, i))}
            {generateLink("/products", "Products")}
            {generateLink("/contact", "Contact")}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
