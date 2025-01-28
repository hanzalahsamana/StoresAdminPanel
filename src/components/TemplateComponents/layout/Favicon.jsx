"use client";

import { useSelector } from "react-redux";
import { selectPageByType } from "@/Redux/PagesData/PagesDataSlice";
import Head from "next/head";

const Favicon = () => {
    const SiteLogo = useSelector((state) => selectPageByType(state, "Site Logo"));
    const { siteName } = useSelector((state) => state.siteName);
    console.log(siteName , SiteLogo , "okj");
    

    return (
            <head>
                <link rel="icon" href={SiteLogo?.image} sizes="any" type="image/webp" />
                <title>{siteName}</title>
            </head>
    );
};

export default Favicon;
