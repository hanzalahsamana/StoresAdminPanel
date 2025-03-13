"use client";

import ProtectedRoute from "@/AuthenticRouting/ProtectedRoutes";
import Loader from "@/components/Loader/loader";
import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { RiDraggable } from "react-icons/ri";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useSelector } from "react-redux";
import WidgetsModal from "@/components/Modals/WidgetsModal";
import { RxExternalLink } from "react-icons/rx";
import BackgroundFrame from "@/components/Layout/BackgroundFrame";
import { AiOutlineDelete } from "react-icons/ai";
import Link from "next/link";
import LivePreview from "@/components/UI/LivePreview";
import HomeLayout from "@/components/Layout/HomeLayout";
import TemplateHeader from "@/components/Layout/TemplateHeader";
import TemplateFooter from "@/components/Layout/TemplateFooter";

const Design = () => {
    const { sectionsData, sectionsDataLoading } = useSelector((state) => state.sectionsData);
    const [hoverIndex, setHoverIndex] = useState(null);
    const [items, setItems] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setItems(sectionsData || []);
    }, [sectionsData]);

    // Drag and drop logic
    const handleDragEnd = (result) => {
        if (!result.destination) return;

        setItems((prevItems) => {
            const reordered = [...prevItems];
            const [movedItem] = reordered.splice(result.source.index, 1);
            reordered.splice(result.destination.index, 0, movedItem);

            console.log("Updated Order:", reordered); // Debugging
            return reordered;
        });
    };

    if (sectionsDataLoading) return <Loader />;

    return (
        <div className="flex justify-center items-start">
            <BackgroundFrame>
                <div className="w-full px-5 bg-backgroundC py-5 rounded-md shadow-md">
                    <h1 className="text-2xl font-semibold mb-4">Update Pages</h1>

                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="pagesList">
                            {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
                                    {items.map((item, index) => (
                                        <Draggable key={item._id} draggableId={item._id.toString()} index={index}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    className={`relative flex items-start pt-2 pb-4 border-b border-gray-300 bg-backgroundC transition-all duration-300 ${snapshot.isDragging ? "shadow-lg bg-gray-100" : ""
                                                        }`}
                                                >
                                                    <div {...provided.dragHandleProps} className="flex items-center text-[#787676] text-xl pl-[20px] cursor-grab active:cursor-grabbing">
                                                        <span className="text-[13px]">{index}</span><RiDraggable />
                                                    </div>

                                                    <div className="ml-3 flex flex-col gap-1">
                                                        <h2 className="text-lg font-medium text-gray-900">{item?.sectionName}</h2>
                                                        <div className="flex gap-3">
                                                            <Link
                                                                href={`/design/${item._id}`}
                                                                className="text-sm cursor-pointer text-primaryC flex items-center gap-1"
                                                            >
                                                                Edit <RxExternalLink size={12} />
                                                            </Link>
                                                            <h2
                                                                className="text-sm cursor-pointer text-red-500 flex items-center gap-1"
                                                            >
                                                                Delete <AiOutlineDelete scale={10} />
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
                                                                <div onClick={() => setIsOpen(true)} className="relative w-[25px] h-[25px] cursor-pointer rounded-full bg-primaryC text-backgroundC flex justify-center items-center">
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
            </BackgroundFrame>
            <LivePreview >
                <TemplateHeader />
                <HomeLayout />
                <TemplateFooter />
            </LivePreview>
        </div>
    );
};

export default ProtectedRoute(Design);
