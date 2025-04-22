import React, { useState } from 'react'
import ActionCard from '../Cards/ActionCard'
import { useSelector } from 'react-redux';
import { exportSite } from '@/APIs/Migration/ExportSite';
import { GenerateJSONFile } from '@/Utils/GenerateJSONFile';
import Button from '../Actions/Button';
import MultiSelectCheckbox from '../Actions/MultiSelectCheckbox';
import { MigrationDefaultKeys } from '@/Structure/DefaultStructures';
import { toast } from 'react-toastify';


const ExportSite = () => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const { currUser } = useSelector((state) => state.currentUser);
    const [loading, setLoading] = useState(false);

    const handleExport = async () => {
        setLoading(true);
        try {
            const { data } = await exportSite(currUser?.token, selectedOptions);
            GenerateJSONFile(data, currUser?.brandName)
        } catch (error) {
            console.log(error.response.data ,'error in export site');
            toast.error(error.response ? error.response.data.message : error.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <ActionCard
            lable={'Export / Backup Data'}
            className={'!px-5 !py-5'}
            actions={<Button loading={loading} size='small' label='Export' className='w-max' action={handleExport} active={selectedOptions.length > 0} />}>
            <MultiSelectCheckbox lable='Select the data you want to Export:' options={MigrationDefaultKeys} selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} />
        </ActionCard>
    )
}

export default ExportSite