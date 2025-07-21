'use client';
import React, { useEffect, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import DragAndDropWrapper, { useDragAndDrop } from '@/Hooks/useDragAndDrop';
import WidgetsModal from '../Modals/WidgetsModal';
import { IoIosArrowBack, IoIosArrowDown } from 'react-icons/io';
import IconButton from '../Actions/IconButton';
import { TbCreditCardPay } from 'react-icons/tb';
import Button from '../Actions/Button';
import { ecommercePages, PageStructure } from '@/Structure/DefaultStructures';
import FormInput from '@/components/Forms/FormInput';
import FaqUploader from '@/components/Uploaders/FaqUploader';
import TextEditor from '@/components/Uploaders/TextEditor';
import DropDown from '@/components/Actions/DropDown';
import MultiSelectDropdown from '@/components/Actions/MultiSelectDropdown';
import { SectionStructure } from '@/Structure/SectionStructure';
import PopupMenu2 from '../Modals/PopupMenu2';
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
import { CiFileOn } from 'react-icons/ci';
import ImageSelector from '../Uploaders/ImageSlector';
import RangeInput from '../Forms/RangeInput';
import { useSelector } from 'react-redux';

const bulderTabs = [
    { name: 'editor', icon: <TbCreditCardPay /> },
    // { name: 'setting', icon: <TbSettings /> },
]

const BuilderCustomizer = ({ customizePageData, setCustomizePageData, activeSection, setActiveSection }) => {
    const [openMenuId, setOpenMenuId] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [activeTab, setActiveTab] = useState("editor");
    const [isOpen, setIsOpen] = useState(false);
    // const { pages } = useSelector((state) => state.pages);


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


    const handleInputChange = (key, value) => {
        // Step 1: Create updated active section
        const updatedActiveSection = {
            ...activeSection,
            sectionData: {
                ...activeSection.sectionData,
                [key]: value,
            },
        };

        // Step 2: Update activeSection state
        setActiveSection(updatedActiveSection);

        // Step 3: Update customizePageData with updated active section
        setCustomizePageData((prev) => ({
            ...prev,
            sections: prev.sections.map((section) =>
                section._id === updatedActiveSection._id ? updatedActiveSection : section
            ),
        }));
    };


    useEffect(() => {
        // console.log(activeSection, "🦍🦍🦍");
    }, [activeSection])



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
        insertSection(setCustomizePageData, newSection, selectedOrder)
    }

    const renderComponents = ({ name, placeholder, input, options, multiple, dependsOn, formData }) => {

        if (input === "text" || input === "number") {
            return (
                <FormInput
                    type={input}
                    key={name}
                    value={formData?.sectionData?.[name] ?? ""}
                    label={null}
                    layout='label'
                    placeholder={placeholder}
                    size='editor'
                    required={false}
                    onChange={(e) => handleInputChange(name, e.target.value)}
                />
            );
        }

        if (input === "textEditor") {
            return (
                <TextEditor
                    key={name}
                    editorContent={formData?.sectionData?.[name]}
                    setEditorContent={(value) => handleInputChange(name, value)}
                />
            );
        }

        if (input === "pillSelector") {
            return (
                <PillSelector
                    data={options}
                    selectedValue={formData?.sectionData?.[name]}
                    setSelectedValue={(value) => handleInputChange(name, value)}
                    key={name}
                />
            );
        }

        if (input === "range") {
            return (
                <RangeInput
                    label={`${name}`}
                    min={2}
                    max={8}
                    range={formData?.sectionData?.[name]}
                    setRange={(value) => handleInputChange(name, value)}
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

        if (input === "ImageSelector") {
            return (
                <ImageSelector
                    size='large'
                    label={null}
                    key={name}
                    multiple={multiple}
                    image={formData?.sectionData?.[name]}
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

        if (input === 'dataSelectorList') {
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
                            <p className="text-[18px] font-medium text-gray-700 flex flex-1 items-center gap-1 "><CiFileOn /> {customizePageData?.name}
                            </p>
                            <PopupMenu2
                                data={ecommercePages.map((page) => ({
                                    icon: <CiFileOn />,
                                    name: page?.title,
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
                                        onClick={setActiveSection}
                                        sectionActions={sectionActions}
                                        setActiveSection={setActiveSection}
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
                                    label='Add New Section'
                                    variant='text'
                                    size='small'
                                    className='!w-full text-start mt-[10px] !bg-gray-100 hover:!bg-gray-200 !border'
                                    action={() => {
                                        setSelectedOrder(customizePageData?.sections?.length + 1);
                                        setIsOpen(true);
                                    }}
                                />
                            </BuilderSideBarCard>
                            {customizePageData?.isHeaderFooter && (
                                <BuilderSideBarCard label={null}>
                                    <GlobalSectionCard
                                        globalSectionName={'footer'}
                                        globalSection={SectionStructure?.['footer']}
                                        openMenuId={openMenuId}
                                        setOpenMenuId={setOpenMenuId}
                                        onClick={setActiveSection}
                                        sectionActions={sectionActions}
                                        setActiveSection={setActiveSection}
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
                                ({ name, placeholder, input, options, multiple, dependsOn, label }, index) => {
                                    if (dependsOn) {
                                        const { field: depField, value: expectedValue } = dependsOn;
                                        if (activeSection?.sectionData?.[depField] !== expectedValue) {
                                            return null;
                                        }
                                    }
                                    return (
                                        <BuilderSideBarCard key={index} label={label || placeholder}>
                                            {renderComponents({ name, placeholder, input, multiple, options, dependsOn, formData: activeSection })}
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

                <Tooltip id="customize" place="top" className="!text-[12px] z-[200]" />
            </div>
        </div>

    );
};



export default BuilderCustomizer;