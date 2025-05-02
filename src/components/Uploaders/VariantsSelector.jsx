import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { variationSuggestions } from '@/Structure/DefaultStructures';
import { useEffect, useState } from 'react';
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
import Checkbox from '../Actions/CheckBox';
import RadioButton from '../Actions/RadioButton';

const VariantsSelector = () => {
    const { variations } = useSelector((state) => state?.storeDetail?.storeDetail);

    const [selectedVariationNames, setSelectedVariationNames] = useState([]);
    const [selectedOptionsMap, setSelectedOptionsMap] = useState({});
    const [variants, setVariants] = useState([]);
    const [formData, setFormData] = useState([]);
    const [variantSelections, setVariantSelections] = useState({});
    const [openVariantIndex, setOpenVariantIndex] = useState(null);
    const [variantsLocked, setVariantsLocked] = useState(false);
    const [customVariationName, setCustomVariationName] = useState('');
    const [customOptionInputs, setCustomOptionInputs] = useState({});
    const [variationData, setVariationData] = useState(variations || []);

    // Add default suggestions on mount
    useEffect(() => {
        setVariationData(variations);
    }, [variations]);

    const toggleVariant = (index) => {
        setOpenVariantIndex((prev) => (prev === index ? null : index));
    };

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
        const trimmedName = customVariationName.trim();
        if (!trimmedName) return toast.error('Variation name is required');

        const exists = variationData.some(v => v.name === trimmedName);
        if (exists) return toast.error('Variation already exists');

        setVariationData(prev => [...prev, { name: trimmedName, options: [] }]);
        setCustomVariationName('');
    };

    const handleAddOptionToVariation = (variationName, newOption) => {
        // const newOption = customOptionInputs[variationName]?.trim();
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
                    options: [...variation.options, newOption],
                };
            })
        );

        // setCustomOptionInputs((prev) => ({ ...prev, [variationName]: '' }));
    };

    const handleRemoveOption = (variationName, optionToRemove) => {
        setVariationData((prev) =>
            prev.map((v) =>
                v.name === variationName
                    ? { ...v, options: v.options.filter((opt) => opt !== optionToRemove) }
                    : v
            )
        );
    };



    return (
        <div className="flex flex-col gap-4 w-full">
            <div className={`flex flex-col gap-5 ${variantsLocked ? 'opacity-50 pointer-events-none' : ''}`}>
                <div className='flex justify-between items-end w-full'>

                    <p className=" text-textTC">Add variations to use in this product</p>
                    <div className="flex gap-2 items-end">
                        <DropDown
                            defaultOptions={Object.keys(variationSuggestions)}
                            setSelectedOption={(opt) => setCustomVariationName(opt)}
                            selectedOption={customVariationName}
                            wantsCustomOption={true}
                            className='w-max h-[30px]'
                            placeholder='Add variation'
                        />
                        <button
                            onClick={handleAddNewVariation}
                            disabled={!customVariationName}
                            className={`flex items-center text-[13px] justify-center gap-1 outline-none border-none ${customVariationName ? 'text-primaryC cursor-pointer' : 'text-gray-400 cursor-not-allowed'}`}>
                            <IoMdAdd />
                            Add Variation
                        </button>
                    </div>
                </div>

                {variationData.length > 0 ? (
                    <>
                        <div>
                            <div className='grid grid-cols-8 text-start gap-4 font-bold border-y py-[10px] text-textTC'>
                                <p className="flex items-center gap-1">
                                    Name
                                    <InfoTooltip
                                        id="variation-name-tooltip"
                                        content="The label of the variation, like Size, Color, or Material."
                                    />
                                </p>
                                <p className='col-span-4 flex items-center gap-1'>
                                    Options
                                    <InfoTooltip
                                        id="variation-options-tooltip"
                                        content="These are the specific values under this variation, like Small, Medium, Large for Size."
                                    />
                                </p>
                                <p className='col-span-3'>Actions</p>
                            </div>
                            {variationData.map(({ name, options }) => {
                                return (
                                    <div key={name} className='grid grid-cols-8 gap-4 border-b py-[15px]'>
                                        <p>{name}</p>

                                        <div className='flex flex-wrap items-center gap-1 col-span-4'>
                                            {options?.length === 0 ? (
                                                <span className='text-sm px-2 text-textTC flex items-center gap-1'>
                                                    No Option Found
                                                </span>
                                            ) : (options?.map((option) => (
                                                <span key={option} className='text-sm bg-borderC px-2 rounded-md text-textTC flex items-center gap-1'>
                                                    {option} <VscClose onClick={() => handleRemoveOption(name, option)} className='text-textTC cursor-pointer' />
                                                </span>
                                            ))
                                            )}
                                        </div>

                                        <div className=' w-full flex  col-span-3 gap-2 items-start'>
                                            <div className=' w-full flex gap-2 items-end'>

                                                <DropDown
                                                    key={variationData.find((v) => v.name === name)?.options.join(',') || ''}
                                                    defaultOptions={
                                                        (variationSuggestions?.[name] || []).filter(
                                                            (opt) =>
                                                                !variationData.find((v) => v.name === name)?.options.includes(opt)
                                                        )
                                                    }
                                                    setSelectedOption={(opt) => {
                                                        handleAddOptionToVariation(name, opt);
                                                    }}
                                                    selectedOption={''}
                                                    wantsCustomOption={true}
                                                    placeholder='Add option'
                                                    className='w-max h-[30px]'
                                                />

                                                <IconButton
                                                    action={() => {
                                                        const updated = variationData.filter((v) => v.name !== name);
                                                        setVariationData(updated);
                                                    }}
                                                    icon={<AiOutlineDelete />}
                                                    tooltipLabel={'Delete'}
                                                    className={'text-red-500 text-xl'}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                ) : (
                    <div className='flex justify-center py-[50px] items-center gap-2 text-textTC'>
                        <p>No variations added yet</p>
                    </div>
                )}
            </div>

            <div onClick={() => setVariantsLocked(!variantsLocked)} className={`flex justify-end ${variationData.length === 0 && 'opacity-50'}`}>
                {/* <ToggleSwitch
                    defaultChecked={false}
                    onChange={(val) => setVariantsLocked(val)}
                    isDisabled={variationData.length === 0}
                    message="Please add at least one variation and option"
                    label=""
                /> */}
                {/* <RadioButton options={} label={`Set different prices for each combination of ${variationData.map(v => v.name).join(" and ")}`} isChecked={variantsLocked} setIsCheck={(val) => setVariantsLocked(val)} /> */}
                <p className='text-primaryC cursor-pointer hover:opacity-85 flex items-center gap-1'>
                    Did you want to set different prices for each combination of {variationData.map(v => v.name).join(" and ")}
                    <InfoTooltip
                        id="price-variant-tooltip"
                        content="You can assign different prices and images for each product variation combination. For example, you can set different prices for each Size and Material pair."
                    />
                </p>

            </div>

            {/* Variant Combinations Section */}
            {variantsLocked && (
                // <div className="border-t pt-4">
                //     <div className="flex gap-3 flex-wrap mb-4">
                //         {selectedVariationNames.map((variationName) => (
                //             <DropDown
                //                 key={variationName}
                //                 label={variationName}
                //                 defaultOptions={[`Any ${variationName}`, ...(selectedOptionsMap[variationName] || [])]}
                //                 selectedOption={variantSelections[variationName] || `Any ${variationName}`}
                //                 setSelectedOption={(val) => {
                //                     setVariantSelections((prev) => ({ ...prev, [variationName]: val }));
                //                 }}
                //             />
                //         ))}
                //         <Button label="Add Variant" action={handleAddVariant} size="small" />
                //     </div>

                //     {variants.length > 0 && (
                //         <div className="space-y-4">
                //             <p className="font-medium text-lg">Variants</p>
                //             {variants.map((variant, i) => {
                //                 const isOpen = openVariantIndex === i;
                //                 return (
                //                     <div key={i} className="border rounded">
                //                         <div
                //                             className="flex justify-between items-center p-3 cursor-pointer"
                //                             onClick={() => toggleVariant(i)}
                //                         >
                //                             <div className="text-sm font-medium">
                //                                 #{i + 1}{' '}
                //                                 {Object.entries(variant.options).map(([k, v]) => (
                //                                     <span key={k} className="mr-2">{`${k}: ${v}`}</span>
                //                                 ))}
                //                             </div>
                //                             <div className="text-xl">{isOpen ? <FiChevronUp /> : <FiChevronDown />}</div>
                //                         </div>

                //                         {isOpen && (
                //                             <div className="p-3 space-y-3">
                //                                 <ImageUploader
                //                                     setImage={(e) => {
                //                                         const updated = [...variants];
                //                                         updated[i].image = e.target.value;
                //                                         setVariants(updated);
                //                                     }}
                //                                     image={variant.image}
                //                                 />
                //                                 <div className="flex gap-2">
                //                                     <FormInput
                //                                         type="number"
                //                                         placeholder="Price"
                //                                         value={variant.price}
                //                                         handleChange={(e) => {
                //                                             const updated = [...variants];
                //                                             updated[i].price = e.target.value;
                //                                             setVariants(updated);
                //                                         }}
                //                                     />
                //                                     <FormInput
                //                                         type="number"
                //                                         placeholder="Stock"
                //                                         value={variant.stock || ''}
                //                                         handleChange={(e) => {
                //                                             const updated = [...variants];
                //                                             updated[i].stock = e.target.value;
                //                                             setVariants(updated);
                //                                         }}
                //                                     />
                //                                 </div>
                //                             </div>
                //                         )}
                //                     </div>
                //                 );
                //             })}
                //         </div>
                //     )}
                // </div>
                <VariantCombinationTable variationData={variationData} />
            )}
        </div>
    );
};

export default VariantsSelector;
