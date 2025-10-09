import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Modal from "./Modal";
import CustomCard from "../Cards/CustomCard";
import ImageSelector from "../Uploaders/ImageSlector";
import ThemeSelector from "../Uploaders/ThemeSeletctor";
import PillSelector from "../Actions/PillSelector";
import Button from "../Actions/Button";
import { PiImageThin, PiPaintBucketLight } from "react-icons/pi";
import { TfiThemifyFavicon } from "react-icons/tfi";
import { RxFontFamily } from "react-icons/rx";
import { editStoreAppearance } from "@/APIs/StoreDetails/editStoreAppearance";
import { toast } from "react-toastify";
import ActionCard from "../Cards/ActionCard";
import { RiImageCircleAiLine } from "react-icons/ri";
import { HiOutlineViewfinderCircle } from "react-icons/hi2";
import { BsJournalText } from "react-icons/bs";
import ImgToIcon from "../Actions/ImgToIcon";

const ThemeEditBlock = ({ className }) => {
  const { currUser } = useSelector((state) => state.currentUser);
  const { store } = useSelector((state) => state.store);
  const [loading, setLoading] = useState(false)

  const [branding, setBranding] = useState({
    logo: null,
    favicon: null,
    description: "",
    font: "Assistant",
    theme: "Light",
  });

  const handleSubmit = async () => {
    try {
      setLoading(true)
      await editStoreAppearance(currUser?.token, store?._id, branding);
      toast.success("Theme updated successfully");
    } catch (error) {
      console.error("Failed to update store appearance:", error);
      const message = error?.response?.data?.message || 'Something went wrong while updating theme.';
      toast.error(message);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    setBranding(store?.branding || {});
  }, [store?.branding])

  return (
    // <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
    <ActionCard
      label={"Theme Setting"}
      actionPosition="top"
      icon={<ImgToIcon url={'https://img.icons8.com/fluency/48/microsoft-paint.png'} />}
      subText={"Customize your store's appearance"}
      actions={<div className="w-full flex gap-3 justify-end items-center">
        {/* <Button
            label="Cancel"
            variant="white"
            size="small"
            action={() => setIsOpen(false)}
          /> */}
        <Button
          label="Save Theme"
          variant="black"
          size="small"
          loading={loading}
          action={handleSubmit}
        />
      </div>}
      className={`max-h-[500px] h-[500px] ${className}`}
    >
      {/* <div className="flex flex-col p-4 "> */}

      {/* <div className="flex items-center justify-between mb-2">
            <p className="font-bold text-[24px] text-textC capitalize">
              Theme Setting
            </p>
          </div> */}

      <div className="flex-1 overflow-y-auto customScroll space-y-4 w-full px-1 py-3 mb-2">
        <div className="grid grid-cols-2 gap-4">
          <CustomCard icon={<PiImageThin />} title="Store Logo">
            <ImageSelector
              size="large"
              multiple={false}
              label={null}
              image={branding.logo}
              setImage={(img) => setBranding({ ...branding, logo: img })}
            />
          </CustomCard>

          <CustomCard icon={<HiOutlineViewfinderCircle />} title="Favicon">
            <ImageSelector
              size="large"
              multiple={false}
              label={null}
              image={branding.favicon}
              setImage={(img) => setBranding({ ...branding, favicon: img })}
            />
          </CustomCard>
        </div>

        <CustomCard icon={<PiPaintBucketLight />} title="Theme Color">
          <ThemeSelector
            theme={branding.theme}
            setTheme={(theme) => setBranding({ ...branding, theme })}
          />
        </CustomCard>

        <CustomCard icon={<RxFontFamily />} title="Theme Font">
          <PillSelector
            label={null}
            data={[
              { label: "Assistant", value: "Assistant" },
              { label: "Inter", value: "Inter" },
              { label: "Roboto", value: "Roboto" },
              { label: "Poppins", value: "Poppins" },
            ]}
            selectedValue={branding.font}
            setSelectedValue={(font) => setBranding({ ...branding, font })}
          />
        </CustomCard>

        <CustomCard icon={<BsJournalText />} title="Store Description">
          <textarea
            className="w-full border p-2 rounded "
            cols={3}
            value={branding.description}
            onChange={(e) =>
              setBranding({ ...branding, description: e.target.value })
            }
            placeholder="Add store description..."
          />
        </CustomCard>
      </div>


      {/* </div> */}
    </ActionCard >

    // </Modal >
  );
};

export default ThemeEditBlock;
