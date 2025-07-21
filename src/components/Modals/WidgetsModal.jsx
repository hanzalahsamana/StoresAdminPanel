import { addSection } from "@/APIs/SectionsData/addSection";
import { SectionStructure } from "@/Structure/SectionStructure";
import { useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const WidgetsModal = ({ isOpen, setIsOpen, handleAddSection, selectedOrder, setSelectedOrder }) => {
    const { currUser } = useSelector((state) => state.currentUser);
    const { store } = useSelector((state) => state.store);

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

            <div className={`fixed top-0 right-0 h-full w-80 bg-backgroundC shadow-lg z-[100] transform ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300`}>
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-semibold">Add Widgets</h2>
                    <button className="text-[18px]" onClick={() => { setSelectedOrder(null); setIsOpen(false) }}>
                        <IoCloseOutline />
                    </button>
                </div>
                <div className=" grid grid-cols-2 gap-3 p-4 overflow-y-auto max-h-[80vh]">
                    {Object.entries(SectionStructure).map(([widget, section]) => {
                        if (section?.isGlobal) return null;
                        return (
                            <div
                                key={widget} // Ensuring a unique key
                                onClick={() => {
                                    handleAddSection({
                                        type: widget,
                                        name: section?.name || section?.data?.title || "Untitled",
                                        visibility: true,
                                        sectionData: section?.data,
                                        _id: section?._id
                                    });
                                    setSelectedOrder(null)
                                    setIsOpen(false)
                                }}
                                className={`p-3 flex flex-col gap-2  justify-center items-center rounded-sm  ${section?.comingSoon ? 'cursor-not-allowed bg-gray-100 opacity-60' : 'bg-gray-100 cursor-pointer hover:bg-gray-200'}`}
                            >
                                <p className="text-[20px]"> {section?.icon}</p>
                                <p className="text-[14px] text-center"> {section?.name || "Untitled"}</p>
                            </div>
                        )
                    })}
                </div>

            </div>
        </div>
    );
};

export default WidgetsModal;
