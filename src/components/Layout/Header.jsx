'use client';
import { useDispatch, useSelector } from 'react-redux';
import { Base_Domain, HTTP } from '../../../config';
import { IoBagAddOutline, IoEyeOutline, IoStorefrontOutline } from 'react-icons/io5';
import logo from '../../Assets/Images/logo.png';
import PopupMenu2 from '../Modals/PopupMenu2';
import { FaRegUser } from 'react-icons/fa';
import { TbLogout2 } from 'react-icons/tb';
import { setLoading, setLogout } from '@/Redux/Authentication/AuthSlice';
import IconButton from '../Actions/IconButton';
import { BiMenu } from 'react-icons/bi';
import { GoChevronDown } from 'react-icons/go';
import { useRouter } from 'next/navigation';

export default function Header({ toggleSidebar }) {
  const currStore = useSelector((state) => state.store?.store);
  const { allStores } = useSelector((state) => state.allStores);
  const dispatch = useDispatch();
  const router = useRouter();

  const data = [
    ...allStores
      ?.filter((store) => store._id !== currStore._id)
      .slice(0, 3)
      .map((store) => ({
        icon: <IoStorefrontOutline />,
        name: store?.storeName,
        action: () => router.push(`/admin/${store._id}`),
      })),

    {
      icon: <IoBagAddOutline />,
      name: 'Create Store',
      action: () => router.push('/admin/stores'),
    },

    {
      icon: <TbLogout2 />,
      name: 'Logout',
      action: () => dispatch(setLogout()),
    },
    {
      icon: <FaRegUser />,
      name: "Manage Account",
      action: () => router.push("/admin/account"),
    },
  ];

  return (
    <header className="bg-backgroundC border-b border-gray-300 px-3 md:px-4 text-textC flex justify-between items-center fixed w-full z-[110] top-0 left-0 h-[60px]">
      <div className="flex gap-4 items-center">
        <IconButton action={toggleSidebar} icon={<BiMenu />} className={'border py-[6px] rounded border-gray-600/30'} />
        <button className="text-black  flex justify-center items-center gap-2 focus:outline-none text-xl  font-semibold ">
          <img src={logo?.src} alt="" className="w-12" />
          Multi Tenant
        </button>
      </div>
      <div className="flex items-center gap-2 ">
        <a
          target="_blank"
          href={`${HTTP}${currStore?.subDomain}.${Base_Domain}`}
          className="flex gap-2 text-[18px] items-center cursor-pointer px-[10px] rounded-md py-[7px] bg-gray-100 border-[1.5px] border-borderC font-medium"
        >
          <IoEyeOutline />
          <span className="sm:flex hidden text-[15px]">view your store</span>
        </a>
        <div className="relative inline-block text-gray-700">
          <PopupMenu2
            trigger={
              <>
                <button
                  className={`flex justify-between border-[1.5px] border-primaryC gap-1.5 min-w-[110px] capitalize items-center text-primaryC bg-secondaryC px-2 rounded-md py-[7px] hover:opacity-80 cursor-pointer transition-all ease-in-out duration-300`}
                >
                  <div className="flex gap-1.5 items-center">
                    <IoStorefrontOutline />
                    <span className="sm:flex hidden text-[15px] font-medium">{currStore?.storeName}</span>
                  </div>
                  <div>
                    <GoChevronDown strokeWidth={0.5} />
                  </div>
                </button>
              </>
            }
            data={data}
            label="Switch Stores"
          />
        </div>
      </div>
    </header>
  );
}
