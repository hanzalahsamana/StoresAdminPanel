"use client";

import ProtectedRoute from '@/AuthenticRouting/ProtectedRoutes';
import BackgroundFrame from '@/components/Layout/BackgroundFrame';
import AddEditProductModal from '@/components/Modals/AddEditProductModal';
import { use, useState } from 'react'
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';

const EditProduct = () => {
    const [isOpen, setIsOpen] = useState(true);
    const { productid } = useParams();
    const { products } = useSelector((state) => state.productData);

    const EditingProduct = products?.find((product) => product._id === productid);
    return (
        <BackgroundFrame>
            <AddEditProductModal updatedData={EditingProduct} isOpen={isOpen} setIsOpen={setIsOpen} />
        </BackgroundFrame>
    )
}

export default EditProduct;