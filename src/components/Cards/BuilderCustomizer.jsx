'use client';
import React, { useEffect, useState } from 'react';
import { RxSection } from 'react-icons/rx';
import { Tooltip } from 'react-tooltip';
import { LuPlus } from 'react-icons/lu';
import { useSelector } from 'react-redux';
import DragAndDropWrapper, { useDragAndDrop } from '@/Hooks/useDragAndDrop';
import WidgetsModal from '../Modals/WidgetsModal';
import { IoIosArrowBack } from 'react-icons/io';
import IconButton from '../Actions/IconButton';
import { TbCreditCardPay } from 'react-icons/tb';
import Button from '../Actions/Button';
import { PageStructure } from '@/Structure/DefaultStructures';
import FormInput from '@/components/Forms/FormInput';
import FaqUploader from '@/components/Uploaders/FaqUploader';
import ImageUploader from '@/components/Uploaders/ImageUploader';
import TextEditor from '@/components/Uploaders/TextEditor';
import DropDown from '@/components/Actions/DropDown';
import MultiSelectDropdown from '@/components/Actions/MultiSelectDropdown';
import { SectionStructure } from '@/Structure/SectionStructure';
import PopupMenu2 from '../Modals/PopupMenu2';
import { IoHomeOutline } from 'react-icons/io5';
import { BsThreeDots } from 'react-icons/bs';
import MultiImageUploader from '../Uploaders/MultiImageUploader';
import { HiOutlineEye, HiOutlineEyeSlash, HiOutlinePencilSquare, HiOutlineTrash } from 'react-icons/hi2';
import { HiOutlineDuplicate } from 'react-icons/hi';
import ButtonBlock from '../Blocks/ButtonBlock';
import DescriptionBlock from '../Blocks/DescriptionBlock';
import HeadingBlock from '../Blocks/HeadingBlock';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import { duplicateSection, insertSection, removeSection, toggleSectionVisibility } from '@/Utils/BuilderUtils/BuilderUtilsFuctions';
import { BuilderSideBarCard, GlobalSectionCard, SectionAddAnimationLine, SectionItemCard } from '@/Utils/BuilderUtils/BuilderUtilsComponents';
import PillSelector from '../Actions/PillSelector';

const bulderTabs = [
    { name: 'editor', icon: <TbCreditCardPay /> },
    // { name: 'setting', icon: <TbSettings /> },
]

