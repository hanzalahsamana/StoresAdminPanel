import React, { useEffect, useState } from 'react';
import ActionCard from '../Cards/ActionCard';
import FileUploader from '../Uploaders/FileUploader';
import Button from '../Actions/Button';
import { useSelector } from 'react-redux';
import { importSite } from '@/APIs/Migration/ImportSite';
import { toast } from 'react-toastify';
import RadioButton from '../Actions/RadioButton';
import MultiSelectCheckbox from '../Actions/MultiSelectCheckbox';
import { MigrationDefaultKeys } from '@/Structure/DefaultStructures';

const ImportSite = () => {
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [importOptions, setImportOptions] = useState('Auto-import based on file');
    const [topLevelKeys, setTopLevelKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const { currUser } = useSelector((state) => state.currentUser);

    useEffect(() => {
        if (importOptions === "Auto-import based on file") {
            setSelectedKeys(topLevelKeys);
        }
    }, [importOptions, topLevelKeys]);

    const handleFileUpload = (uploadedFile) => {
        setFile(uploadedFile);

        // Extract top-level keys from the JSON file
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const jsonData = JSON.parse(e.target.result);
                const keys = Object.keys(jsonData);
                const validImportKeys = keys?.filter(key =>
                    MigrationDefaultKeys.includes(key)
                );
                setTopLevelKeys(validImportKeys);
            } catch (error) {
                toast.error('Invalid JSON file.');
                setFile(null);
                setTopLevelKeys([]);
            }
        };
        reader.readAsText(uploadedFile);
    };

    const handleImport = async () => {
        if (!file) return;

        try {
            setLoading(true);
            const message = await importSite(currUser?.token, file , selectedKeys);
            toast.success("Import successful", message);
            setFile(null);
        } catch (error) {
            toast.error(error.response ? error.response.data.message : error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ActionCard
            lable={'Import Data'}
            className={'!px-5 !py-5'}
            actions={<Button loading={loading} label='Import' size='small' className='w-max' action={handleImport} active={!!file && selectedKeys.length >0 } />}
        >
            <p className="text-textC text-lg font-medium ">
                Select the File you want to Import. <br />
            </p>

            <FileUploader file={file} setFile={handleFileUpload} />

            {file && (
                topLevelKeys?.length > 0 ? (
                    <>
                        <RadioButton
                            label="Import Options"
                            options={['Auto-import based on file', 'Choose manually what to import']}
                            selectedOption={importOptions}
                            setSelectedOption={setImportOptions}
                        />

                        {importOptions === 'Choose manually what to import' && (
                            <MultiSelectCheckbox
                                lable="Select Keys to Import"
                                options={topLevelKeys}
                                selectedOptions={selectedKeys}
                                setSelectedOptions={setSelectedKeys}
                            />
                        )}
                    </>
                ) : (
                    <p className="text-red-500 text-lg">There is no data to import.</p>
                )
            )}
        </ActionCard>
    );
};

export default ImportSite;