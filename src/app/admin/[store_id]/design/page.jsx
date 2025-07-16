"use client";

import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { RiDraggable } from "react-icons/ri";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useDispatch, useSelector } from "react-redux";
import WidgetsModal from "@/components/Modals/WidgetsModal";
import { RxExternalLink } from "react-icons/rx";
import BackgroundFrame from "@/components/Layout/BackgroundFrame";
import { AiOutlineDelete } from "react-icons/ai";
import Link from "next/link";
import LivePreview from "@/components/UI/LivePreview";
import HomeLayout from "@/components/Layout/HomeLayout";
import TemplateHeader from "@/components/Layout/TemplateHeader";
import TemplateFooter from "@/components/Layout/TemplateFooter";
import { deleteSection } from "@/APIs/SectionsData/deleteSection";
import Button from "@/components/Actions/Button";
import { toast } from "react-toastify";
import { changeSectionOrder } from "@/APIs/SectionsData/changeSectionOrder";
import ActionCard from "@/components/Cards/ActionCard";
import CardLoader from "@/components/Loader/CardLoader";

const Design = () => {
    const { sectionsData } = useSelector((state) => state.sectionsData);
    const [hoverIndex, setHoverIndex] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [items, setItems] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { currUser } = useSelector((state) => state.currentUser);
    const { store } = useSelector((state) => state.store);

    useEffect(() => {
        setItems(sectionsData || []);
    }, [sectionsData]);

    const handleDragEnd = async (result) => {
        if (!result.destination) return;

        setItems((prevItems) => {
            const reordered = [...prevItems];
            const [movedItem] = reordered.splice(result.source.index, 1);
            reordered.splice(result.destination.index, 0, movedItem);

            return reordered;
        });

        try {
            setLoading(true);
            await changeSectionOrder(currUser?.token, store?._id, result.draggableId, result.destination.index + 1)
        } catch (error) {
            console.log("Updated Order: 🧲🧲", error);
            toast.error(error.response ? error.response.data.message : error.message)
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (sectionId) => {
        try {
            setLoading(true);
            await deleteSection(currUser?.token, store?._id, sectionId)
            toast.success('Section deleted successfully');
        } catch (error) {
            console.error("Error deleting section:", error);
            toast.error(error.response ? error.response.data.message : error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-start flex-col md:flex-row">
            <BackgroundFrame className="gap-0">
                <ActionCard
                    label={"Update Home Page"}
                    actionPosition="hidden"
                    className={'!h-[calc(100vh-92px)]'}
                >
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="pagesList">
                            {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3 px-[8px] h-full overflow-y-auto customScroll">
                                    {items.length !== 0 ? items.map((item, index) => (
                                        loading ? (
                                            <div key={item._id}>
                                                <CardLoader />
                                            </div>
                                        ) : (
                                            <Draggable key={item._id} draggableId={item._id.toString()} index={index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        className={`relative flex items-start pt-2 pb-4 border-b border-gray-300 bg-backgroundC transition-all duration-300 ${snapshot.isDragging ? "shadow-lg bg-gray-100" : ""
                                                            }`}
                                                    >
                                                        {/* Drag Handle */}
                                                        <div
                                                            {...provided.dragHandleProps}
                                                            className="flex items-center text-[#787676] text-xl pl-[20px] cursor-grab active:cursor-grabbing"
                                                        >
                                                            <span className="text-[13px]">{index}</span><RiDraggable />
                                                        </div>

                                                        {/* Section Details */}
                                                        <div className="ml-3 flex flex-col gap-1">
                                                            <h2 className="text-lg font-medium text-gray-900">{item?.sectionName}</h2>
                                                            <div className="flex gap-3">
                                                                <Link
                                                                    href={`./design/${item._id}`}
                                                                    className="text-sm cursor-pointer text-primaryC flex items-center gap-1"
                                                                >
                                                                    Edit <RxExternalLink size={12} />
                                                                </Link>
                                                                <h2
                                                                    onClick={() => handleDelete(item._id)}
                                                                    className="text-sm cursor-pointer text-red-500 flex items-center gap-1"
                                                                >
                                                                    Delete <AiOutlineDelete scale={10} />
                                                                </h2>
                                                            </div>
                                                        </div>

                                                        {/* Hover Action */}
                                                        <div
                                                            className="absolute bottom-[-12px] w-full h-6 flex items-center"
                                                            onMouseEnter={() => setHoverIndex(index)}
                                                            onMouseLeave={() => setHoverIndex(null)}
                                                        >
                                                            {hoverIndex === index && (
                                                                <div className="w-full flex flex-col items-center justify-center">
                                                                    <span className="absolute border-b-2 animate-expand border-primaryC"></span>
                                                                    <div
                                                                        onClick={() => { setSelectedOrder(index + 1); setIsOpen(true); }}
                                                                        className="relative w-[25px] h-[25px] cursor-pointer rounded-full bg-primaryC text-backgroundC flex justify-center items-center"
                                                                    >
                                                                        <LuPlus />
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        )
                                    )) : (
                                        <div
                                            className="flex justify-center items-center py-[20px]"
                                        >
                                            <Button
                                                action={() => { setSelectedOrder(1); setIsOpen(true); }}
                                                variant="outline"
                                                label="Add Section"
                                                className="w-max"
                                            />

                                        </div>
                                    )}

                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </ActionCard>

                <WidgetsModal isOpen={isOpen} setIsOpen={setIsOpen} selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder} setLoading={setLoading} />
            </BackgroundFrame>
            <LivePreview >
                <TemplateHeader />
                <HomeLayout />
                <TemplateFooter />
            </LivePreview>
        </div>
    );
};

export default Design;
