// components/Modals/ImageSelectorModal.jsx
"use client";
import { useEffect, useState } from "react";
import Modal from "@/components/Modals/Modal";
import GalleryImageCard from "@/components/Cards/GalleryImageCard";
import Button from "@/components/Actions/Button";
import { getGalleryImages, uploadImage } from "@/APIs/Gallery/gallery";
import { useSelector } from "react-redux";
import ImageCardLoader from "../Loader/ImageCardLoader";
import ActionCard from "../Cards/ActionCard";
import ImgToIcon from "../Actions/ImgToIcon";
import { handleImageUpload } from "@/Utils/GalleryUtils";
import { IsArrayEqual } from "@/Utils/IsEqual";

const ImageSelectorModal = ({ isOpen, setIsOpen, selectedImage = [], setSelectedImage = () => { }, multiple = false }) => {
  const { currUser } = useSelector((state) => state.currentUser);
  const { store } = useSelector((state) => state.store);
  const { gallery, galleryLoading } = useSelector((state) => state.gallery);
  const [selectedImageUrls, setSelectedImageUrls] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [pendingUploads, setPendingUploads] = useState([]);
  const accept = ["image/jpeg", "image/png", "image/webp", "image/gif"];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (!IsArrayEqual(selectedImageUrls, selectedImage)) {
          handleConfirm();
        }
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, selectedImageUrls]);

  useEffect(() => {
    if (!gallery || gallery?.length === 0) {
      getGalleryImages(currUser?.token, store?._id);
    }
  }, []);

  useEffect(() => {
    if (selectedImage) {
      setSelectedImageUrls(selectedImage);
    }
  }, [selectedImage]);

  const handleConfirm = () => {
    const cleanImages = selectedImageUrls?.filter(Boolean) || [];
    setSelectedImage(cleanImages);
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isUploading && pendingUploads.length > 0) {
      processNextUpload(); // Start upload if not already uploading
    }
  }, [pendingUploads, isUploading]);

  const toggleImageSelect = (image) => {
    if (multiple) {
      setSelectedImageUrls((prev) =>
        prev.includes(image?.url) ? prev.filter((i) => i !== image?.url) : [...prev, image?.url]
      );
    } else {
      selectedImageUrls[0] === image?.url ? setSelectedImageUrls([]) : setSelectedImageUrls([image?.url])
    }
  }


  const processNextUpload = async () => {
    try {
      setIsUploading(true);
      const nextImage = pendingUploads[pendingUploads.length - 1];
      if (!nextImage) setIsUploading(false);
      const image = await uploadImage(currUser?.token, store?._id, nextImage?.file)
      setPendingUploads((prev) => prev.slice(0, -1));
      toggleImageSelect(image)
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

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} className={'h-[600px] max-h-[90%] max-w-screen-lg overflow-hidden'}>
      <ActionCard
        actions={
          <Button
            label={`Upload New`}
            action={() => document.getElementById("fileInput").click()}
            size="small"
          />
        }
        subText={'Upload new or select existing images'}
        icon={<ImgToIcon url={'https://img.icons8.com/fluency/48/gallery.png'} />}
        actionPosition="top"
        label={'Select Image'}
        className={'overflow-hidden !h-full !max-h-[600px] '}
      >

        <input
          id="fileInput"
          type="file"
          accept={accept.join(",")}
          multiple
          onChange={(e) => handleImageUpload(e, setPendingUploads)}
          className="hidden"
        />

        <div className="p-4 space-y-4  min-h-0 flex-1 overflow-y-scroll customScroll border-y">
          <div className="grid grid-cols-2 sm:grid-cols-4  md:grid-cols-5 lg:grid-cols-7 gap-3">
            {pendingUploads?.map((pendImage, i) => (
              <div
                key={i}
                className={`p-3 rounded-lg relative cursor-pointer transition-all bg-gray-100`}
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
              </div>
            ))}
            {galleryLoading ? (
              Array.from({ length: 12 }).map((_, idx) => (
                <ImageCardLoader key={idx} />
              ))
            ) : (
              gallery?.map((image) => {
                const isChecked = selectedImageUrls?.includes(image.url);
                return (<GalleryImageCard image={image} isChecked={isChecked} toggleImageSelect={toggleImageSelect} />);
              })
            )}
          </div>
        </div>
        <div className="flex justify-end">
          <Button label="Cancel" variant="white" action={() => setIsOpen(false)} size="small" />
          <Button
            label={`Done`}
            variant="black"
            className="ml-2"
            action={handleConfirm}
            active={!IsArrayEqual(selectedImageUrls, selectedImage)}
            size="small"
          />
        </div>
      </ActionCard>

    </Modal>
  );
};

export default ImageSelectorModal;
