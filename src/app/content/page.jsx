"use client";

import ProtectedRoute from "@/AuthenticRouting/ProtectedRoutes";
import Loader from "@/components/Loader/loader";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { RiDraggable } from "react-icons/ri";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useSelector } from "react-redux";
import WidgetsModal from "@/components/Modals/WidgetsModal";
import PageEditModal from "@/components/UI/PageEditModal";

const pagesIcons = {
    "About Us": "https://img.icons8.com/color/48/about.png",
    FAQ: "https://img.icons8.com/office/40/ask-question.png",
    Contact: "https://img.icons8.com/color/48/add-contact-to-company.png",
    "Terms and Conditions": "https://img.icons8.com/color/48/terms-and-conditions.png",
    "Privacy Policy": "https://img.icons8.com/color/48/privacy-policy.png",
    "Site Logo": "https://img.icons8.com/stickers/50/geometry.png",
    "Manufacture Process": "https://img.icons8.com/3d-fluency/50/chemical-plant.png",
    "Our Quality": "https://img.icons8.com/3d-fluency/50/guarantee.png",
    "Hero Banner": "https://img.icons8.com/3d-fluency/50/old-shop.png",
    "Return Policy": "https://img.icons8.com/color/48/return.png",
    "Shipping Policy": "https://img.icons8.com/color/48/in-transit--v1.png",
    "Fabric Remants": "https://img.icons8.com/color/48/polishing-cloth.png",
};

const Content = () => {
    const { pagesData, pagesDataLoading } = useSelector((state) => state.pagesData);
    const [editingPage, setEditingPage] = useState(null);
    const [hoverIndex, setHoverIndex] = useState(null);
    const [items, setItems] = useState([]);
    const [isOpen, setIsOpen] = useState(false);


    useEffect(() => {
        setItems(pagesData || []);
    }, [pagesData]);

    const handleDragEnd = (result) => {
        if (!result.destination) return;
        setItems((prevItems) => {
            const reordered = [...prevItems];
            const [movedItem] = reordered.splice(result.source.index, 1);
            reordered.splice(result.destination.index, 0, movedItem);
            return reordered;
        });
    };

    if (pagesDataLoading) return <Loader />;

    return (
        <div className="min-h-full px-5 py-5 flex justify-center items-center">
            <div className="w-full px-5 bg-backgroundC py-5 rounded-md shadow-md">
                <PageEditModal selectedPage={editingPage} setSelectedPage={setEditingPage} />
                <h1 className="text-2xl font-semibold mb-4">Update Pages</h1>
                {/* <div className="w-full flex text-textTC pt-2 pb-4 border-b border-gray-300">
                   <div>Order</div>
                   <div>Title</div>
                   <div>Title</div>
                </div> */}

                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="pagesList">
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
                                {items.map((item, index) => (
                                    <Draggable key={item.type} draggableId={item.type} index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                className={`relative flex items-center pt-2 pb-4 border-b border-gray-300 bg-backgroundC transition-all duration-300 ${snapshot.isDragging ? "shadow-lg bg-gray-100" : ""
                                                    }`}
                                            >
                                                <div {...provided.dragHandleProps} className="flex items-center text-xl cursor-grab">
                                                    <span className="text-[13px]">{index}</span><RiDraggable />
                                                </div>
                                                <div className="ml-3 p-2 w-12 h-12 bg-secondaryC rounded-full flex justify-center items-center">
                                                    <img src={pagesIcons[item.type]} alt={item.type} className="object-fill" />
                                                </div>
                                                <div className="ml-3 flex flex-col">
                                                    <h2 className="text-lg font-medium text-gray-900">{item.type}</h2>
                                                    <div className="flex gap-3">
                                                        <h2
                                                            className="text-sm cursor-pointer text-primaryC"
                                                            onClick={() => setEditingPage(item)}
                                                        >
                                                            Edit
                                                        </h2>
                                                        <h2
                                                            className="text-sm cursor-pointer text-red-500"
                                                            onClick={() => setEditingPage(item)}
                                                        >
                                                            Delete
                                                        </h2>
                                                    </div>
                                                </div>

                                                <div
                                                    className="absolute bottom-[-12px] w-full h-6 flex items-center"
                                                    onMouseEnter={() => setHoverIndex(index)}
                                                    onMouseLeave={() => setHoverIndex(null)}
                                                >
                                                    {hoverIndex === index && (
                                                        <div className="w-full flex flex-col items-center justify-center">
                                                            <span className="absolute border-b-2 animate-expand border-primaryC"></span>
                                                            <div onClick={() => setIsOpen(true)} data-tooltip-id="my-tooltip" data-tooltip-content="Add new section" className="relative  animate-expand2 cursor-pointer rounded-full bg-primaryC text-backgroundC flex justify-center items-center">
                                                                <LuPlus />
                                                            </div>
                                                        </div>
                                                    )}

                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
            <WidgetsModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
    );
};

export default ProtectedRoute(Content);
