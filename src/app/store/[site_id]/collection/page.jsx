import CollectionSection from '@/components/Widgets/CollectionSection'
import React from 'react'

const AllCollections = () => {
    return (
        <div className='w-full bg-[var(--tmp-pri)]'>

            <CollectionSection content={{
                collectionIds: [],
                title: "All Collections"
            }} toShowLink={false} />
        </div>
    )
}

export default AllCollections