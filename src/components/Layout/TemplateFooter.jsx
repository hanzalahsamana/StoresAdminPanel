'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaFacebook, FaInstagramSquare, FaLinkedin, FaPinterest, FaTwitter, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import { getBasePath } from '@/Utils/GetBasePath';
import OrderTrackModal from '@/components/Modals/OrderTrackModal';
import SubscribeForm from '../Forms/SubscribeForm';
import Button from '../Actions/Button';

const TemplateFooter = ({ sectionData }) => {
  const path = getBasePath();
  const [isOpen, setIsOpen] = useState(false);

  const { footerLogo, email = '', phone = '', location = '', copyright = '', socialLinks = {}, style = 'style1' } = sectionData || {};

  return (
    <footer className={`bg-[var(--tmp-sec)] w-full border-t flex flex-col items-center border-[var(--tmp-lBor)]`}>
      <div className="pt-10 text-[var(--tmp-wtxt)] w-full max-w-[1200px] px-[40px]">
        <OrderTrackModal isOpen={isOpen} setIsOpen={setIsOpen} />

        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text-sm md:px-0">
          <div>
            {footerLogo && (
              <Link href={`${path}/`}>
                <img src={footerLogo} alt="Footer Logo" className="mb-4 max-w-[200px] max-h-[150px] object-contain" />
              </Link>
            )}
            {(socialLinks.facebook ||
              socialLinks.instagram ||
              socialLinks.pinterest ||
              socialLinks.twitter ||
              socialLinks.youtube ||
              socialLinks.linkedin ||
              socialLinks.whatsapp) && (
              <div className="uppercase">
                <h4 className="font-bold mb-4 text-[16px] text-[var(--tmp-wtxt)]">Follow Us</h4>
                <div className="flex gap-4 text-[20px]">
                  {socialLinks.facebook && (
                    <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                      <FaFacebook />
                    </a>
                  )}
                  {socialLinks.instagram && (
                    <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                      <FaInstagramSquare />
                    </a>
                  )}
                  {socialLinks.pinterest && (
                    <a href={socialLinks.pinterest} target="_blank" rel="noopener noreferrer">
                      <FaPinterest />
                    </a>
                  )}
                  {socialLinks.twitter && (
                    <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                      <FaTwitter />
                    </a>
                  )}
                  {socialLinks.youtube && (
                    <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer">
                      <FaYoutube />
                    </a>
                  )}
                  {socialLinks.linkedin && (
                    <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                      <FaLinkedin />
                    </a>
                  )}
                  {socialLinks.whatsapp && (
                    <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer">
                      <FaWhatsapp />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col space-y-4">
            {email && (
              <div>
                <p className="inline mr-2">Email Us:</p>
                <a href={`mailto:${email}`} className="font-bold inline mt-1">
                  {email}
                </a>
              </div>
            )}
            {phone && (
              <div>
                <p className="mt-3 inline mr-2">Call Us at:</p>
                <a href={`tel:${phone}`} className="font-bold inline mt-1">
                  {phone}
                </a>
              </div>
            )}
            {location && (
              <div>
                <p className="mt-3 inline mr-2">location:</p>
                <a href={`tel:${phone}`} className="font-bold inline mt-1">
                  {location}
                </a>
              </div>
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

          <div className="uppercase">
            <h4 className="font-bold mb-4 text-[16px] text-[var(--tmp-wtxt)]">Subscribe</h4>
            <SubscribeForm />
            <Button
              action={() => setIsOpen(true)}
              variant="store"
              label="Track Your Order"
              className="font-bold  transition-all duration-300 hover:scale-105 !bg-black mt-4 !w-max !px-8 !py-3"
              size=""
            />
          </div>
        </div>
      </div>
      {/* Copyright */}
      {copyright && (
        <div className="mt-10 w-full text-center text-xs text-[var(--tmp-ltxt)] border-t border-[var(--tmp-lBor)] pt-4 bg-[var(--tmp-pri)] py-5">
          <p>{copyright}</p>
        </div>
      )}
    </footer>
  );
};

export default TemplateFooter;
