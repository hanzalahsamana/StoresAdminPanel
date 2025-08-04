import { setSelectedDevicePreview } from '@/Redux/LivePreview/livePreviewSlice'
import { devices } from '@/Structure/DefaultStructures'
import { useDispatch, useSelector } from 'react-redux'
import { Tooltip } from 'react-tooltip'
import Button from '../Actions/Button'
import { VscLiveShare } from 'react-icons/vsc'
import Link from 'next/link'
import { TbLogout2 } from 'react-icons/tb'
import { LuHistory } from 'react-icons/lu'
import IconButton from '../Actions/IconButton'
import { BiRedo, BiUndo } from 'react-icons/bi'
import StatusCard from '../Cards/StatusCard'

const BuilderHeader = ({ isModified = false, handlePublishPage = () => { }, handleSaveDraftPage = () => { }, handleDiscardDraft = () => { }, loading, currentMode = '' }) => {
    const dispatch = useDispatch()
    const { selectedDevicePreview } = useSelector((state) => state.livePreview);

    return (
        <div className="bg-white h-[60px] w-full flex justify-between items-center px-4 shadow-sm border-b z-10">
            <div className='flex items-center gap-3'>
                <Link
                    href="./"
                    className="text-[17px] font-semibold text-gray-900 hover:text-gray-900 flex items-center transition-all flex-grow-0 g cursor-pointer hover:opacity-80 group"
                >
                    <TbLogout2 className="transition-all duration-300  group-hover:ml-1 group-hover:mr-1 mr-2" />
                    Exit Editor
                </Link>
                <StatusCard
                    // status={false}
                    label={`${currentMode === 'published' ? 'Published version' : 'Draft version'}`}
                    className={`${currentMode === 'published' ? '!bg-green-200 !text-green-600' : '!bg-orange-200 !text-yellow-700'}`}
                />
                {currentMode === 'draft' ? (
                    <p onClick={handleDiscardDraft} className='!text-[22px] flex items-center gap-2 bg-gray-100 text-gray-700 p-2 rounded-md cursor-pointer  ' data-tooltip-id={"preview"} data-tooltip-content={'Discard Back To Published Version'}>
                        <LuHistory />
                    </p>
                ) : ''}
            </div>

            <div className="flex gap-2 items-center">
                <div className="flex gap-2 bg-gray-100  border rounded-md py-1 px-2">
                    {Object.entries(devices).map(([key, device]) => (
                        <div
                            key={key}
                            data-tooltip-id={"customizer"}
                            data-tooltip-content={device.ratio}
                            onClick={() => dispatch(setSelectedDevicePreview(key))}
                            className={`cursor-pointer py-1 px-3 rounded-md transition-all duration-200 border flex items-center justify-center 
                            ${selectedDevicePreview === key ? "bg-white  text-primaryC" : "text-gray-500  border-transparent hover:bg-gray-100"}`}>
                            {device.icon}
                        </div>
                    ))}
                </div>
                <IconButton icon={<BiUndo />} tooltipLabel={'Undo'} className='!text-[22px] flex flex-col hover:bg-gray-100 text-gray-700 p-2 rounded-md hover:opacity-100 ' ></IconButton>
                <IconButton icon={<BiRedo />} tooltipLabel={'Redo'} className='!text-[22px] flex flex-col hover:bg-gray-100 text-gray-300 p-2 rounded-md hover:opacity-100 !cursor-not-allowed '> </IconButton>
                <Button size="small" label="Save As Draft" action={handleSaveDraftPage} loading={loading} variant="black" active={isModified} />
                <Button size="small" label="Publish To Live" action={handlePublishPage} loading={loading} icon={<VscLiveShare />} active={isModified || currentMode === 'draft'} />
            </div>
            <Tooltip id='customizer' place="top" className="!text-[12px] font-semibold !px-3 !py-1.5 z-[200] " />
        </div>
    )
}

export default BuilderHeader