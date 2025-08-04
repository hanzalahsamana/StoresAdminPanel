'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import DragAndDropWrapper, { useDragAndDrop } from '@/Hooks/useDragAndDrop';
import WidgetsModal from '../Modals/WidgetsModal';
import { IoIosArrowBack, IoIosArrowDown } from 'react-icons/io';
import IconButton from '../Actions/IconButton';
import Button from '../Actions/Button';
import { SectionStructure } from '@/Structure/SectionStructure';
import PopupMenu2 from '../Modals/PopupMenu2';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import { duplicateSection, insertSection, removeSection, toggleSectionVisibility } from '@/Utils/BuilderUtils/BuilderUtilsFuctions';
import { BuilderSideBarCard, GlobalSectionCard, SectionAddAnimationLine, SectionItemCard } from '@/Utils/BuilderUtils/BuilderUtilsComponents';
import { CiFileOn } from 'react-icons/ci';
import { useSelector } from 'react-redux';
import ThemeEditModal from '../Modals/ThemeEditModal';
import { useRouter } from 'next/navigation';
import { RenderBuilderInputs } from '@/Utils/RenderBuilderInputs';
import { BulderTabs } from '@/Structure/DefaultStructures';


const BuilderCustomizer = ({ customizePageData, setCustomizePageData, activeSection, setActiveSection }) => {
    const [openMenuId, setOpenMenuId] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [activeTab, setActiveTab] = useState("Editor");
    const [isOpen, setIsOpen] = useState(false);
    const { pages } = useSelector((state) => state.pages);
    const router = useRouter();
    const activeSectionRef = useRef(activeSection);

    useEffect(() => {
        activeSectionRef.current = activeSection;
    }, [activeSection]);
    
    const handleInputChange = (key, value) => {
        
        if (!activeSectionRef.current?.type) return;
        
        const updatedSectionData = {
            ...activeSectionRef.current.sectionData,
            [key]: value,
        };
        console.log(updatedSectionData,key , value , "iwdchb");

        const updatedActiveSection = {
            ...activeSectionRef.current,
            sectionData: updatedSectionData,
        };

        // Update customizePageData first
        setCustomizePageData((prev) => {
            if (updatedActiveSection.type === "header") {
                return {
                    ...prev,
                    header: { ...updatedSectionData },
                };
            } else if (updatedActiveSection.type === "footer") {
                return {
                    ...prev,
                    footer: { ...updatedSectionData },
                };
            } else {
                const updatedSections = prev.sections.map((section) =>
                    section._id === updatedActiveSection._id ? updatedActiveSection : section
                );
                return {
                    ...prev,
                    sections: updatedSections,
                };
            }
        });

        // Update activeSection state
        setActiveSection(updatedActiveSection);
        activeSectionRef.current = updatedActiveSection;
    };

    const { items, handleDragEnd } = useDragAndDrop({
        initialItems: customizePageData?.sections || [],
        onReorder: (draggedItem, newIndex) => {
            setCustomizePageData(prev => {
                const sections = [...(prev.sections || [])];

                const currentIndex = sections.findIndex(s => s._id === draggedItem._id);
                if (currentIndex === -1) return prev; // If not found, do nothing

                const [movedSection] = sections.splice(currentIndex, 1);

                sections.splice(newIndex, 0, movedSection);
                const updatedSections = sections.map((section, index) => ({
                    ...section,
                    order: index + 1,
                }));

                return {
                    ...prev,
                    sections: updatedSections,
                };
            });
        },
    });

    const handleAddSection = (newSection) => {
        insertSection(setCustomizePageData, newSection, selectedOrder)
    }

    return (
        <div className=' !h-[calc(100vh-60px)] !w-[350px] flex bg-white'>
            <div className=' w-[50px] h-full border-r p-1.5 flex flex-col justify-start gap-2'>
                {BulderTabs?.map((tab, index) => (
                    <div key={index} onClick={() => setActiveTab(tab?.name)} data-tooltip-id='customize' data-tooltip-content={tab?.name} className={`text-[20px] aspect-square text-gray-700 flex transition-all cursor-pointer rounded-md justify-center items-center p-2 ${activeTab === tab?.name ? 'bg-gray-200' : 'hover:bg-gray-100'}`}>
                        {tab?.icon}
                    </div>
                ))}
            </div>

            <div className='h-full w-full flex-1 border-r'>
                {!activeSection ? (
                    <div className='border-b h-full '>
                        <div className='flex justify-start items-center gap-1  h-[55px] text-[#323232] border-b p-3'>
                            <p className="text-[18px] font-medium text-gray-700 flex flex-1 items-center gap-1 "><CiFileOn /> {customizePageData?.name}
                            </p>
                            <PopupMenu2
                                data={pages?.map((page) => ({
                                    icon: <CiFileOn />,
                                    name: page?.name,
                                    action: () => { router.push(`./customize?page=${page?.slug}`) },
                                }))}
                                trigger={<IoIosArrowDown className="!text-[30px] select-none cursor-pointer bg-gray-100 p-2 rounded-md" />}
                            />
                        </div>
                        <div className='h-[calc(100vh_-_115px)] overflow-y-auto customScroll'>
                            {customizePageData?.isHeaderFooter && (
                                <BuilderSideBarCard label={null}>
                                    <GlobalSectionCard
                                        globalSectionName={'header'}
                                        globalSection={SectionStructure?.['header']}
                                        openMenuId={openMenuId}
                                        setOpenMenuId={setOpenMenuId}
                                        sectionActions={[]}
                                        setActiveSection={setActiveSection}
                                        customizePageData={customizePageData}
                                    />
                                </BuilderSideBarCard>
                            )}
                            <BuilderSideBarCard label={null}>
                                <DragAndDropWrapper items={items} handleDragEnd={handleDragEnd}>
                                    {(section, index, { provided, snapshot }) => (
                                        <div key={section?._id}>
                                            {customizePageData?.isEditable && (
                                                <SectionAddAnimationLine
                                                    selectedOrder={selectedOrder}
                                                    setSelectedOrder={setSelectedOrder}
                                                    index={index}
                                                    setIsOpen={setIsOpen}
                                                />
                                            )}
                                            <SectionItemCard
                                                provided={provided}
                                                snapshot={snapshot}
                                                openMenuId={openMenuId}
                                                setOpenMenuId={setOpenMenuId}
                                                section={section}
                                                setActiveSection={setActiveSection}
                                                removeSection={() => removeSection(setCustomizePageData, section?._id)}
                                                toggleSectionVisibility={() => toggleSectionVisibility(setCustomizePageData, section?._id)}
                                                duplicateSection={() => duplicateSection(setCustomizePageData, section?._id)}
                                                isEditable={customizePageData?.isEditable}
                                            />
                                        </div>
                                    )}
                                </DragAndDropWrapper>
                                {customizePageData?.isEditable && (
                                    <Button
                                        icon={<MdOutlineAddCircleOutline />}
                                        label='Add New Section'
                                        variant='text'
                                        size='small'
                                        className='!w-full text-start mt-[10px] !bg-gray-100 hover:!bg-gray-200 !border'
                                        action={() => {
                                            setSelectedOrder(customizePageData?.sections?.length + 1);
                                            setIsOpen(true);
                                        }}
                                    />
                                )}
                            </BuilderSideBarCard>
                            {customizePageData?.isHeaderFooter && (
                                <BuilderSideBarCard label={null}>
                                    <GlobalSectionCard
                                        globalSectionName={'footer'}
                                        globalSection={SectionStructure?.['footer']}
                                        openMenuId={openMenuId}
                                        setOpenMenuId={setOpenMenuId}
                                        onClick={setActiveSection}
                                        sectionActions={[]}
                                        setActiveSection={setActiveSection}
                                        customizePageData={customizePageData}
                                    />
                                </BuilderSideBarCard>
                            )}

                            {!customizePageData?.isEditable && (<p className='text-textTC text-sm p-3'>This page is Uneditable, you cannot add or delete sections here</p>)}
                        </div>
                    </div>
                ) : (
                    <div className='h-full flex-1'>
                        <div className='flex justify-start items-center gap-1 h-[55px]  text-[#323232] border-b p-3'>
                            <IconButton action={() => setActiveSection(null)} className={'!text-[14px] bg-gray-100 hover:bg-gray-200 p-1.5 rounded-md'} icon={<IoIosArrowBack />} />
                            <p className='flex gap-1 items-center text-lg font-semibold'>{activeSection?.name}</p>
                        </div>
                        <div className="h-[calc(100vh_-_115px)] overflow-y-auto customScroll">
                            {(SectionStructure[activeSection?.type]?.fields || []).map(
                                ({ name, placeholder, input, options, multiple, dependsOn, label, selectorName, limit, min, max }, index) => {
                                    if (dependsOn) {
                                        const { field: depField, value: expectedValue } = dependsOn;
                                        if (activeSection?.sectionData?.[depField] !== expectedValue) {
                                            return null;
                                        }
                                    }
                                    return (
                                        <BuilderSideBarCard key={index} label={label || placeholder}>
                                            {RenderBuilderInputs({ name, placeholder, input, multiple, options, selectorName, min, max, limit, formData: activeSection, handleInputChange: handleInputChange, })}
                                        </BuilderSideBarCard>
                                    )
                                }
                            )}
                        </div>
                    </div>
                )}

                <WidgetsModal
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    handleAddSection={handleAddSection}
                    selectedOrder={selectedOrder}
                    setSelectedOrder={setSelectedOrder}
                />

                <ThemeEditModal
                    isOpen={activeTab === "Theme Setting"}
                    setIsOpen={() => setActiveTab("Editor")}
                />

                <Tooltip id="customize" place="top" className="!text-[12px] z-[200]" />
            </div>
        </div>

    );
};



export default BuilderCustomizer;