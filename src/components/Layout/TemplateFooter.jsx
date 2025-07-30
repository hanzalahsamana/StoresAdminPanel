"use client";

import Link from 'next/link';
import { useState } from 'react';
import { FaFacebook, FaInstagramSquare, FaLinkedin, FaPinterest, FaTwitter, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import { getBasePath } from '@/Utils/GetBasePath';
import OrderTrackModal from '@/components/Modals/OrderTrackModal';
import SubscribeForm from '../Forms/SubscribeForm';

const TemplateFooter = ({ sectionData }) => {
  const path = getBasePath();
  const [isOpen, setIsOpen] = useState(false);

  const {
    footerLogo,
    email = '',
    phone = '',
    location = '',
    copyright = "",
    socialLinks = {},
    style = 'style1',
  } = sectionData || {};


  return (
    <footer className={`bg-[var(--tmp-sec)] w-full flex justify-center`}>
      <div className="py-10 px-10 text-[var(--tmp-wtxt)] w-full max-w-[1500px]">
        <OrderTrackModal isOpen={isOpen} setIsOpen={setIsOpen} />

        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text-sm px-4 md:px-0">

          <div>
            {footerLogo && (
              <Link href={`${path}/`}>
                <img
                  src={footerLogo}
                  alt="Footer Logo"
                  className="mb-4 max-w-[200px] max-h-[150px] object-contain"
                />
              </Link>
            )}
            {(
              socialLinks.facebook || socialLinks.instagram || socialLinks.pinterest ||
              socialLinks.twitter || socialLinks.youtube || socialLinks.linkedin || socialLinks.whatsapp
            ) && (
                <div className='uppercase'>
                  <h4 className="font-bold mb-4 text-[16px] text-[var(--tmp-wtxt)]">Follow Us</h4>
                  <div className="flex gap-4 text-[20px]">
                    {socialLinks.facebook && (
                      <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                    )}
                    {socialLinks.instagram && (
                      <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer"><FaInstagramSquare /></a>
                    )}
                    {socialLinks.pinterest && (
                      <a href={socialLinks.pinterest} target="_blank" rel="noopener noreferrer"><FaPinterest /></a>
                    )}
                    {socialLinks.twitter && (
                      <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                    )}
                    {socialLinks.youtube && (
                      <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
                    )}
                    {socialLinks.linkedin && (
                      <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                    )}
                    {socialLinks.whatsapp && (
                      <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
                    )}
                  </div>
                </div>
              )}
          </div>
          <div>

            {email && (
              <>
                <p >Email Us:</p>
                <a href={`mailto:${email}`} className="font-bold block mt-1">{email}</a>
              </>
            )}
            {phone && (
              <>
                <p className="mt-3">Call Us at:</p>
                <a href={`tel:${phone}`} className="font-bold block mt-1">{phone}</a>
              </>
            )}
            {location && (
              <p className="mt-3">{location}</p>
            )}
          </div>

          {/* Quick Links */}
          {/* <div className='uppercase'>
            <h4 className="font-bold mb-4 text-[16px] text-[var(--tmp-wtxt)]">Quick Links</h4>
            <ul>
              <li className="mb-2 hover:opacity-[0.7]"><Link href={`${path}/pages/about-us`}>About Us</Link></li>
              <li className="mb-2 hover:opacity-[0.7]"><Link href={`${path}/contact`}>Contact Us</Link></li>
              <li className="mb-2 hover:opacity-[0.7]"><Link href={`${path}/products`}>Products</Link></li>
              <li className="mb-2 hover:opacity-[0.7]"><Link href={`${path}/`}>Home</Link></li>
            </ul>
          </div> */}


          <div className='uppercase'>
            <h4 className="font-bold mb-4 text-[16px] text-[var(--tmp-wtxt)]">Subscribe</h4>
            <SubscribeForm />
            <button
              onClick={() => setIsOpen(true)}
              className="mt-4 flex justify-center px-[35px] py-[10px] w-max bg-[var(--tmp-pri)] text-[var(--tmp-txt)] text-[16px] transition-all duration-300 hover:scale-105"
            >
              Track Your Order
            </button>
          </div>
        </div>

        {/* Copyright */}
        {copyright && (
          <div className="mt-10 text-center text-xs text-gray-400 border-t border-gray-600 pt-4">
            <p>{copyright}</p>
          </div>
        )}
      </div>
    </footer>
  );
};

export default TemplateFooter;
