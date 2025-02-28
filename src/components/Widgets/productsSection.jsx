"use client";
import { useSelector } from 'react-redux';
import ProductCard from '../TemplateComponents/UI/productCard';
import Link from 'next/link';
import Loader from '../TemplateComponents/UI/loader';
import { MdSignalWifiConnectedNoInternet2 } from "react-icons/md";
import { getBasePath } from '@/Utils/GetBasePath';

const ProductsSection = ({ maxLength, collection, name }) => {
    const { products, loading, error } = useSelector((state) => state.productData);
    const { siteName } = useSelector((state) => state.siteName);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return (
            <div className='flex gap-2 text-[25px] justify-center py-[40px] items-center '>
                {error} <MdSignalWifiConnectedNoInternet2 />
            </div>
        );
    }

    return (
        <div className='max-w-[1500px]'>
            <h1 className='m-6 text-[30px] font-semibold text-center'>{name}</h1>
            <div className="grid grid-cols-4 max-[1024px]:grid-cols-3 max-[750px]:grid-cols-2 max-[470px]:grid-cols-1 gap-2 m-6">
                {products
                    ?.filter(product => product?.collectionName?.toLowerCase() === collection.toLowerCase() || collection === "all")
                    .slice(0, maxLength)
                    .map((product) => (
                        <Link
                            className="cursor-pointer"
                            key={product._id}
                            href={`${getBasePath()}/products/${product._id}`}
                        >
                            <ProductCard product={product} />
                        </Link>
                    ))
                }

            </div>
        </div>
    );
};

export default ProductsSection;
