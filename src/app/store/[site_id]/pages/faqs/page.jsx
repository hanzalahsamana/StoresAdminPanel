'use client';
import { useSelector } from "react-redux";
import { getContentByName } from "@/Redux/ContentData/ContentDataSlice";
import FAQs from "@/components/Widgets/Faqs";

const FAQ = () => {
    const selectedPage = useSelector((state) =>
        getContentByName(state, "FAQ")
    );

    return (
        <FAQs content={selectedPage} />
    );
};

export default FAQ;
