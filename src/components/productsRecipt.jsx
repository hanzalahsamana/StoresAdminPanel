import React from 'react'
import ProductRecieptCard from './productRecieptCard'

const ProductsRecipt = ({ products }) => {
  return (
    <div className='w-full max-w-[500px] bg-[#F5F5F5]' >
      <div>
        {products?.length > 0 && products?.map((item, index) => (
          <ProductRecieptCard key={item._id} product={item.orderData} />
        ))}
      </div>
    </div>
  )
}

export default ProductsRecipt