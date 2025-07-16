import { setSelectedDevicePreview } from '@/Redux/LivePreview/livePreviewSlice'
import { devices } from '@/Structure/DefaultStructures'
import { useDispatch, useSelector } from 'react-redux'
import { Tooltip } from 'react-tooltip'
import Button from '../Actions/Button'
import { VscLiveShare } from 'react-icons/vsc'
import { CiFileOn, CiLogout } from 'react-icons/ci'
import Link from 'next/link'
import PopupMenu2 from '../Modals/PopupMenu2'
import { TbLogout2 } from 'react-icons/tb'
import PillSelector from '../Actions/PillSelector'
import { CgToolbarBottom } from 'react-icons/cg'
import { LuBoxes, LuFileText, LuInfo, LuMail, LuShield } from 'react-icons/lu'
import { IoIosArrowDown } from 'react-icons/io'

const BuilderHeader = () => {
    const dispatch = useDispatch()
    const { selectedDevicePreview } = useSelector((state) => state.livePreview);

    return (
        <div className="bg-white h-[60px] w-full flex justify-between items-center px-4 shadow-sm border-b z-10">
            <Link
                href="./"
                className="text-[17px] font-semibold text-gray-900 hover:text-gray-900 flex items-center transition-all flex-grow-0 g cursor-pointer hover:opacity-80 group"
            >
                <TbLogout2 className="transition-all duration-300  group-hover:ml-1 group-hover:mr-1 mr-2" />
                Exit Editor
            </Link>
            <p className="text-[18px] font-medium text-gray-700 flex items-center gap-1 "><CiFileOn /> Home Page  <PopupMenu2
                data={[
                    { icon: <LuInfo />, name: 'About Us' },
                    { icon: <LuMail />, name: 'Contact' },
                    { icon: <LuBoxes />, name: 'Products' },
                    { icon: <LuShield />, name: 'Privacy Policy' },
                    { icon: <LuFileText />, name: 'Terms & Conditions' },
                    // { icon: <LuHelpCircle />, name: 'FAQ' },
                ]}
                trigger={<IoIosArrowDown className={'!text-[30px]  p-2 rounded-md'} />}
            /></p>


            <div className="flex gap-2 bg-gray-100  border rounded-md py-1 px-2">
                {Object.entries(devices).map(([key, device]) => (
                    <div
                        key={key}
                        data-tooltip-id={"preview"}
                        data-tooltip-content={device.ratio}
                        onClick={() => dispatch(setSelectedDevicePreview(key))}
                        className={`cursor-pointer py-1 px-3 rounded-md transition-all duration-200 border flex items-center justify-center
                ${selectedDevicePreview === key ? "bg-white  text-primaryC" : "text-gray-500  border-transparent hover:bg-gray-100"}`}>
                        {device.icon}
                    </div>
                ))}
                <Tooltip id='preview' place="top" className="!text-[12px] z-[200] " />
            </div>
            <div className="flex gap-2">
                {/* <Checkbox checked={checked} setChecked={setChecked} label={checked ? 'Show only editing page' : 'Show only editing page'} /> */}
                <Button size="small" label="Save as draft" variant="white" />
                <Button size="small" label="Publish" icon={<VscLiveShare />} />
            </div>
        </div>
    )
}

export default BuilderHeader