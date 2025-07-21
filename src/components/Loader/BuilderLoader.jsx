import React from "react";
import ContentLoader from "react-content-loader";

const BuilderLoader = (props) => {
    return (


        < div className="flex flex-col w-full h-100vh" >


            <div className="bg-white-200 w-full h-[60px] border-b">
                <ContentLoader
                    speed={1}
                    backgroundColor="#e5e7eb"
                    foregroundColor="#f3f4f6"
                    viewBox="0 0"
                    style={{ width: "100%", height: "100%" }}
                    {...props}
                >
                    {/* <rect x="91%" y="10" rx="5" ry="5" width="100px" height="40" /> */}
                    <rect x="20" y="10" rx="5" ry="5" width="60%" height="20" />
                    <rect x="20" y="40" rx="5" ry="5" width="40%" height="10" />
                    {/* <rect x="76%" y="20" rx="5" ry="5" width="25px" height="20px" /> */}
                    {/* <rect x="79%" y="20" rx="5" ry="5" width="25px" height="20px" /> */}
                    <rect x="82%" y="10" rx="5" ry="5" width="100px" height="40" />
                    <rect x="91%" y="10" rx="5" ry="5" width="100px" height="40" />
                </ContentLoader>

            </div>
            <div className="w-full h-[calc(100vh_-_60px)] flex">
                <div className="w-[60px] h-[calc(100vh_-_60px)] border-r  ">
                    <ContentLoader
                        speed={1}
                        backgroundColor="#e5e7eb"
                        foregroundColor="#f3f4f6"
                        viewBox="0 0"
                        style={{ width: "100%", height: "100%" }}
                        {...props}
                    >
                        <rect x="10%" y="2.5%" rx="5" ry="5" width="80%" height="95%" />
                    </ContentLoader>
                </div>
                <div className="w-[350px] h-[calc(100vh_-_60px)] border-r ">
                    <ContentLoader
                        speed={1}
                        backgroundColor="#e5e7eb"
                        foregroundColor="#f3f4f6"
                        viewBox="0 0"
                        style={{ width: "100%", height: "100%" }}
                        {...props}
                    >
                        <rect x="2.5%" y="2.5%" rx="5" ry="5" width="95%" height="95%" />
                    </ContentLoader>
                </div>
                <div className="flex-1 h-[calc(100vh_-_60px)]  border-[20px] border-white">
                    <ContentLoader
                        speed={1}
                        backgroundColor="#e5e7eb"
                        foregroundColor="#f3f4f6"
                        viewBox="0 0"
                        style={{ width: "100%", height: "100%" }}
                        {...props}
                    >
                        <rect x="10%" y="10%" rx="10" ry="10" width="80%" height="80%" />
                    </ContentLoader>
                </div>
            </div>

            {/* Editor Sidebar (left) */}
            {/* <rect x="0" y="70" rx="6" ry="6" width="25%" height="50" />
            <rect x="0" y="130" rx="6" ry="6" width="25%" height="50" />
            <rect x="0" y="190" rx="6" ry="6" width="25%" height="50" />
            <rect x="0" y="250" rx="6" ry="6" width="25%" height="50" />
            <rect x="0" y="310" rx="6" ry="6" width="25%" height="50" /> */}

            {/* Laptop Frame (right preview area) */}
            {/* <rect x="280" y="90" rx="20" ry="20" width="1100" height="700" /> */}

            {/* Inside the preview (simulate header, text, image blocks) */}
            {/* <rect x="310" y="120" rx="4" ry="4" width="300" height="24" /> */}
            {/* <rect x="310" y="160" rx="4" ry="4" width="250" height="18" /> */}
            {/* <rect x="25%+22" y="100" rx="8" ry="8" width="800" height="180" /> */}
            {/* <rect x="310" y="400" rx="4" ry="4" width="200" height="16" /> */}
            {/* <rect x="310" y="430" rx="4" ry="4" width="500" height="16" /> */}
            {/* <rect x="310" y="470" rx="6" ry="6" width="300" height="150" /> */}
        </ div>
    )

}
export default BuilderLoader;

