'use client';
import { useSelector } from "react-redux";
import { selectPageByType } from "@/Redux/PagesData/PagesDataSlice";
import FAQs from "@/components/Widgets/Faqs";

const FAQ = () => {
    const selectedPage = useSelector((state) =>
        selectPageByType(state, "FAQ")
    );

    return (
        <FAQs content={selectedPage} />
    );
};

export default FAQ;
