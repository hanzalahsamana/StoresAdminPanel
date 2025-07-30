import React from "react";
import Modal from "./Modal";
import CustomCard from "../Cards/CustomCard";
import ImageSelector from "../Uploaders/ImageSlector";
import ThemeSelector from "../Uploaders/ThemeSeletctor";
import PillSelector from "../Actions/PillSelector";
import Button from "../Actions/Button";

import { PiImageThin, PiPaintBucketLight } from "react-icons/pi";
import { TfiThemifyFavicon } from "react-icons/tfi";
import { HiOutlinePaintBrush } from "react-icons/hi2";
import { RxFontFamily } from "react-icons/rx";

const ThemeEditModal = ({ isOpen = true, setIsOpen = () => {} }) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="flex flex-col p-4 max-h-[450px] h-[450px]">
        <div className="flex items-center justify-between mb-2">
          <p className="font-bold text-[24px] text-textC capitalize">
            Theme Setting
          </p>
        </div>

        <div className="flex-1 overflow-y-auto customScroll space-y-4 w-full px-1 py-3 mb-2">
          <div className="grid grid-cols-2 gap-4">
            <CustomCard icon={<PiImageThin />} title="Logo">
              <ImageSelector size="large" label={null} />
            </CustomCard>

            <CustomCard icon={<TfiThemifyFavicon />} title="Favicon">
              <ImageSelector size="large" label={null} />
            </CustomCard>
          </div>

          <CustomCard icon={<PiPaintBucketLight />} title="Theme Color">
            <ThemeSelector />
          </CustomCard>

          <CustomCard icon={<RxFontFamily />} title="Theme Font">
            <PillSelector
              label={null}
              data={[
                { label: "Inter", value: "inter" },
                { label: "Roboto", value: "roboto" },
                { label: "Poppins", value: "poppins" },
              ]}
            />
          </CustomCard>
        </div>

        <div className="w-full flex gap-3 justify-end items-center">
          <Button
            label="Cancel"
            variant="white"
            size="small"
            action={() => setIsOpen(false)}
          />
          <Button
            label="Done"
            variant="black"
            size="small"
            action={() => setIsOpen(false)}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ThemeEditModal;
