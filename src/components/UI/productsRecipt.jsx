import React from 'react'
import ProductRecieptCard from '../Cards/productRecieptCard'

const ProductsRecipt = ({products}) => {
  
  return (
    <div className='w-full max-w-[500px] bg-[var(--tmp-acc)]' >
      <div>
        {products?.map((item , index)=>(
          <ProductRecieptCard key={item._id} product={item}/>
        ))}
      </div>
    </div>
  )
}

export default ProductsRecipt