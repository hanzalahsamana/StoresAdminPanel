import React from 'react'
import ContentLoader from 'react-content-loader'

const ProductCardLoader = (props) => (
    <ContentLoader
        speed={1}
        width={"100%"} // Make width responsive
        height={"350px"} // Set fixed heighta
        backgroundColor="#e5e7eb"
        foregroundColor="#e8e8e3"
        {...props}
    >
        {/* Adjusted rectangles to scale with new dimensions */}
        <rect x="0%" y="0" rx="5" ry="5" width="100%" height="80%" />
        <rect x="0%" y="83%" rx="5" ry="5" width="100%" height="10" />
        <rect x="0%" y="88%" rx="5" ry="5" width="30%" height="10" />
        <rect x="0%" y="94%" rx="5" ry="5" width="50%" height="10" />
        {/* <rect x="80%" y="94%" rx="5" ry="5" width="20%" height="10" /> */}
        {/* <rect x="0%" y="100" rx="5" ry="5" width="30%" height="15" /> */}
        {/* <rect x="40%" y="100" rx="5" ry="5" width="30%" height="15" /> */}
        {/* <rect x="75%" y="100" rx="5" ry="5" width="20%" height="15" /> */}
        {/* <rect x="68%" y="180" rx="5" ry="5" width="15%" height="40" /> */}
        {/* <rect x="85%" y="180" rx="5" ry="5" width="15%" height="40" /> */}
    </ContentLoader>
)

export default ProductCardLoader;
