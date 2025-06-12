import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { variationSuggestions } from '@/Structure/DefaultStructures';
import { useEffect, useRef, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import ImageUploader from './ImageUploader';
import { VscClose } from 'react-icons/vsc';
import InfoTooltip from '../Actions/InfoTooltip';
import { IoMdAdd } from 'react-icons/io';
import IconButton from '../Actions/IconButton';
import { toast } from 'react-toastify';
import FormInput from '../Forms/FormInput';
import DropDown from '../Actions/DropDown';
import Button from '../Actions/Button';
import ToggleSwitch from '../Actions/ToggleSwitch';
import VariantCombinationTable from '../Tables/VariantCombinationTable';
import { motion, AnimatePresence } from 'framer-motion';
import Checkbox from '../Actions/CheckBox';
import RadioButton from '../Actions/RadioButton';
import { FaChevronDown } from 'react-icons/fa';
import { GoChevronDown } from 'react-icons/go';
import MultiSelectDropdown from '../Actions/MultiSelectDropdown';
import { LuCirclePlus } from 'react-icons/lu';
import MultiSelectCheckbox from '../Actions/MultiSelectCheckbox';
import { RxDragHandleDots2 } from 'react-icons/rx';
import VariationAddManager from '../Forms/VariationAddManager';

const VariantsSelector = () => {
    // const { variations } = useSelector((state) => state?.storeDetail?.storeDetail);

    // const variations = []

    const [selectedVariationNames, setSelectedVariationNames] = useState([]);
    const [selectedOptionsMap, setSelectedOptionsMap] = useState({});
    const [variants, setVariants] = useState([]);
    const [formData, setFormData] = useState([]);
    const [variantSelections, setVariantSelections] = useState({});
    const [openVariantIndex, setOpenVariantIndex] = useState(null);
    const [variantsLocked, setVariantsLocked] = useState(false);
    const [variationData, setVariationData] = useState([]);
    const variationRowRef = useRef({});

    // Add default suggestions on mount
    // useEffect(() => {
    //     setVariationData(variations);
    // }, [variations]);

    const toggleDarwer = (index) => {
        setOpenVariantIndex((prev) => (prev === index ? null : index));
    };

    useEffect(() => {
        console.log(variationData, "🦽🦽🦽🦽");
    }, [variationData])

    const removeInvalidVariants = (variationNames, optionsMap) => {
        const validCombinations = variants.filter((variant) =>
            variationNames.every((name) => optionsMap[name]?.includes(variant.options[name]))
        );
        setVariants(validCombinations);
    };

    const handleAddVariant = () => {
        const newOptions = selectedVariationNames.reduce((acc, name) => {
            acc[name] = variantSelections[name] || `Any ${name}`;
            return acc;
        }, {});

        const isDuplicate = variants.some((variant) =>
            selectedVariationNames.every((name) => variant.options[name] === newOptions[name])
        );

        if (isDuplicate) {
            toast.error('This variant already exists.');
            return;
        }

        const newVariant = {
            options: newOptions,
            price: '',
            stock: '',
            image: '',
        };

        setVariants([...variants, newVariant]);
        setOpenVariantIndex(variants.length);
    };

    const handleAddNewVariation = () => {
        // const trimmedName = customVariationName.trim();
        // if (!trimmedName) return toast.error('Variation name is required');

        // const exists = variationData.some(v => v.name === trimmedName);
        // if (exists) return toast.error('Variation already exists');

        // setVariationData(prev => [...prev, { name: trimmedName, options: [] }]);
        setVariationData((prev) => [
            ...prev,
            {
                name: '',
                options: [],
            },
        ]);

    };

    const handleAddOptionToVariation = (variationName, newOption) => {
        console.log(newOption, "customVariationName");
        if (!newOption) return;

        setVariationData((prevData) =>
            prevData.map((variation) => {
                if (variation.name !== variationName) return variation;

                const optionExists = variation.options.includes(newOption);
                if (optionExists) {
                    toast.error('Option already exists');
                    return variation;
                }

                return {
                    ...variation,
                    options: newOption,
                };
            })
        );
        toggleDarwer(variationName);
    };

    return (
        <div className="flex flex-col gap-4 w-full ">
            <div className={`flex flex-col gap-5 ${variantsLocked ? 'opacity-100 pointer-events-none' : ''}`}>

                <VariationAddManager variationData={variationData} setVariationData={setVariationData} variationSuggestions={variationSuggestions} />

                {!variationData.length > 1 ? (
                    <>
                        <div className=''>
                            <div className="overflow-x-auto max-w-full rounded-md border  h-[max-content]">
                                <div className="rounded-md min-w-full text-sm bg-lbgC">
                                    <div className="flex bg-secondaryC text-primaryC font-normal">
                                        <div className="w-[100px] px-4 py-2 whitespace-nowrap border-l">
                                            <div className="flex gap-2 items-center">
                                                Name
                                                <InfoTooltip
                                                    id="variation-name-tooltip"
                                                    content="The label of the variation, like Size, Color, or Material."
                                                />
                                            </div>
                                        </div>
                                        <div className="flex-1 px-4 py-2 sticky  border-l">
                                            <div className="flex gap-2 items-center">
                                                Options
                                                <InfoTooltip
                                                    id="variation-options-tooltip"
                                                    content="These are the specific values under this variation, like Small, Medium, Large for Size."
                                                />
                                            </div>
                                        </div>
                                        <div className="w-[350px] px-4 py-2 sticky right-0 border-l">Advance <span className='text-textTC text-[10px] '>(optional)</span></div>
                                    </div>

                                    {variationData.map(({ name, options }, i) => (
                                        <div
                                            key={name}
                                            className={`flex flex-col ${i % 2 === 0 ? 'bg-[#F8FAFB]' : 'bg-backgroundC'} ${openVariantIndex === i ? ' shaow-[0_0_6px_rgb(0,0,0,0.15)_inset] py-[15px] gap-4' : ''} border-b transition-all duration-300`}
                                        >
                                            <div className='flex w-full'>
                                                <div className="w-[100px] px-4 py-2 flex items-center whitespace-nowrap ">
                                                    {name}
                                                </div>
                                                <div className="flex-1 px-4 py-2 scale-75 origin-left ">
                                                    <MultiSelectDropdown
                                                        key={name}
                                                        defaultOptions={(variationSuggestions?.[name] || []).filter(
                                                            (opt) =>
                                                                !options.includes(opt)
                                                        )}
                                                        setSelectedOptions={(opt) => handleAddOptionToVariation(name, opt)}
                                                        selectedOptions={options}
                                                        wantsCustomOption={true}
                                                        placeholder="Add option"
                                                        className="!max-w-[350px] bg-transparent"
                                                    />
                                                </div>
                                                <div className="px-4 py-2 w-[350px] flex gap-2 justify-between items-center">
                                                    <div
                                                        onClick={() => toggleDarwer(i)}
                                                        className="flex gap-1 items-center text-textTC cursor-pointer hover:text-primaryC"
                                                    >
                                                        Set product configuration acc specific {name}
                                                        <GoChevronDown className={`${openVariantIndex === i ? 'rotate-180' : 'rotate-0'} transition-all`} />
                                                    </div>
                                                    <IconButton
                                                        action={() =>
                                                            setVariationData(variationData.filter((v) => v.name !== name))
                                                        }
                                                        icon={<AiOutlineDelete />}
                                                        tooltipLabel={'Delete Variation'}
                                                        className={'text-red-500 text-xl'}
                                                    />
                                                </div>
                                            </div>
                                            <div
                                                ref={(el) => (variationRowRef.current[i] = el)}
                                                style={{ height: openVariantIndex === i ? `${variationRowRef.current[i]?.scrollHeight + 10}px` : '0px' }}
                                                className={`transition-all duration-300  px-4   ${openVariantIndex === i ? 'flex flex-col gap-4 ' : 'overflow-hidden'}`}
                                            >

                                                <div className='branch ml-[10px]'>
                                                    <div className='flex pl-[70px] font-semibold'>
                                                        <p className='px-4 py-2 w-[150px]'>{name + 's'}</p>
                                                        <p className='px-4 py-2 w-[150px]'>Price</p>
                                                        <p className='px-4 py-2 w-[150px]'>Image</p>
                                                    </div>
                                                    {options?.map((option, index) => {
                                                        return (
                                                            <div key={index} className=" child flex ">
                                                                <div className=" px-4 py-2 w-[150px] whitespace-nowrap">
                                                                    {option}
                                                                </div>
                                                                <div className="px-4 py-2 w-[150px] ">
                                                                    <div className='flex gap-1'>
                                                                        {/* <img className='w-[20px] h-[20px]' src="https://img.icons8.com/fluency/48/price-tag--v1.png" alt="price-tag--v2" /> */}
                                                                        <input
                                                                            type="number"
                                                                            placeholder="Price"
                                                                            // value={comboData[key]?.price || ''}
                                                                            // onChange={(e) => handleChange(key, 'price', e.target.value)}
                                                                            className="w-24 border-b outline-none text-textTC rounded-none bg-transparent  px-2 py-1"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="px-4 py-2 w-[150px] ">
                                                                    <div className=' w-[200px] h-[30px] overflow-hidden'>
                                                                        <div className='origin-top-left scale-[0.3]'>
                                                                            <ImageUploader />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/* <div className="px-4 py-2 border even:bg-white  sticky right-0">
                                                                    <div className='flex gap-1'>
                                                                        <MultiSelectDropdown
                                                                            defaultOptions={['Image', 'Price', 'Stock']}
                                                                            setSelectedOptions={(opt) => handleAddOptionToVariation(name, opt)}
                                                                            selectedOptions={[]}
                                                                            wantsCustomOption={true}
                                                                            placeholder="Add Field"
                                                                            className="!max-w-[350px] bg-transparent"

                                                                        />

                                                                    </div>
                                                                </div> */}
                                                            </div>
                                                        );
                                                    })}
                                                </div>


                                                {/* <table className="min-w-full text-sm  border rounded-lg  box-content">
                                                    <thead className="">
                                                        <tr>
                                                            <th className="min-w-[110px] px-4 font-medium py-2 text-left whitespace-nowrap border">Options</th>
                                                            <th className="px-4 font-medium py-2 text-left sticky right-[140px] border">Price</th>
                                                            <th className="px-4 font-medium py-2 text-left sticky right-0 border">Image URL</th>
                                                            <th className="px-4 font-medium py-2 text-left sticky right-0 border">Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className='branch'>
                                                        {options?.map((option, index) => {
                                                            return (
                                                                <tr key={index} className="even:bg-whte">
                                                                    <td className="child px-4 py-2 border whitespace-nowrap">
                                                                        {option}
                                                                    </td>
                                                                    <td className="px-4 py-2 border bg-white  sticky right-[140px]">
                                                                        <div className='flex gap-1'>
                                                                            <img className='w-[20px] h-[20px]' src="https://img.icons8.com/fluency/48/price-tag--v1.png" alt="price-tag--v2" />
                                                                            <input
                                                                                type="number"
                                                                                placeholder="Price"
                                                                                // value={comboData[key]?.price || ''}
                                                                                // onChange={(e) => handleChange(key, 'price', e.target.value)}
                                                                                className="w-24 border-b outline-none text-textTC rounded-none bg-transparent  px-2 py-1"
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td className="px-4 py-2 border even:bg-white  sticky right-0">
                                                                        <div className=' w-[200px] h-[40px] overflow-hidden'>
                                                                            <div className='origin-top-left scale-[0.4]'>
                                                                                <ImageUploader />
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td className="px-4 py-2 border even:bg-white  sticky right-0">
                                                                        <div className='flex gap-1'>
                                                                            <MultiSelectDropdown
                                                                                defaultOptions={['Image', 'Price', 'Stock']}
                                                                                setSelectedOptions={(opt) => handleAddOptionToVariation(name, opt)}
                                                                                selectedOptions={[]}
                                                                                wantsCustomOption={true}
                                                                                placeholder="Add Field"
                                                                                className="!max-w-[350px] bg-transparent"

                                                                            />

                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </table> */}
                                                {options.length === 0 && (<p className='text-textTC text-center py-4'>No option found</p>)}
                                            </div>


























                                            {/* )} */}
                                        </div>
                                    ))}
                                </div>

                            </div>

                        </div>
                    </>
                ) : (
                    <></>
                    // <div className='flex justify-center py-[50px] items-center gap-2 text-textTC'>
                    //     <p>No variations added yet</p>
                    // </div>
                )}
            </div>

        </div >
    );
};

export default VariantsSelector;
