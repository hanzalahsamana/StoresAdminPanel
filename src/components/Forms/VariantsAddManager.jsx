import { useEffect, useState } from 'react';
import FormInput from './FormInput';
import ImageUploader from '../Uploaders/ImageUploader';
import DropDown from '../Actions/DropDown';

function generateCombinations(variations) {
    if (!variations.length) return [];
    return variations.reduce((acc, variation) => {
        if (!variation.options.length) return acc;
        if (!acc.length) return variation.options.map(opt => [opt]);
        return acc.flatMap(combo =>
            variation.options.map(opt => [...combo, opt])
        );
    }, []);
}

const VariantsAddManager = ({
    variations = [],
    variantData = [],
    setVariantData,
}) => {
    const [groupByIndex, setGroupByIndex] = useState(1); // 0 = Bulk Edit
    const [groupedData, setGroupedData] = useState({});
    const [bulkEdit, setBulkEdit] = useState({ price: '', stock: '', imageUrl: null });

    useEffect(() => {
        const combos = generateCombinations(variations);
        const updated = combos.map(combo => {
            const variant = {};
            variations.forEach((v, i) => {
                variant[v.name] = combo[i];
            });

            const id = Object.values(variant).join('___');
            const existing = variantData.find(v => v.id === id);

            return existing || {
                id,
                variant,
                price: '',
                stock: '',
                imageUrl: null,
            };
        });
        setVariantData(updated);
    }, [variations]);

    useEffect(() => {
        const grouped = {};

        if (groupByIndex === 0) {
            // Bulk Edit group
            grouped['Bulk Edit'] = [...variantData];
        } else {
            variantData.forEach(variant => {
                const keys = Object.keys(variant.variant);
                const key = variant.variant[keys[groupByIndex - 1]] || 'Unknown';
                if (!grouped[key]) grouped[key] = [];
                grouped[key].push(variant);
            });
        }

        setGroupedData(grouped);
    }, [variantData, groupByIndex]);

    const handleGroupChange = (groupKey, field, value) => {
        setVariantData(prev =>
            prev.map(v => {
                if (groupByIndex === 0 || (groupByIndex > 0 && v.variant[Object.keys(v.variant)[groupByIndex - 1]] === groupKey)) {
                    return { ...v, [field]: value };
                }
                return v;
            })
        );

        if (groupByIndex === 0) {
            setBulkEdit(prev => ({ ...prev, [field]: value }));
        }
    };

    const handleChange = (id, field, value) => {
        setVariantData(prev =>
            prev.map(v => (v.id === id ? { ...v, [field]: value } : v))
        );
    };

    if (variations.length === 0) {
        return
    }

    return (
        <div className="mt-6">
            <div className="mb-4 w-full flex justify-between items-end">
                <h1 className='font-semibold text-[28px]'>Variants</h1>
                <DropDown
                    label="Group Variants By"
                    layout="label"
                    selectedOption={groupByIndex}
                    defaultOptions={[
                        { label: 'Bulk Edit', value: 0 },
                        ...variations.map((v, i) => ({ label: v.name, value: i + 1 }))
                    ]}
                    setSelectedOption={(val) => setGroupByIndex(Number(val))}
                    className='w-max'
                />
            </div>
            <div className="border rounded-md overflow-hidden">
                <div className='grid grid-cols-5 border-b gap-2 bg-gray-50 text-gray-600 font-medium p-2 items-center'>
                    <p className='text-riht'>Image</p>
                    <p>Variant</p>
                    <p></p>
                    <p>Price</p>
                    <p>Stock</p>
                </div>
                {Object.entries(groupedData).map(([groupKey, variants]) => (
                    <div key={groupKey} className="bg-white">
                        <div className="grid grid-cols-5 border-b items-center gap-2 px-3 py-2 bg-gray-100">
                            <ImageUploader
                                image={groupByIndex === 0 ? bulkEdit.imageUrl : variants[0].imageUrl}
                                setImage={url => handleGroupChange(groupKey, 'imageUrl', url)}
                                size="medium"
                                className="items-end"
                            />
                            <div className="text-lg font-medium text-nowrap text-gray-700">
                                {groupKey}
                            </div>
                            <div></div>
                            <FormInput
                                layout=""
                                type="number"
                                value={groupByIndex === 0 ? bulkEdit.price : variants[0].price}
                                onChange={e => handleGroupChange(groupKey, 'price', e.target.value)}
                                className="rounded-lg h-[30px]"
                                placeholder="Price"
                            />
                            <FormInput
                                layout=""
                                type="number"
                                value={groupByIndex === 0 ? bulkEdit.stock : variants[0].stock}
                                onChange={e => handleGroupChange(groupKey, 'stock', e.target.value)}
                                className="rounded-lg h-[30px]"
                                placeholder="Stock"
                            />
                        </div>
                        <div className="grid grid-cols-1 justify-end items-end">
                            {variants.map((variant) => (
                                <div
                                    key={variant.id}
                                    className="px-4 py-2 border-b grid grid-cols-5 items-center gap-2 w-auto"
                                >
                                    <ImageUploader
                                        image={variant.imageUrl}
                                        setImage={url => handleChange(variant.id, 'imageUrl', url)}
                                        className="items-end"
                                    />
                                    <div className="text-sm font-medium text-nowrap text-gray-700">
                                        {Object.entries(variant.variant).map(([k, v]) => ` ${v}`).join(' / ')}
                                    </div>
                                    <div></div>
                                    <FormInput
                                        label=""
                                        type="number"
                                        className="rounded-lg h-[30px]"
                                        layout=""
                                        placeholder="Price"
                                        value={variant.price}
                                        onChange={e => handleChange(variant.id, 'price', e.target.value)}
                                    />
                                    <FormInput
                                        label=""
                                        className="rounded-lg h-[30px]"
                                        layout=""
                                        placeholder="Stock"
                                        type="number"
                                        value={variant.stock}
                                        onChange={e => handleChange(variant.id, 'stock', e.target.value)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VariantsAddManager;
