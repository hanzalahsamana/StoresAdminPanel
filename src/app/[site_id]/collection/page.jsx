import CollectionSection from '@/components/Widgets/collectionSection'
import React from 'react'

const AllCollections = () => {
    return (
        <CollectionSection content={{
            selectedCategories: [],
            title: "All Collections"
        }} toShowLink={false} />
    )
}

export default AllCollections