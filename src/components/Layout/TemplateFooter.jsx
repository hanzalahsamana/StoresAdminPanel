"use client";
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { selectPageByType } from '@/Redux/PagesData/PagesDataSlice';
import { useState } from 'react';
import OrderTrackModal from '@/components/Modals/OrderTrackModal';
import { getBasePath } from '@/Utils/GetBasePath';
import { FaFacebookF, FaInstagram, FaPinterest, FaTwitter } from 'react-icons/fa';

const TemplateFooter = () => {
  const { siteName } = useSelector((state) => state.siteName);
  const [isOpen, setIsOpen] = useState(false);
  const path = getBasePath();

  const SiteLogo = useSelector((state) =>
    selectPageByType(state, "Site Logo")
  );

  const ContactDetails = useSelector((state) =>
    selectPageByType(state, "Contact")
  );

  const { categories } = useSelector((state) => state?.categories);

  return (
    <div className="bg-[var(--tmp-sec)] py-10 px-10 text-[var(--tmp-wtxt)] w-full max-w-[1500px]">
      <div className="container mx-auto grid items-start grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-sm px-4 md:px-0">

        <OrderTrackModal isOpen={isOpen} setIsOpen={setIsOpen} />

        <div>
          <Link href={`${path}/`}>
            <img src={SiteLogo?.image} alt={SiteLogo?.type} className="mb-4 max-w-[200px] max-h-[150px] object-contain" />
          </Link>
          <p>Call Us at:</p>
          <a href={`tel:${ContactDetails?.phone}`} className="font-bold">
            {ContactDetails?.phone}
          </a>
          <p className="mt-4">For Business Queries:</p>
          <a href={`mailto:${ContactDetails?.email}`} className="font-bold ">
            {ContactDetails?.email}
          </a>
        </div>

        <div className='uppercase'>
          <h4 className="font-bold mb-4 text-[16px] text-[var(--tmp-pri)]">Customer Support</h4>
          <ul>
            <li className="mb-2 hover:opacity-[0.7]"><a href={`${path}/pages/return-policy`}> RETURN POLICY</a></li>
            <li className="mb-2 hover:opacity-[0.7]"><a href={`${path}/pages/privacy-policy`}> PRIVACY POLICY</a></li>
            <li className="mb-2 hover:opacity-[0.7]"><a href={`${path}/pages/terms-of-service`}> TERMS OF SERVICE</a></li>
            <li className="mb-2 hover:opacity-[0.7]"><a href={`${path}/pages/shipping-policy`}> SHIPPING POLICY</a></li>
            <li className="mb-2 hover:opacity-[0.7]"><a href={`${path}/pages/about-us`}> ABOUT US</a></li>
            <li className="mb-2 hover:opacity-[0.7]"><a href={`${path}/pages/faqs`}> FAQs</a></li>
            <li className="mb-2 hover:opacity-[0.7]"><a href={`${path}/contact`}>CONTACT US</a></li>
          </ul>
        </div>

        <div className='uppercase'>
          <h4 className="font-bold mb-4 text-[16px] text-[var(--tmp-pri)]">SHOP</h4>
          <ul>
            <li className="mb-2 hover:opacity-[0.7] cursor-pointer" onClick={() => setIsOpen(true)}>Track Your Order</li>
            {categories?.map((category, i) => (
              <li key={i} className="mb-2 hover:opacity-[0.7]"><a href={`${path}/collection/${category?.link}`}>{category?.name}</a></li>
            ))}
            <li className="mb-2 hover:opacity-[0.7]"><a href={`${path}/products`}>ALL PRODUCTS</a></li>
          </ul>
        </div>

        <div className='uppercase'>
          <h4 className="font-bold mb-4 text-[16px] text-[var(--tmp-pri)]">FOllow Us</h4>
          <ul className='flex gap-5 text-[20px]'>
            <li className="mb-2 hover:opacity-[0.7]"><a href={`${path}/pages/return-policy`}><FaFacebookF />
            </a></li>
            <li className="mb-2 hover:opacity-[0.7]"><a href={`${path}/pages/privacy-policy`}><FaInstagram />
            </a></li>
            <li className="mb-2 hover:opacity-[0.7]"><a href={`${path}/pages/terms-of-service`}> <FaPinterest />
            </a></li>
            <li className="mb-2 hover:opacity-[0.7]"><a href={`${path}/pages/shipping-policy`}> <FaTwitter />
            </a></li>
          </ul>
          <ul className='mt-[20px]'>
            <button
              onClick={() => setIsOpen(true)}
              className="flex justify-center px-[35px] py-[10px] w-max bg-[var(--tmp-pri)] text-[var(--tmp-txt)] text-[16px] transition-all duration-300 hover:scale-105"
            >
              Track Your Order
            </button>
          </ul>
        </div>

      </div>

      <div className="mt-10 text-center text-xs text-gray-400 border-t border-gray-600 pt-4">
        <p>© 2024, {siteName} · <a href={`${path}/pages/privacy-policy`} className="text-[var(--tmp-wtxt)]">Privacy policy</a></p>
      </div>

    </div>

  );
};

export default TemplateFooter;
