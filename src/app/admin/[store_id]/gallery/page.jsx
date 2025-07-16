"use client";

import { deleteGalleryImagesApi, getGalleryImages, uploadImage } from "@/APIs/Gallery/gallery";
import Button from "@/components/Actions/Button";
import Checkbox from "@/components/Actions/CheckBox";
import DropDown from "@/components/Actions/DropDown";
import ImgToIcon from "@/components/Actions/ImgToIcon";
import ActionCard from "@/components/Cards/ActionCard";
import GalleryImageCard from "@/components/Cards/GalleryImageCard";
import FormInput from "@/components/Forms/FormInput";
import BackgroundFrame from "@/components/Layout/BackgroundFrame";
import ImageCardLoader from "@/components/Loader/ImageCardLoader";
import Loader from "@/components/Loader/loader";
import useConfirm from "@/Hooks/useConfirm";
import { addGalleryImage } from "@/Redux/Gallery/GallerySlice";
import { FormatSize } from "@/Utils/FormatSize";
import { handleImageUpload } from "@/Utils/GalleryUtils";
import React, { useEffect, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { GoDash } from "react-icons/go";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Page = () => {
    const { currUser } = useSelector((state) => state.currentUser);
    const { gallery, galleryLoading } = useSelector((state) => state.gallery);
    const { store } = useSelector((state) => state.store);
    const accept = ["image/jpeg", "image/png", "image/webp", "image/gif"];


    const [isUploading, setIsUploading] = useState(false);
    const [pendingUploads, setPendingUploads] = useState([]);
    const [selectedImageIds, setSelectedImageIds] = useState([]);
    const [deletingLoading, setDeletingLoading] = useState(false);
    const { confirm, ConfirmationModal } = useConfirm();


    useEffect(() => {
        if (!gallery || gallery?.length === 0) {
            getGalleryImages(currUser?.token, store?._id);
        }
    }, []);

    useEffect(() => {
        if (!isUploading && pendingUploads.length > 0) {
            processNextUpload(); // Start upload if not already uploading
        }
    }, [pendingUploads, isUploading]);

    const processNextUpload = async () => {
        try {
            setIsUploading(true);
            const nextImage = pendingUploads[pendingUploads.length - 1];
            if (!nextImage) setIsUploading(false);
            await uploadImage(currUser?.token, store?._id, nextImage?.file)
            setPendingUploads((prev) => prev.slice(0, -1));
        } catch (err) {
            console.error('Upload failed:', err.message);
            setPendingUploads((prev) =>
                prev.map((img, idx) =>
                    idx === 0 ? { ...img, status: 'failed' } : img
                )
            );
        } finally {
            setIsUploading(false);
        }
    };


    const handleDeleteImages = async () => {
        try {
            const ok = await confirm("Delete Images", "Are you sure you want to delete that Images?");
            if (!ok) return;
            setDeletingLoading(true)
            await deleteGalleryImagesApi(currUser?.token, store?._id, selectedImageIds)
            toast.success('Images deleted successfully')
        } catch (error) {
            toast.error(error.response ? error.response.data.message : error.message)
        } finally {
            setDeletingLoading(false)
            setSelectedImageIds([])
        }
    }

    const toggleImageSelect = (image) => {
        return setSelectedImageIds((prev) =>
            prev.includes(image?._id) ? prev.filter((item) => item !== image?._id) : [...prev, image?._id]
        )
    }

    return (
        <BackgroundFrame className="h-full">
            <ActionCard
                label={"Gallery"}
                icon={<ImgToIcon url={"https://img.icons8.com/fluency/48/gallery.png"} />}
                subText={"Upload, Delete and Manage your gallery."}
                actionPosition="top"
                actions={
                    <>
                        <Button size="small" label="Upload New" icon={<FiUploadCloud />} action={() => document.getElementById("multiFileInput").click()} />
                        <Button
                            size="small"
                            variant="danger"
                            active={selectedImageIds?.length > 0}
                            action={handleDeleteImages}
                            label={`Delete ${selectedImageIds?.length > 0 ? `(${selectedImageIds?.length} img)` : ''} `}
                        />
                    </>}
            >
                <input
                    id="multiFileInput"
                    type="file"
                    accept={accept.join(",")}
                    multiple
                    onChange={(e) => handleImageUpload(e, setPendingUploads)}
                    className="hidden"
                />
            </ActionCard>
            <div className="bg-white border-[1.5px] rounded-md p-4 space-y-6 py-6 flex-1 min-h-0 overflow-y-auto customScroll">
                <div className="grid grid-cols-2 sm:grid-cols-4  md:grid-cols-5 lg:grid-cols-6 gap-3">
                    {pendingUploads?.map((pendImage, i) => (
                        <div
                            key={i}
                            className={`p-4 rounded-lg relative cursor-pointer transition-all bg-gray-100`}
                        >
                            <div className={`absolute bg-black w-full h-full flex justify-center items-center flex-col top-0 right-0 z-[1] rounded-lg ${true ? ' opacity-80' : 'opacity-0'}`}>
                                <div className="w-[20px] h-[20px] border-2 border-transparent border-t-[white] rounded-full animate-spin "></div>
                                <p className="text-white py-2">Uploading ...</p>
                            </div>
                            <div className="p-0 rounded-lg border bg-white relative">
                                <img
                                    className="aspect-square rounded-lg  object-contain"
                                    src={pendImage?.previewUrl}
                                    alt=""
                                />
                            </div>
                            <p className="text-sm font-medium text-center flex items-center gap-1 justify-center pt-2 text-black ">
                                Uploading
                            </p>
                        </div>
                    ))}

                    {galleryLoading ? (
                        Array.from({ length: 12 }).map((_, idx) => (
                            <ImageCardLoader key={idx} />
                        ))
                    ) : (
                        gallery?.map((image) => {
                            const isChecked = selectedImageIds?.includes(image._id);
                            if (deletingLoading && isChecked) {
                                return <ImageCardLoader key={image._id} />;
                            }
                            return (<GalleryImageCard image={image} isChecked={isChecked} toggleImageSelect={toggleImageSelect} />);
                        })
                    )}

                </div>
            </div>
            {ConfirmationModal}
        </BackgroundFrame>
    );
};

export default Page;
