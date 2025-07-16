import React, { useEffect, useState } from 'react';
import FormInput from '../Forms/FormInput';
import PillSelector from '../Actions/PillSelector';

const initialData = {
    backgroundType: 'transparent', // transparent | color
    verticalPosition: 'top', // top | middle | bottom
    horizontalPosition: 'left', // left | center | right
    visibility: 'visible', // visible | hidden
};

const CardBlock = ({ selectedValue = {}, setSelectedValue = () => { } }) => {
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
        <div className="space-y-4">
            <PillSelector
                label="Background Type"
                data={[
                    { label: 'Transparent', value: 'transparent' },
                    { label: 'Color', value: 'color' },
                ]}
                selectedValue={blockData.backgroundType}
                setSelectedValue={(val) => handleChange('backgroundType', val)}
            />

            <PillSelector
                label="Vertical Position"
                data={[
                    { label: 'Top', value: 'top' },
                    { label: 'Middle', value: 'middle' },
                    { label: 'Bottom', value: 'bottom' },
                ]}
                selectedValue={blockData.verticalPosition}
                setSelectedValue={(val) => handleChange('verticalPosition', val)}
            />

            <PillSelector
                label="Horizontal Position"
                data={[
                    { label: 'Left', value: 'left' },
                    { label: 'Center', value: 'center' },
                    { label: 'Right', value: 'right' },
                ]}
                selectedValue={blockData.horizontalPosition}
                setSelectedValue={(val) => handleChange('horizontalPosition', val)}
            />

            <PillSelector
                label="Visibility"
                data={[
                    { label: 'Visible', value: 'visible' },
                    { label: 'Hidden', value: 'hidden' },
                ]}
                selectedValue={blockData.visibility}
                setSelectedValue={(val) => handleChange('visibility', val)}
            />
        </div>
    );
};

export default CardBlock;
