import React, { useEffect, useState } from 'react';
import MultiSelectDropdown from '../Actions/MultiSelectDropdown';
import MultiSelectCheckbox from '../Actions/MultiSelectCheckbox';
import ToggleSwitch from '../Actions/ToggleSwitch';
import FormInput from '../Forms/FormInput';
import { useSelector } from 'react-redux';
import DropDown from '../Actions/DropDown';
import Button from '../Actions/Button';
import ImageUploader from './ImageUploader';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { toast } from 'react-toastify';

const VariantsSelector = () => {
    const { variations } = useSelector((state) => state?.storeDetail?.storeDetail);
    const [selectedVariationNames, setSelectedVariationNames] = useState([]);
    const [selectedOptionsMap, setSelectedOptionsMap] = useState({});
    const [variants, setVariants] = useState([]);
    const [variantCombinations, setVariantCombinations] = useState([]);
    const [variantsLocked, setVariantsLocked] = useState(false);
    const [variantSelections, setVariantSelections] = useState({});
    const [openVariantIndex, setOpenVariantIndex] = useState(null);


    const toggleVariant = (index) => {
        setOpenVariantIndex(prev => (prev === index ? null : index));
    };



    const removeInvalidVariants = (variationNames, optionsMap) => {
        const validCombinations = variantCombinations.filter((variant) =>
            variationNames.every((name) => optionsMap[name]?.includes(variant.options[name]))
        );
        setVariantCombinations(validCombinations);
    };

    const handleAddVariant = () => {
        const newOptions = selectedVariationNames.reduce((acc, name) => {
            acc[name] = variantSelections[name] || `Any ${name}`;
            return acc;
        }, {});

        const isDuplicate = variants.some(
            (variant) =>
                selectedVariationNames.every(
                    (name) => variant.options[name] === newOptions[name]
                )
        );

        if (isDuplicate) {
            toast.error("This variant already exists.");
            return;
        }

        const newVariant = {
            options: newOptions,
            price: '',
            image: '',
        };

        setVariants([...variants, newVariant]);
        setOpenVariantIndex(variants.length);

    };



    useEffect(() => {
        console.log('Selected Variation Names:🛝', selectedVariationNames);
        console.log('Selected Options Map:🛝', selectedOptionsMap["Color"]);

    }, [selectedVariationNames, selectedOptionsMap])

    return (
        <div className="flex flex-col gap-3 w-full">
            {/* Upper Part: Variations Selection */}
            <div className={`flex flex-col gap-4 w-full items-start ${variantsLocked ? 'opacity-50 pointer-events-none' : ''}`}>
                <div className='w-full'>
                    <p className="text-left  mb-[5px] text-textTC text-sm">Choose variations to use in that product</p>
                    <MultiSelectDropdown
                        defaultOptions={variations.map((v) => v?.name) || []}
                        selectedOptions={selectedVariationNames}
                        setSelectedOptions={(val) => {
                            setSelectedVariationNames(val);
                            removeInvalidVariants(val, selectedOptionsMap);
                        }}
                        placeholder="Select global variations"
                    />

                </div>

                {selectedVariationNames.length > 0 && (
                    <div>
                        <p className="text-left w-full mb-[0px] text-textTC text-sm">Choose variation options to use in that product</p>
                        <div className="grid grid-cols-3 flex-col items-start w-full gap-4">
                            {selectedVariationNames.map((varName, index) => {
                                const currentOptions = variations.find((v) => v.name === varName)?.options || [];

                                return (
                                    <MultiSelectCheckbox
                                        key={index}
                                        options={currentOptions}
                                        selectedOptions={selectedOptionsMap[varName] || []}
                                        setSelectedOptions={(option) => {
                                            const updatedMap = { ...selectedOptionsMap, [varName]: option };
                                            setSelectedOptionsMap(updatedMap);
                                            removeInvalidVariants(selectedVariationNames, updatedMap);
                                        }}
                                        lable={`${varName}`}
                                    />
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* Toggle Switch */}
            <div className={`flex justify-end ${selectedVariationNames.length === 0 || selectedVariationNames.some((name) => (selectedOptionsMap[name] || []).length === 0) && 'opacity-50 '}`}>
                <ToggleSwitch
                    defaultChecked={false}
                    onChange={(val) => setVariantsLocked(val)}
                    isDisabled={
                        selectedVariationNames.length === 0 ||
                        selectedVariationNames.some((name) => (selectedOptionsMap[name] || []).length === 0)
                    }
                    message='Please add atleast one variation and option to enable'
                    label='Enable Variants'
                />
            </div>

            {/* Lower Part: Add Variants */}
            {variantsLocked && (
                <div className='border-t pt-[10px]'>
                    <div className="flex items-center gap-3">
                        {selectedVariationNames.map((variationName) => (
                            <DropDown
                                key={variationName}
                                label={variationName}
                                defaultOptions={[`Any ${variationName}`, ...selectedOptionsMap[variationName]]}
                                selectedOption={variantSelections[variationName] || `Any ${variationName}`}
                                setSelectedOption={(value) =>
                                    setVariantSelections((prev) => ({ ...prev, [variationName]: value }))
                                }
                            />
                        ))}
                        <Button
                            action={handleAddVariant}
                            size='small'
                            label='Add Variant'
                            className='max-w-[120px] !py-[9px]'
                        />
                    </div>

                    {variants.length > 0 && (
                        <div className="mt-5 space-y-3">
                            <p className="font-medium text-xl "> Variants</p>
                            {variants.map((variant, i) => {
                                const isOpen = openVariantIndex === i;

                                return (
                                    <div key={i} className="border rounded-md">
                                        {/* Header */}
                                        <div

                                            onClick={() => toggleVariant(i)}
                                            className="flex justify-between items-center p-3 cursor-pointer hover:bg-gray-100 transition"
                                        >
                                            <div className="text-sm font-medium">
                                                <span className='mr-2'>#{i + 1} </span>
                                                {Object.entries(variant.options).map(([k, v]) => (
                                                    <>
                                                        <span key={k} className="mr-2 text-[14px] font-light">{`${k}:`}</span>
                                                        <span key={k} className="mr-2 text-[16px]">{`${v} `}</span>
                                                    </>
                                                ))}
                                            </div>
                                            <div className="text-xl">
                                                {isOpen ? <FiChevronUp /> : <FiChevronDown />}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div
                                            className={`transition-all duration-300 overflow-hidden ${isOpen ? "max-h-[500px] p-3" : "max-h-0 px-3"
                                                }`}
                                        >
                                            {isOpen && (
                                                <div className="flex flex-col gap-3">
                                                    <ImageUploader
                                                        setImage={(e) => {
                                                            const updated = [...variants];
                                                            updated[i].image = e.target.value;
                                                            setVariants(updated);
                                                        }}
                                                        image={variant.image}
                                                    />
                                                    <div className="flex gap-2 w-full">
                                                        <FormInput
                                                            type="number"
                                                            name="price"
                                                            placeholder="Variant Price"
                                                            value={variant.price}
                                                            handleChange={(e) => {
                                                                const updated = [...variants];
                                                                updated[i].price = e.target.value;
                                                                setVariants(updated);
                                                            }}
                                                        />
                                                        <FormInput
                                                            type="number"
                                                            name="stock"
                                                            placeholder="Variant Stock"
                                                            value={variant.stock || ""}
                                                            handleChange={(e) => {
                                                                const updated = [...variants];
                                                                updated[i].stock = e.target.value;
                                                                setVariants(updated);
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}

                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default VariantsSelector;