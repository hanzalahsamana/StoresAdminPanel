"use client";

import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import { selectPageByType } from "@/Redux/PagesData/PagesDataSlice";

const Favicon = ({ title, faviconUrl }) => {
    const { siteName } = useSelector((state) => state.siteName);
    const SiteLogo = useSelector((state) => selectPageByType(state, "Site Logo"));
    const dispatch = useDispatch();


    const pageTitle = title || siteName;
    const faviconImage = faviconUrl || SiteLogo?.image;

    return (
        <Head>
            <link rel="icon" href={faviconImage} sizes="any" type="image/webp" />
            <title>{pageTitle}</title>
        </Head>
    );
};

export default Favicon;