const BuilderCustomizer = ({ customizePageData, setCustomizePageData, activeSection, setActiveSection }) => {
    const [openMenuId, setOpenMenuId] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [activeTab, setActiveTab] = useState("editor");
    const [isOpen, setIsOpen] = useState(false);


    const sectionActions = [
        {
            name: 'Remove',
            icon: <HiOutlineTrash />,
            action: (i) => console.log("hello", i),
        },
        {
            name: 'Hide',
            icon: <HiOutlineEyeSlash />,
        },
        {
            name: 'Edit',
            icon: <HiOutlinePencilSquare />,
        },
        {
            name: 'Dublicate',
            icon: <HiOutlineDuplicate />,
        },
    ];

    useEffect(() => {
        if (PageStructure) setCustomizePageData(PageStructure);
    }, [PageStructure]);

    const handleInputChange = (key, value) => {
        setCustomizePageData((prev) => ({
            ...prev,
            sections: prev.sections.map((section) =>
                section._id === activeSection?._id
                    ? {
                        ...section,
                        content: {
                            ...section.content,
                            [key]: value,
                        },
                    }
                    : section
            ),
        }));
    };


    const { items, handleDragEnd } = useDragAndDrop({
        initialItems: customizePageData?.sections || [],
        onReorder: (draggedItem, newIndex) => {
            setCustomizePageData(prev => {
                const sections = [...(prev.sections || [])];

                // Find index of dragged item using _id
                const currentIndex = sections.findIndex(s => s._id === draggedItem._id);
                if (currentIndex === -1) return prev; // If not found, do nothing

                // Remove dragged item
                const [movedSection] = sections.splice(currentIndex, 1);

                // Insert at new index
                sections.splice(newIndex, 0, movedSection);

                // Update `order` values after reordering
                const updatedSections = sections.map((section, index) => ({
                    ...section,
                    order: index + 1, // 1-based ordering
                }));

                return {
                    ...prev,
                    sections: updatedSections,
                };
            });
        },
    });

    const handleAddSection = (newSection) => {
        insertSection(setCustomizePageData , newSection, selectedOrder)
    }



    const renderComponents = ({ name, placeholder, input, options, dependsOn, formData }) => {

        if (dependsOn) {
            const { field: depField, value: expectedValue } = dependsOn;
            if (activeSection?.[depField] !== expectedValue) {
                return null;
            }
        }

        if (input === "text" || input === "number") {
            return (
                <FormInput
                    type={input}
                    key={name}
                    value={formData?.[name] ?? ""}
                    label={null}
                    layout='label'
                    placeholder={placeholder}
                    size='editor'
                    required={false}
                    handleChange={(e) => handleInputChange(name, e.target.value)}
                />
            );
        }

        if (input === "textEditor") {
            return (
                <TextEditor
                    key={name}
                    editorContent={formData?.[name]}
                    setEditorContent={(value) => handleInputChange(name, value)}
                />
            );
        }

        if (input === "pillSelector") {
            return (
                <PillSelector
                    data={options}
                    selectedValue={formData?.[name]}
                    setSelectedValue={(value) => handleInputChange(name, value)}
                    key={name}
                />
            );
        }

        if (input === "ButtonBlock") {
            return (
                <ButtonBlock
                    selectedValue={formData?.[name] || {}}
                    setSelectedValue={(value) => handleInputChange(name, value)}
                    key={name}
                />
            );
        }

        if (input === "HeadingBlock") {
            return (
                <HeadingBlock
                    selectedValue={formData?.[name] || {}}
                    setSelectedValue={(value) => handleInputChange(name, value)}
                    key={name}
                />
            );
        }

        if (input === "DescriptionBlock") {
            return (
                <DescriptionBlock
                    selectedValue={formData?.[name] || {}}
                    setSelectedValue={(value) => handleInputChange(name, value)}
                    key={name}
                />
            );
        }

        if (input === "ButtonBlock") {
            return (
                <ButtonBlock
                    selectedValue={formData?.[name] || {}}
                    setSelectedValue={(value) => handleInputChange(name, value)}
                    key={name}
                />
            );
        }

        if (input === "faqs") {
            return (
                <FaqUploader
                    key={name}
                    initialFaqs={formData?.[name]}
                    setFaqs={(faqs) => handleInputChange(name, faqs)}
                />
            );
        }

        if (input === "imageUploader") {
            return (
                <ImageUploader
                    size='medium'
                    label={null}
                    key={name}
                    image={formData?.[name]}
                    setImage={(image) => handleInputChange(name, image)}
                />
            );
        }

        if (input === "multiImageUploader") {
            return (
                <MultiImageUploader
                    key={name}
                    images={formData?.[name]}
                    setImages={(images) => handleInputChange(name, images)}
                />
            );
        }

        if (input === "dropdown") {
            return (
                <DropDown
                    defaultOptions={options}
                    selectedOption={formData?.[name]}
                    setSelectedOption={(option) => handleInputChange(name, option)}
                    key={name}
                    label={placeholder}
                    layout={'label'}
                    className='!outline-primaryC !bg-transparent'
                />
            );
        }

        if (input === "multiDropdown") {
            const optionsData =
                options === "products"
                    ? products.map((product) => ({ label: product?.name, value: product?._id }))
                    : options === "collections"
                        ? collections.map((Collection) => Collection?.slug)
                        : [];

            return (
                <MultiSelectDropdown
                    key={name}
                    wantsCustomOption={false}
                    defaultOptions={optionsData}
                    selectedOptions={Array.isArray(formData?.[name]) ? formData?.[name] : []}
                    setSelectedOptions={(options) => handleInputChange(name, options)}
                    placeholder={placeholder}
                    className='!outline-primaryC !bg-transparent'
                />
            );
        }

        if (input === 'dataSelectionList') {
            <DataSelectionList
                selectedData={[]}
                setSelectedData={() => { }}
                data={[
                    {
                        _id: "1",
                        image: "https://i.pravatar.cc/100?img=1",
                        name: "Dan Rowden",
                        subText: "@dr",
                    },
                    {
                        _id: "2",
                        image: "https://placekitten.com/100/100",
                        name: "Product Hunt",
                        subText: "@ProductHunt",
                    },
                    {
                        _id: "3",
                        image: "https://i.pravatar.cc/100?img=3",
                        name: "Janel",
                        subText: "@JanelSGM",
                    },
                ]}
            />
        }

        if (input === 'dataSelectionList') {
            <DataSelectionList
                selectedData={[]}
                setSelectedData={() => { }}
                data={[
                    {
                        _id: "1",
                        image: "https://i.pravatar.cc/100?img=1",
                        name: "Dan Rowden",
                        subText: "@dr",
                    },
                    {
                        _id: "2",
                        image: "https://placekitten.com/100/100",
                        name: "Product Hunt",
                        subText: "@ProductHunt",
                    },
                    {
                        _id: "3",
                        image: "https://i.pravatar.cc/100?img=3",
                        name: "Janel",
                        subText: "@JanelSGM",
                    },
                ]}
            />
        }

        return null;
    }


    return (
        <div className=' !h-[calc(100vh-60px)] !w-[350px] flex bg-white'>
            <div className=' w-[50px] h-full border-r p-1.5 flex flex-col justify-start gap-2'>
                {bulderTabs?.map((tab, index) => (
                    <div key={index} onClick={() => setActiveTab(tab?.name)} data-tooltip-id='customize' data-tooltip-content={tab?.name} className={`text-[20px] aspect-square text-gray-700 flex transition-all cursor-pointer rounded-md justify-center items-center p-2 ${activeTab === tab?.name ? 'bg-gray-200' : 'hover:bg-gray-100'}`}>
                        {tab?.icon}
                    </div>
                ))}
            </div>

            <div className='h-full w-full flex-1 border-r'>
                {!activeSection ? (
                    <div className='border-b h-full '>
                        <div className='flex justify-start items-center gap-1  h-[55px] text-[#323232] border-b p-3'>
                            <IoHomeOutline className='m-1' />
                            <p className='flex-1 text-lg font-semibold'>Home Page</p>
                        </div>
                        <div className='h-[calc(100vh_-_115px)] overflow-y-auto customScroll'>
                            {customizePageData?.isHeaderFooter && (
                                <BuilderSideBarCard label={'Header'}>
                                    <GlobalSectionCard
                                        globalSectionName={'header'}
                                        globalSection={SectionStructure?.['header']}
                                        openMenuId={openMenuId}
                                        setOpenMenuId={setOpenMenuId}
                                        onClick={setActiveSection}
                                        sectionActions={sectionActions}
                                    />
                                </BuilderSideBarCard>
                            )}
                            <BuilderSideBarCard label={'Sections'}>
                                <DragAndDropWrapper items={items} handleDragEnd={handleDragEnd}>
                                    {(section, index, { provided, snapshot }) => (
                                        <div key={section?._id}>
                                            <SectionAddAnimationLine
                                                selectedOrder={selectedOrder}
                                                setSelectedOrder={setSelectedOrder}
                                                index={index}
                                                setIsOpen={setIsOpen}
                                            />
                                            <SectionItemCard
                                                provided={provided}
                                                snapshot={snapshot}
                                                openMenuId={openMenuId}
                                                setOpenMenuId={setOpenMenuId}
                                                section={section}
                                                setActiveSection={setActiveSection}
                                                sectionActions={[
                                                    {
                                                        name: 'Remove',
                                                        icon: <HiOutlineTrash />,
                                                        action: () => removeSection(setCustomizePageData, section?._id),
                                                    },
                                                    {
                                                        name: section?.isVisible ? 'Hide' : 'UnHide',
                                                        icon: section?.isVisible ? <HiOutlineEyeSlash /> : <HiOutlineEye />,
                                                        action: () => toggleSectionVisibility(setCustomizePageData, section?._id),
                                                    },
                                                    {
                                                        name: 'Edit',
                                                        icon: <HiOutlinePencilSquare />,
                                                        action: () => duplicateSection(setCustomizePageData, section?._id),
                                                    },
                                                    {
                                                        name: 'Dublicate',
                                                        icon: <HiOutlineDuplicate />,
                                                    },
                                                ]}
                                            />
                                        </div>
                                    )}
                                </DragAndDropWrapper>
                                <Button
                                    icon={<MdOutlineAddCircleOutline />}
                                    label='Add section'
                                    variant='text'
                                    size='small'
                                    className='!w-full text-start mt-[10px] !bg-gray-100 hover:!bg-gray-200'
                                    action={() => {
                                        setSelectedOrder(customizePageData?.sections?.length + 1);
                                        setIsOpen(true);
                                    }}
                                />
                            </BuilderSideBarCard>
                            {customizePageData?.isHeaderFooter && (
                                <BuilderSideBarCard label={'Footer'}>
                                    <GlobalSectionCard
                                        globalSectionName={'footer'}
                                        globalSection={SectionStructure?.['footer']}
                                        openMenuId={openMenuId}
                                        setOpenMenuId={setOpenMenuId}
                                        onClick={setActiveSection}
                                        sectionActions={sectionActions}
                                    />
                                </BuilderSideBarCard>
                            )}
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
                                ({ name, placeholder, input, options, dependsOn, label }, index) => (
                                    <BuilderSideBarCard key={index} label={label || placeholder}>
                                        {renderComponents({ name, placeholder, input, options, dependsOn, formData: activeSection })}
                                    </BuilderSideBarCard>
                                )
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

                <Tooltip id="customize" place="top" className="!text-[12px] z-[200]" />
            </div>
        </div>

    );
};



export default BuilderCustomizer;