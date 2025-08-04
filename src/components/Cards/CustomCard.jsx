"use client";

import { motion, AnimatePresence } from "framer-motion";
import InfoTooltip from "../Actions/InfoTooltip";

const CustomCard = ({ children, title, className, icon, info, actions, subText = null }) => {
  const hasChildren = Boolean(children);

  return (
    <div
      className={`px-[15px] py-[10px] w-full transition-all rounded-md bg-backgroundC border-[1.5px] border-[#788a9a2c] customShodow flex flex-col items-center h-auto ${className}`}
    >
      <div className="flex justify-between items-center w-full">
        <div className="flex text-[18px] items-center gap-2 w-full">
          {icon && icon}
          <div>
            <p className="text-textC font-medium">{title}</p>
            {subText && <p className="text-textTC text-sm">{subText}</p>}
          </div>
          {info && <InfoTooltip id={title} content={info} />}
        </div>
        {actions && <div>{actions}</div>}
      </div>

      {/* Animate children mount/unmount with smooth height transition */}
      <AnimatePresence initial={false}>
        {hasChildren && (
          <motion.div
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="w-full overflow-hidden mt-3"
          >
            <div className="flex-grow flex flex-col gap-4 w-full h-full pt-[12px] p-[2px] border-t justify-center items-center">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomCard;
