"use client";

import ProtectedRoute from '@/AuthenticRouting/ProtectedRoutes';
import ExportSite from '@/components/UI/ExportSite';
import ImportSite from '@/components/UI/ImportSite';

const Migration = () => {

    return (
        <div className='grid p-4 grid-cols-1 md:grid-cols-2 gap-4'>
            <ExportSite/>
            <ImportSite/>
           
        </div>
    )
}

export default Migration