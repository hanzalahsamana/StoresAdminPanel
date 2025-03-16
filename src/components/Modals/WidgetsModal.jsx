import { addSection } from "@/APIs/SectionsData/addSection";
import { setSectionsData, setSectionsDataLoading } from "@/Redux/SectionsData/SectionsDataSlice";
import { SectionStructure } from "@/Structure/SectionStructure";
import { useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const widgets = [
    { id: 1, name: "Banner Section" },
    { id: 2, name: "Rich Text" },
    { id: 3, name: "Product Feature" },
    { id: 4, name: "Testimonials" },
    { id: 5, name: "Image Gallery" },
    { id: 6, name: "Call to Action" },
    { id: 7, name: "Pricing Table" },
    { id: 8, name: "Contact Form" },
];

const WidgetsModal = ({ isOpen, setIsOpen, selectedOrder = 1, setSelectedOrder }) => {
    const dispatch = useDispatch()
    const { currUser } = useSelector((state) => state.currentUser);

    const handleAddSection = async (section) => {
        try {
            dispatch(setSectionsDataLoading(true));
            const responce = await addSection(currUser?.brandName, section, dispatch);
            console.log(responce, "🙂‍↔️");

            dispatch(setSectionsData(responce));
            dispatch(setSectionsDataLoading(false));
        } catch (error) {
            dispatch(setSectionsDataLoading(false));
            toast.error(error?.response?.data?.message || "Something went wrong");
        }


    }

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                setSelectedOrder(null)
                setIsOpen(null);
            }
        };
        if (isOpen) {
            window.addEventListener("keydown", handleKeyDown);
        }
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, setIsOpen]);
    return (
        <div className="relative">

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-[100]"
                    onClick={() => { setSelectedOrder(null); setIsOpen(false) }}
                ></div>
            )}

            <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-[100] transform ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300`}>
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-2xl font-semibold">Widgets</h2>
                    <button className="text-[18px]" onClick={() => { setSelectedOrder(null); setIsOpen(false) }}>
                        <IoCloseOutline />
                    </button>
                </div>

                <div className="p-4 overflow-y-auto max-h-[80vh]">
                    {Object.entries(SectionStructure).map(([widget, section]) => (
                        <div
                            key={widget} // Ensuring a unique key
                            onClick={() => handleAddSection({
                                type: widget,
                                sectionName: section?.sectionName || section?.data?.title || "Untitled",
                                visibility: true,
                                content: section?.data,
                                order: selectedOrder,
                            })}
                            className="p-3 bg-gray-100 rounded-sm mb-2 cursor-pointer hover:bg-gray-200"
                        >
                            {section?.sectionName || section?.data?.title || "Untitled"}
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default WidgetsModal;
