import React from 'react'
import TabNavigation from '../Widgets/TabNavigation'

const ProductDescription = () => {
    return (
        <div className='bg-[var(--tmp-acc)] border-y w-full py-8 px-12'>

            <TabNavigation
                tabs={[
                    {
                        title: "Specifications",
                        content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet tempore et asperiores unde quidem fugit accusantium optio voluptate, assumenda doloribus, iure natus! Repudiandae voluptatum dignissimos minus, a quas voluptate quia! Molestias error recusandae enim repellat cumque, dolores cupiditate quia aspernatur. Ipsum voluptate, praesentium sapiente labore quia commodi ullam magni error numquam, natus dolor vel, magnam dolorum adipisci? Quod, sequi cumque.",
                        isHtml: true,
                    },
                    {
                        title: "Reviews",
                        content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet tempore et asperiores unde quidem fugit accusantium optio voluptate, assumenda doloribus, iure natus! Repudiandae voluptatum dignissimos minus, a quas voluptate quia! Molestias error recusandae enim repellat cumque, dolores cupiditate quia aspernatur. Ipsum voluptate, praesentium sapiente labore quia commodi ullam magni error numquam, natus dolor vel, magnam dolorum adipisci? Quod, sequi cumque.",
                        isHtml: false,
                    },
                    {
                        title: "Shipping info",
                        content: "<ul><li>Ships in 3 days</li></ul>",
                        isHtml: true,
                    },
                    {
                        title: "Seller profile",
                        content: "Verified seller since 2019.",
                        isHtml: false,
                    },
                ]}
            />
        </div>

    )
}

export default ProductDescription