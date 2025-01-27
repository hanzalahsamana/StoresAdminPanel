"use client";

import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { selectPageByType } from '@/Redux/PagesData/PagesDataSlice';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname()
  const { cartData, loading, error } = useSelector((state) => state?.cartData || [])
  const totalQuantity = cartData?.reduce((accumulator, cartItem) => {
    return accumulator + (cartItem?.quantity || 0);
  }, 0);

  const {siteName} = useSelector((state) => state.siteName);


  const SiteLogo = useSelector((state) =>
    selectPageByType(state, "Site Logo")
  );

  const { categories } = useSelector((state) => state?.categories);

  useEffect(() => {


    window.addEventListener('scroll', () => {
      if (document.body.getBoundingClientRect().top < -430) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    })

  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };



  return (
    <header className={`w-full transition-all duration-300 ease-in-out top-0 z-10 ${pathname === "/" ? 'fixed' : 'sticky'} ${pathname === "/" && !isScrolled && !isOpen ? 'bg-gradient-to-b from-[#000000c4] to-transparent text-white' : 'bg-white text-black shadow-md '} ${pathname === "/" && 'fixed'}`}>
      <div className="container mx-auto flex justify-between gap-10 items-center max-w-[1200px] py-4 px-[20px] md:px-[40px]">
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu}>
            {isOpen ? <AiOutlineClose size={24} /> : <FaBars size={24} />}
          </button>
        </div>
        <Link href={'/'} className="flex items-center">
          <img src={SiteLogo?.image} alt={siteName} className="w-20 max-h-16 object-contain" />
        </Link>

        <nav className="hidden md:flex gap-3 space-x-4">
          <Link className={`text-[18px] cursor-pointer hover:opacity-[0.6] ${pathname === '/' ? 'underline font-semibold' : ''}`} href="/" prefetch={true}>
            Home
          </Link>
          {categories?.slice(0, 2).map((category, i) => (
            <Link
              key={i}
              className={`text-[18px] cursor-pointer hover:opacity-[0.6] ${pathname === `/collection/${category?.link}` ? 'underline font-semibold' : ''}`}
              href={`/collection/${category?.link}`}
              prefetch={true}
            >
              {category?.name}
            </Link>
          ))}
          <Link className={`text-[18px] cursor-pointer hover:opacity-[0.6] ${pathname === '/products' ? 'underline font-semibold' : ''}`} href="/products" prefetch={true}>
            Products
          </Link>
          <Link className={`text-[18px] cursor-pointer hover:opacity-[0.6] ${pathname === '/contact' ? 'underline font-semibold' : ''}`} href="/contact" prefetch={true}>
            Contact
          </Link>
        </nav>

        <div className="flex items-center space-x-4 text-[24px]">
          <button className=" hover:text-yellow-500 relative">
            <Link href="/cart">
              <HiOutlineShoppingBag />
              <span className="absolute text-black text-[12px] w-[18px] h-[18px] rounded-full bg-white right-[-4px] bottom-[-6px] ">{totalQuantity}</span>
            </Link>
          </button>
        </div>

      </div>

      <div className={`max-w-[1500px] md:hidden transition-all duration-3000 ease-in-out ${isOpen ? 'max-h-[260px]' : 'max-h-[0px] overflow-hidden'}`}>
        <nav className="flex flex-col gap-6 p-[30px] py-4">
          <Link href={"/"} prefetch={true}>
            <p className={`text-[18px] cursor-pointer hover:opacity-[0.6] ${pathname === '/' ? 'underline font-semibold' : ''}`} onClick={() => {
              toggleMenu()
            }}>
              Home
            </p>
          </Link>

          {categories?.slice(0, 2).map((category, i) => (

            <Link key={i} href={`/collection/${category?.link}`} prefetch={true}>
              <p className={`text-[18px] cursor-pointer hover:opacity-[0.6] ${pathname === `/collection/${category?.link}` ? 'underline font-semibold' : ''}`} onClick={() => {
                toggleMenu()
              }}>
                {category?.name}
              </p>
            </Link>
          ))}
          <Link href={"/products"} prefetch={true}>
            <p className={`text-[18px] cursor-pointer hover:opacity-[0.6] ${pathname === '/products' ? 'underline font-semibold' : ''}`} onClick={() => {
              toggleMenu()
            }}>
              Products
            </p>
          </Link >
          <Link href={"/contact"} prefetch={true}>
            <p className={`text-[18px] cursor-pointer hover:opacity-[0.6] ${pathname === '/contact' ? 'underline font-semibold' : ''}`} onClick={() => {
              toggleMenu()
            }}>
              Contact
            </p>
          </Link>
        </nav>
      </div>

    </header>
  );
};

export default Header;
