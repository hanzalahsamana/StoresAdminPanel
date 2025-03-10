"use client";

import WebPrevFrame from "@/components/Layout/WebPrevFrame";
import { GoDotFill } from "react-icons/go";
import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';
import { Base_Domain, HTTP } from '../../../config';
import Button from "@/components/Actions/Button";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectPageByType } from "@/Redux/PagesData/PagesDataSlice";

const Dashboard = () => {

  const router = useRouter()
  const SiteLogo = useSelector((state) => selectPageByType(state, "Site Logo"));
  const { currUser } = useSelector((state) => state.currentUser);


  return (
    <div className="flex flex-col justify-end h-[calc(100vh-60px)] w-full">
      <div className="pt-[50px]">
        <WebPrevFrame />
      </div>
      <div>
        <div className='w-full flex justify-between items-start sm:items-center py-[40px] md:px-[30px] px-[15px] bg-backgroundC shadow-md flex-col gap-[10px]  sm:flex-row'>
          <div className='flex gap-4'>
            <div className='flex flex-col gap-3'>
            <div className='flex gap-2'>
              <p className='text-textC capitalize text-[18px]'>{currUser?.brandName} </p>
              <p className='bg-secondaryC flex gap-1 justify-center items-center text-primaryC text-center text-sm w-max px-[13px] rounded-2xl' >
                <GoDotFill />
                live
              </p>
            </div>
              <Link target='_blank' className='text-blue-400 flex gap-1 items-center ' href={`${HTTP}${currUser?.subDomain || currUser?.brandName}.${Base_Domain}`}>{currUser?.subDomain || currUser?.brandName}.{Base_Domain} <FiArrowUpRight /></Link>
            </div>
          </div>
          <div>

            <Button
              label='Customize'
              action={() => router.push('/content')}
              className='!w-[200px] !bg-black'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
