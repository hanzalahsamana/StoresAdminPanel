import React, { useState, useEffect } from 'react';
import FormInput from '../Forms/FormInput';
import PillSelector from '../Actions/PillSelector';
import Checkbox from '../Actions/CheckBox';

const initialData = {
    buttonText: '',
    buttonStyle: 'rounded', // rounded , square
    buttonType: 'outline', // outline , fill , text
    buttonLink: '/products',
    openInNewTab: false,
};

const ButtonBlock = ({ selectedValue = {}, setSelectedValue = () => { } }) => {
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
            <FormInput
                type="text"
                name="buttonText"
                label=""
                size='editor'
                required={false}
                layout='label'
                placeholder='e.g. Shop Now'
                value={blockData.buttonText}
                handleChange={(e) => handleChange('buttonText', e.target.value)}
            />
            {/* <PillSelector
                label="Select Style"
                data={[
                    { label: 'Theme 1', value: 'rounded' },
                    { label: 'Theme 2', value: 'square' },
                ]}
                selectedValue={blockData.buttonStyle}
                setSelectedValue={(val) => handleChange('buttonStyle', val)}
            /> */}

            {/* <PillSelector
                label="Button Type"
                data={[
                    { label: 'Outline', value: 'outline' },
                    { label: 'Fill', value: 'fill' },
                    { label: 'Text', value: 'text' },
                ]}
                selectedValue={blockData.buttonType}
                setSelectedValue={(val) => handleChange('buttonType', val)}
            />

            <FormInput
                type="text"
                name="buttonLink"
                label="Button Link"
                size='editor'
                layout='label'
                required={false}
                placeholder='e.g. /products'
                value={blockData.buttonLink}
                handleChange={(e) => handleChange('buttonLink', e.target.value)}
            />

            <Checkbox
                setChecked={(e) => handleChange('openInNewTab', e)}
                checked={blockData.openInNewTab}
                label='Open in new tab'
            /> */}
        </div>
    );
};

export default ButtonBlock;
