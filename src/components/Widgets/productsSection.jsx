"use client";
import { forwardRef, useEffect, useState } from 'react';
import ProductCard from '../Cards/productCard';
import Loader from '../Loader/TemplateLoader';
import { MdSignalWifiConnectedNoInternet2 } from "react-icons/md";
import { getBasePath } from '@/Utils/GetBasePath';
import BASE_URL from 'config';
import { useSelector } from 'react-redux';
import axios from 'axios';

const ProductsSection = forwardRef(({ content = {} , ...rest }, ref) => {
    const {
        title = "Our Products",
        maxLength = 4,
        productType = "All",
        selectedProducts = [],
        selectedcollections = []
    } = content;
    const { store } = useSelector((state) => state.store);

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // const fetchProducts = async () => {
    //     setLoading(true);
    //     setError(null);

    //     try {
    //         const query = new URLSearchParams();

    //         if (productType === "Selected Products" && selectedProducts.length > 0) {
    //             query.append("productId", selectedProducts.join(","));
    //         }

    //         if (productType === "Selected collections" && selectedcollections.length > 0) {
    //             query.append("collection", selectedcollections.join(","));
    //         }
    //         query.append("limit", maxLength)
    //         query.append("page", 1)


    //         const { data } = await axios.get(`${BASE_URL}/${store?._id}/getProducts?${query.toString()}`);
    //         setProducts(data.data || []);
    //         return data?.data;
    //     } catch (err) {
    //         const msg = error?.response?.data?.message || error?.message || 'Something went wrong';
    //         setError(msg);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     fetchProducts();
    // }, [productType, selectedProducts, selectedcollections]);

    // if (loading) return <Loader />;

    if (error) {
        return (
            <div className='flex gap-2 text-[25px] justify-center py-[40px] items-center'>
                {error} <MdSignalWifiConnectedNoInternet2 />
            </div>
        );
    }

    return (
        <div {...rest} ref={ref} className='max-w-[1500px] w-full md:py-4 bg-[var(--tmp-pri)]'>
            <h1 className='mb-6 text-[30px] text-[var(--tmp-txt)] font-semibold text-center'>{title}</h1>
            <div className="grid grid-cols-4 max-[1024px]:grid-cols-3 max-[750px]:grid-cols-2 max-[470px]:grid-cols-1 gap-2 m-6">
                {products?.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
});

export default ProductsSection;
