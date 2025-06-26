import React from 'react'

const ProductRecieptCard = ({ product }) => {
    return (
        <div className='flex items-center justify-between border-b py-[12px]'>
            <div className='flex gap-2 '>
                <div className='relative'>
                    <img className='w-[40px] h-[40px] max-w-[unset] rounded-md' src={product?.image} alt={product?.alt} />
                </div>
                <div className='flex flex-col justify-around'>
                    <p className='text-[14px]/[14px] text-[var(--tmp-txt)] mb-[px] '>{product?.name}</p>
                    <p className="text-[10px]/[10px] text-[var(--tmp-txt)]">
                        {Object.entries(product?.selectedVariant || {}).map(([key, value], index) => (
                            <span key={index} className="mr-2">
                                <span className="font-medium capitalize">{key}</span>: {value}
                            </span>
                        ))}
                    </p>
                </div>
            </div>
            <div className='flex items-center'>
                <div className='flex items-center justify-center rounded-full  bg-[var(--tmp-sec)] text-[var(--tmp-pri)] text-[10px]/[10px] h-max px-2 py-1 mr-[5px] '>{product.quantity}x</div>
                <p className='text-[14px] text-[var(--tmp-txt)]'>Rs {(product?.price * product.quantity)?.toFixed(2)}</p>
            </div>
        </div>
    )
}

export default ProductRecieptCard