import React, { useEffect, useState } from 'react';
import FormInput from '../Forms/FormInput';
import PillSelector from '../Actions/PillSelector';
import DropDown from '../Actions/DropDown';

const initialData = {
    headingText: '',
    headingLevel: 'h2', // h1 - h6
    alignment: 'left',  // left | center | right
};

const HeadingBlock = ({ selectedValue = {}, setSelectedValue = () => { } }) => {
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
        <div className="space-y-6 py-2 w-full">
            {/* Heading Text */}
            <FormInput
                label={''}
                layout='label'
                size='editor'
                placeholder='e.g. Why Choose Us?'
                type="text"
                name="headingText"
                required={false}
                value={blockData.headingText}
                handleChange={(e) => handleChange('headingText', e.target.value)}
            />

            {/* <PillSelector
                data={[
                    { label: 'Large', value: 'h1' },
                    { label: 'Medium', value: 'h2' },
                    { label: 'Small', value: 'h3' },
                ]}
                label="Size"
                selectedValue={blockData.headingLevel}
                setSelectedValue={(val) => handleChange('headingLevel', val)}
            />

            <PillSelector
                label="Alignment"
                data={[
                    { label: 'Left', value: 'left' },
                    { label: 'Center', value: 'center' },
                    { label: 'Right', value: 'right' },
                ]}
                selectedValue={blockData.alignment}
                setSelectedValue={(val) => handleChange('alignment', val)}
            /> */}

        </div>
    );
};

export default HeadingBlock;
