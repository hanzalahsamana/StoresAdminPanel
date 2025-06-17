"use client";

import { useEffect, useState } from 'react';
import { variationSuggestions } from '@/Structure/DefaultStructures';
import VariationAddManager from '../Forms/VariationAddManager';
import VariantsAddManager from '../Forms/VariantsAddManager';

const VariantsSelector = () => {
    // const { variations } = useSelector((state) => state?.storeDetail?.storeDetail);
    const [variantsData, setVariantsData] = useState([]);
    const [variationData, setVariationData] = useState([
        {
            name: 'Color',
            options: ['yellow', 'blue', 'green', 'red'],
            id: 'AA',
        },
        {
            name: 'Size',
            options: ['M', 'L', 'XL', 'S'],
            id: 'BB',
        },
    ]);

    useEffect(() => {
        console.log(variationData, "🦽🦽🦽🦽");
    }, [variationData])





    return (
        <div className="flex flex-col gap-4 w-full ">
            <div className={`flex flex-col gap-5`}>
                <VariationAddManager variationData={variationData} setVariationData={setVariationData} variationSuggestions={variationSuggestions} />
                <VariantsAddManager variations={variationData} setVariantData={setVariantsData} variantData={variantsData} />
            </div>

        </div >
    );
};

export default VariantsSelector;
