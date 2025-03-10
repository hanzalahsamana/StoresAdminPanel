import React from 'react'
import ContentLoader from 'react-content-loader'

const TextLoader = (props) => (
  <ContentLoader
    speed={1}
    width={"100%"} // Make width responsive
    height={150} // Set fixed heighta
    viewBox="0 0 100% 150" // Adjust the viewBox to match dimensions
    backgroundColor="#ededeb"
    foregroundColor="#e8e8e3"
    {...props}
  >
    {/* Adjusted rectangles to scale with new dimensions */}
    <rect x="0%" y="20" rx="5" ry="5" width="100%" height="30" />
    <rect x="0%" y="70" rx="5" ry="5" width="60%" height="15" />
    <rect x="0%" y="100" rx="5" ry="5" width="30%" height="15" />
    <rect x="40%" y="100" rx="5" ry="5" width="30%" height="15" />
    <rect x="75%" y="100" rx="5" ry="5" width="20%" height="15" />
    {/* <rect x="68%" y="180" rx="5" ry="5" width="15%" height="40" /> */}
    {/* <rect x="85%" y="180" rx="5" ry="5" width="15%" height="40" /> */}
  </ContentLoader>
)

export default TextLoader;
