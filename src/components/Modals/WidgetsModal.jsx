import { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { LuPlus } from "react-icons/lu";

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

const WidgetsModal = ({ isOpen, setIsOpen }) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
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
                    onClick={() => setIsOpen(false)}
                ></div>
            )}

            <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-[100] transform ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300`}>
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-2xl font-semibold">Widgets</h2>
                    <button className="text-[18px]" onClick={() => setIsOpen(false)}>
                        <IoCloseOutline />
                    </button>
                </div>

                <div className="p-4 overflow-y-auto max-h-[80vh]">
                    {widgets.map((widget) => (
                        <div key={widget.id} className="p-3 bg-gray-100 rounded-sm mb-2 cursor-pointer hover:bg-gray-200">
                            {widget.name}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WidgetsModal;
