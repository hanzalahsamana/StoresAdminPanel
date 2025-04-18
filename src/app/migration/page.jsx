"use client";

import { exportSite } from '@/APIs/ImpExpSite/ExportSite';
import ProtectedRoute from '@/AuthenticRouting/ProtectedRoutes';
import Button from '@/components/Actions/Button';
import MultiSelectCheckbox from '@/components/Actions/MultiSelectCheckbox'
import ActionCard from '@/components/Cards/ActionCard';
import BackgroundFrame from '@/components/Layout/BackgroundFrame';
import { GenerateJSONFile } from '@/Utils/GenerateJSONFile';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const DefaultExportData = ["Products", "Categories", "Sections", "Orders"]

const Migration = () => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const { currUser } = useSelector((state) => state.currentUser);
    const [loading, setLoading] = useState(false);

    const handleExport = async () => {
        setLoading(true);
        try {
            const { data } = await exportSite(currUser?.token, selectedOptions);
            GenerateJSONFile(data, currUser?.brandName)
        } catch (error) {
            toast.error(error.response ? error.response.data.message : error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='grid p-4 grid-cols-1 md:grid-cols-2 gap-4'>

            <ActionCard
                lable={'Export / Backup Data'}
                className={'!px-5 !py-5'}
                // actionPosition='top'
                actions={<Button loading={loading} size='small' label='Export' className='w-max' action={handleExport} active={selectedOptions.length > 0} />}>
                <MultiSelectCheckbox lable='Select the data you want to Export:' options={DefaultExportData} selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} />
            </ActionCard>
            <ActionCard
                lable={'Import Data'}
                className={'!px-5 !py-5'}
                // actionPosition='top'
                actions={<Button loading={loading} label='Import' size='small' className='w-max' action={handleExport} active={selectedOptions.length > 0} />}>
                <p className="text-textC text-lg mb-3">
                    Select the data File you want to Import. <br />
                    <span className='text-sm text-textC'>Note: <span className='text-red-500'>This will override the existing data.</span></span>
                </p>

                {/* <MultiSelectCheckbox lable='Select the data you want to Export:' options={DefaultExportData} selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} /> */}
            </ActionCard>
        </div>
    )
}

export default ProtectedRoute(Migration)