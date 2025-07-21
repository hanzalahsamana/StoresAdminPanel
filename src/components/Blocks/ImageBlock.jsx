import React, { useEffect, useState } from 'react';
import PillSelector from '../Actions/PillSelector';
import ImageUploader from '../Uploaders/ImageUploader';
import FormInput from '../Forms/FormInput';

const initialData = {
    image: '',
    objectFit: 'cover', // cover, contain, fill
    aspectRatio: '16:9', // 16:9, 4:3, 1:1, auto
    altText: '',
};

const ImageBlock = ({ selectedValue = {}, setSelectedValue = () => { } }) => {
    const [blockData, setBlockData] = useState(initialData);

    useEffect(() => {
        if (selectedValue && Object.keys(selectedValue).length) {
            setBlockData(selectedValue);
        }
    }, [selectedValue]);

    const handleChange = (key, value) => {
        const updated = { ...blockData, [key]: value };
        setBlockData(updated);
        setSelectedValue(updated);
    };

    return (
        <div className="space-y-6 py-2">
            {/* Image Uploader */}
            <ImageUploader
                label="Select Image"
                image={blockData.image}
                setImage={(img) => handleChange('image', img)}
            />

            {/* Object Fit Selector */}
            <PillSelector
                label="Image Fit"
                data={[
                    { label: 'Cover', value: 'cover' },
                    { label: 'Contain', value: 'contain' },
                    { label: 'Fill', value: 'fill' },
                ]}
                selectedValue={blockData.objectFit}
                setSelectedValue={(val) => handleChange('objectFit', val)}
            />

            <PillSelector
                label="Aspect Ratio"
                data={[
                    { label: '16:9', value: '16:9' },
                    { label: '4:3', value: '4:3' },
                    { label: '1:1', value: '1:1' },
                    { label: 'Auto', value: 'auto' },
                ]}
                selectedValue={blockData.aspectRatio}
                setSelectedValue={(val) => handleChange('aspectRatio', val)}
            />


            {/* Alt Text */}
            <FormInput
                type="text"
                placeholder="Alt text"
                value={blockData.altText}
                onChange={(e) => handleChange('altText', e.target.value)}
            />
        </div>
    );
};

export default ImageBlock;
