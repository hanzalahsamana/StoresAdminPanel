'use client';
import { useSelector } from "react-redux";
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
