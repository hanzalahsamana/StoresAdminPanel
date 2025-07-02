import CollectionSection from '@/components/Widgets/collectionSection'
import React from 'react'

const AllCollections = () => {
    return (
        <div className='w-full bg-[var(--tmp-pri)]'>

            <CollectionSection content={{
                selectedcollections: [],
                title: "All Collections"
            }} toShowLink={false} />
        </div>
    )
}

export default AllCollections