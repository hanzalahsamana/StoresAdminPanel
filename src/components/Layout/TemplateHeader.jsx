"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Link from "next/link";
import { AiOutlineClose } from 'react-icons/ai';
import { FaBars } from 'react-icons/fa';
import { SlHandbag } from 'react-icons/sl';
import { useSelector } from "react-redux";
import { totalCalculate } from '@/Utils/TotalCalculator';
import { getBasePath } from '@/Utils/GetBasePath';
import { usePathname } from "next/navigation";

/**
 * @param {{
 *   sectionData: {
 *     headerLogo: string,
 *     navLinks: { name: string, slug: string }[],
 *     style?: 'default' | 'swipedown' | 'sticky'
 *   }
 * }} props 
 */
const TemplateHeader = ({ sectionData }) => {
  const pathname = usePathname();
  const Storepath = getBasePath();
  const { cartData } = useSelector((state) => state?.cartData || []);
  const [isOpen, setIsOpen] = useState(false);
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const [showSwipeHeader, setShowSwipeHeader] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const headerRef = useRef(null);

  const [hasShownOnce, setHasShownOnce] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const { headerLogo, navLinks = [], style = 'sticky' } = sectionData || {};


  const [headerHeight, setHeaderHeight] = useState(0);

  useLayoutEffect(() => {
    if (headerRef.current) {
      const height = headerRef.current.offsetHeight;
      setHeaderHeight(height);
    }

    const handleResize = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (showSwipeHeader) {
      setHasShownOnce(true);
    }
  }, [showSwipeHeader]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      if (style === "sticky") {
        if (scrollTop > 200) {
          setShowStickyHeader(true);
        } else {
          setShowStickyHeader(false);
        }
      }

      if (style === "swipe") {
        if (scrollTop <= 200) {
          setShowSwipeHeader(false);
          setHasShownOnce(false);
        } else if (scrollTop > lastScrollTop) {
          setShowSwipeHeader(false);
        } else if (lastScrollTop - scrollTop >= 2) {
          setShowSwipeHeader(true);
        }
      }
      setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop);
    };


    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [style, lastScrollTop]);

  const headerStyleClass = {

    default: 'relative z-10',

    sticky: `${lastScrollTop > 200 ? 'fixed top-0 w-full z-50 headerSlideIn' : 'relative z-10'}`,

    swipe: `w-full z-50 ${lastScrollTop > 200 && hasShownOnce ? showSwipeHeader ? 'fixed top-0 headerSlideIn' : 'fixed top-0 headerSlideOut' : 'relative z-10'}`

  }[style] || 'relative z-10';


  return (
    <div className='box-border' style={{ height: `${headerHeight}px`, background: 'var(--tmp-pri)' }}>
      <header
        ref={headerRef}
        className={`w-full box-border py-[10px] ease-in-out ${headerStyleClass} bg-[var(--tmp-pri)] text-[var(--tmp-txt)] border-b border-[#b3b3b36f]`}
      >
        <div className="mx-auto flex justify-between gap-10 items-center max-w-[1200px] min-h-[70px] py-[12px] px-[20px] md:px-[40px]">
          <button className='md:hidden flex' onClick={toggleMenu}>
            {isOpen ? <AiOutlineClose size={24} /> : <FaBars size={24} />}
          </button>

          <Link href={`${Storepath}/`
          } className="flex items-center" >
            {headerLogo && (
              <img
                src={headerLogo}
                alt="Site Logo"
                className="w-20 max-h-12 object-contain"
              />
            )}
          </Link >

          <nav className="hidden md:flex gap-3 space-x-4">
            {navLinks.map(({ slug, name }, i) => (
              <Link
                key={i}
                href={`${Storepath}${slug}`}
                className={`text-[18px] font-medium text-[var(--tmp-txt)] cursor-pointer hover:opacity-[0.6] ${pathname === `${Storepath}${slug}` || (pathname === Storepath && slug === '/') ? 'underline font-semibold' : ''
                  }`}
                prefetch={true}
              >
                {name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4 text-[24px]">
            <Link className="hover:text-yellow-500 text-[var(--tmp-txt)] relative" href={`${Storepath}/cart`}>
              <SlHandbag />
              <span className="absolute flex justify-center items-center text-[12px] w-[18px] h-[18px] rounded-full bg-[var(--tmp-pri)] right-[-4px] bottom-[-6px]">
                {totalCalculate(cartData)}
              </span>
            </Link>
          </div>
        </div >

        <div className={`md:hidden transition-all duration-3000 ease-in-out ${isOpen ? 'max-h-[260px]' : 'max-h-[0px] overflow-hidden'}`}>
          <nav className="flex flex-col gap-6 p-[30px] py-4">
            {navLinks.map(({ name, slug }, i) => (
              <Link
                key={i}
                href={`${Storepath}${slug}`}
                className="text-[18px] cursor-pointer hover:opacity-[0.6]"
              >
                {name}
              </Link>
            ))}
          </nav>
        </div>
      </header >
    </div >
  );
};

export default TemplateHeader;
