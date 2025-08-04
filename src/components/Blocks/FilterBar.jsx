'use client';

import React, { useEffect, useState } from 'react';
import CustomRangeSlider from '../Actions/PriceRangeSlider';
import { VscClose } from 'react-icons/vsc';
import Button from '../Actions/Button';
import IconButton from '../Actions/IconButton';
import DropDown from '../Actions/DropDown';
import { useRouter, useSearchParams } from 'next/navigation';

const FilterBar = ({
    isOpen = false,
    setIsOpen = () => { },
    OnApplyFilter = () => { },
    standardFilters = false,
    variantsFilters = false,
    availableVariants = [],
    minPrice = 0,
    maxPrice = 1000,
}) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [selectedVariants, setSelectedVariants] = useState({});
    const [sortOption, setSortOption] = useState('');
    const [priceRange, setPriceRange] = useState([0, 1000]);

    // Lock body scroll when sidebar is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Toggle variant option selection
    const toggleVariantOption = (variantName, option) => {
        setSelectedVariants(prev => {
            const currentOptions = prev[variantName] || [];
            const exists = currentOptions.includes(option);

            const updatedOptions = exists
                ? currentOptions.filter(opt => opt !== option)
                : [...currentOptions, option];

            return {
                ...prev,
                [variantName]: updatedOptions,
            };
        });
    };

    const isSelected = (variantName, option) =>
        selectedVariants[variantName]?.includes(option);

    // Handle Apply: Update URL params
    const handleApplyFilter = () => {
        const params = new URLSearchParams(searchParams.toString());

        // Add variant filters
        Object.entries(selectedVariants).forEach(([variantName, options]) => {
            const key = variantName;
            if (options.length > 0) {
                params.set(key, options.join(','));
            } else {
                params.delete(key);
            }
        });

        // Add sort option
        if (sortOption) {
            params.set('sort', sortOption);
        } else {
            params.delete('sort');
        }

        // Add price range
        if (priceRange[0]) {
            params.set('minPrice', `${priceRange[0]}`);
        } else if (priceRange[1]) {
            params.set('maxPrice', `${priceRange[1]}`);
        }

        router.push(`?${params.toString()}`);
        setIsOpen(false);
        OnApplyFilter();
    };

    // Handle Reset
    const handleReset = () => {
        setSelectedVariants({});
        setSortOption('');
        setPriceRange([minPrice, maxPrice]);

        const params = new URLSearchParams(searchParams.toString());
        params.delete('sort');
        params.delete('maxPrice');
        params.delete('minPrice');
        availableVariants.forEach(({ name }) => {
            params.delete(name);
        });

        router.push(`?${params.toString()}`);
    };

    return (
        <>
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300"
                />
            )}

            <div
                className={`fixed top-0 right-0 h-full w-[300px] bg-gray-100 p-4 z-50 
        transition-transform duration-300 ease-in-out 
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex justify-between items-center mb-4">
                    <p className="text-2xl font-bold">Filters</p>
                    <IconButton onClick={() => setIsOpen(false)} icon={<VscClose />} className="text-xl" />
                </div>

                <div className="flex flex-col gap-4">
                    {/* Sort By */}
                    {standardFilters && (
                        <div className="flex flex-col gap-2">
                            <p className="text-xl font-medium">Sort By</p>
                            <DropDown
                                defaultOptions={[
                                    { label: 'Price High to Low', value: 'highToLow' },
                                    { label: 'Price Low to High', value: 'lowToHigh' },
                                    { label: 'Top Rated', value: 'topRated' },
                                    { label: 'In Stock', value: 'inStock' },
                                ]}
                                selectedOption={sortOption}
                                setSelectedOption={setSortOption}
                                placeholder="Sort By:"
                                required={false}
                                className="w-[260px]"
                            />
                        </div>
                    )}

                    {/* Price Range */}
                    {standardFilters && (
                        <div className="flex flex-col gap-3 text-sm font-medium">
                            <p className="text-xl font-medium">Price Range</p>
                            <CustomRangeSlider
                                min={minPrice}
                                max={maxPrice}
                                step={1}
                                initialValue={priceRange}
                                onChange={(range) => setPriceRange(range)}
                            />
                        </div>
                    )}

                    {/* Variant Filters */}
                    {variantsFilters && availableVariants?.length > 0 &&
                        availableVariants.map(({ name, options }, index) => (
                            <div className="flex flex-col gap-2 text-sm font-medium" key={index}>
                                <p className="text-xl font-medium">{name}</p>
                                <div className="flex flex-wrap gap-2">
                                    {options.map((opt, idx) => {
                                        const selected = isSelected(name, opt);
                                        return (
                                            <p
                                                key={idx}
                                                onClick={() => toggleVariantOption(name, opt)}
                                                className={`px-3 py-1 border rounded-3xl flex items-center cursor-pointer transition-all ${selected ? 'border-black bg-gray-200' : 'border-gray-300'
                                                    }`}
                                            >
                                                {(name.toLowerCase() === 'color') && (
                                                    <span
                                                        style={{ backgroundColor: opt }}
                                                        className="inline-block rounded-full w-4 h-4 mr-2 border border-gray-300"
                                                    ></span>
                                                )}
                                                {opt.charAt(0).toUpperCase() + opt.slice(1)}
                                            </p>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                </div>

                {/* Footer Buttons */}
                <div className="flex gap-2 justify-end pt-5 mt-auto">
                    <Button
                        size="small"
                        variant="white"
                        label="Reset"
                        active={true}
                        action={handleReset}
                    />
                    <Button
                        size="small"
                        variant="black"
                        label="Apply"
                        active={true}
                        action={handleApplyFilter}
                    />
                </div>
            </div>
        </>
    );
};

export default FilterBar;
