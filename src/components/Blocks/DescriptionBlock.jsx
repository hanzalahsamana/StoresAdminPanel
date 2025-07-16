import React, { useEffect, useState } from 'react';
import TextEditor from '../Uploaders/TextEditor';

const initialData = {
    description: '',
};

const DescriptionBlock = ({ selectedValue = {}, setSelectedValue = () => { } }) => {
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
            <TextEditor
                editorContent={blockData.description}
                setEditorContent={(val) => handleChange('description', val)}
            />
        </div>
    );
};

export default DescriptionBlock;
