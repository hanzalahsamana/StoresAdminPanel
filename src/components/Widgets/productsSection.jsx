"use client";
import { useSelector } from 'react-redux';
import ProductCard from '../Cards/productCard';
import Link from 'next/link';
import Loader from '../Loader/TemplateLoader';
import { MdSignalWifiConnectedNoInternet2 } from "react-icons/md";
import { getBasePath } from '@/Utils/GetBasePath';

const ProductsSection = ({ content = {} }) => {
    const {
        title = "Our Products",
        maxLength = 4,
        productType = "All",
        selectedProducts = [],
        selectedCategories = []
    } = content;

    const { products, loading, error } = useSelector((state) => state.productData);

    if (loading) return <Loader />;

    if (error) {
        return (
            <div className='flex gap-2 text-[25px] justify-center py-[40px] items-center'>
                {error} <MdSignalWifiConnectedNoInternet2 />
            </div>
        );
    }

    // Filter products based on the selected product type
    let filteredProducts = [];

    if (productType === "All") {
        filteredProducts = products;  // Show all products
    } else if (productType === "Selected Categories") {
        filteredProducts = products?.filter(product =>
            selectedCategories.includes(product.collectionName)
        );
    } else if (productType === "Selected Products") {
        console.log(products, selectedProducts, "🍔🍔🎃");
        filteredProducts = products?.filter(product =>
            selectedProducts.includes(product.name)
        );
    }

    return (
        <div className='max-w-[1500px] w-full md:py-4 bg-[var(--tmp-pri)]'>
            <h1 className='mb-6 text-[30px] text-[var(--tmp-txt)] font-semibold text-center'>{title}</h1>
            <div className="grid grid-cols-4 max-[1024px]:grid-cols-3 max-[750px]:grid-cols-2 max-[470px]:grid-cols-1 gap-2 m-6">
                {filteredProducts?.slice(0, maxLength || 4).map((product) => (
                    <Link
                        className="cursor-pointer"
                        key={product._id}
                        href={`${getBasePath()}/products/${product._id}`}
                    >
                        <ProductCard product={product} />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ProductsSection;
