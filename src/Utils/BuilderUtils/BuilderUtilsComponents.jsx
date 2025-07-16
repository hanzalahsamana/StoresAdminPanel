// UTILS COMPONENT

import PopupMenu2 from "@/components/Modals/PopupMenu2";
import { SectionStructure } from "@/Structure/SectionStructure";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { LuPlus } from "react-icons/lu";
import { RxSection } from "react-icons/rx";

export const BuilderSideBarCard = ({ label, children }) => {
  return (
    <div className="border-b py-[18px] px-[12px] flex flex-col gap-3">
      <p className="text-[16px] font-semibold ">{label || 'Text'}</p>
      <div>{children}</div>
    </div>
  );
};

export const GlobalSectionCard = ({ globalSectionName, globalSection, setActiveSection, openMenuId, setOpenMenuId , sectionActions }) => (
  <div
    className={`group flex items-center justify-between w-full relative cursor-pointer 
    transition-opacity text-[15px] font-medium rounded-md text-[#838383] hover:bg-gray-100
    ${openMenuId === globalSectionName ? 'bg-gray-100' : ''}`}
  >
    <div className="p-2 rounded-md">{globalSection?.icon}</div>
    <p
      onClick={() => setActiveSection({
        type: 'header',
        name: globalSection?.name || "Untitled",
        visibility: true,
        content: globalSection?.data,
        _id: globalSection?._id
      })}
      className="flex-1 text-start text-gray-700 px-2 py-2"
    >
      {globalSection?.name || globalSectionName}
    </p>
    <PopupMenu2
      data={sectionActions}
      label="Actions"
      onOpenChange={(isOpen) => setOpenMenuId(isOpen ? globalSectionName : null)}
      trigger={
        <div className={`p-2 rounded-md transition ${openMenuId === globalSectionName ? 'bg-gray-200' : 'opacity-0 group-hover:opacity-100 hover:bg-gray-200'}`}>
          <BsThreeDots />
        </div>
      }
    />
  </div>
);


export const SectionAddAnimationLine = ({ selectedOrder, setSelectedOrder , index  , setIsOpen}) => {
  const [hoverIndex, setHoverIndex] = useState(null);

  return (
    <div
      key={index}
      className='relative w-full h-[4px] flex items-center group'
      onMouseEnter={() => setHoverIndex(index)}
      onMouseLeave={() => setHoverIndex(null)}
    >
      {(hoverIndex === index || selectedOrder === index + 1) && (
        <div className='w-full flex flex-col items-center justify-center'>
          <span className='border-b-2 animate-expand border-primaryC'></span>
          <div
            data-tooltip-id='customize'
            data-tooltip-content='Add section'
            onClick={() => {
              setSelectedOrder(index + 1);
              setIsOpen(true);
            }}
            className='absolute p-1 text-[12px] cursor-pointer rounded-full bg-primaryC text-backgroundC flex justify-center items-center'
          >
            <LuPlus />
          </div>
        </div>
      )}
    </div>
  )
}

export const SectionItemCard = ({ section, provided, snapshot, openMenuId, setOpenMenuId, sectionActions, setActiveSection }) => (
  <div
    key={section._id}
    ref={provided.innerRef}
    {...provided.draggableProps}
    className={`group flex items-center justify-between w-full relative cursor-pointer transition-opacity text-[15px] font-medium rounded-md text-[#838383] ${snapshot.isDragging ? 'bg-gray-200' : openMenuId === section._id ? 'bg-gray-100' : 'hover:bg-gray-100'
      }`}
  >
    <div {...provided.dragHandleProps} className="p-2 hover:bg-gray-200 rounded-md cursor-move">
      {SectionStructure?.[section?.type]?.icon || <RxSection />}
    </div>
    <p
      onClick={() => {
        setActiveSection(section);                
      }}
      className="flex-1 text-start text-gray-700 px-2 py-2"
    >
      {section?.name || 'Untitled Section'}
    </p>
    <PopupMenu2
      data={sectionActions}
      label="Actions"
      onOpenChange={(isOpen) => setOpenMenuId(isOpen ? section._id : null)}
      trigger={
        <div className={`p-2 rounded-md transition ${openMenuId === section._id ? 'bg-gray-200' : 'opacity-0 group-hover:opacity-100 hover:bg-gray-200'}`}>
          <BsThreeDots />
        </div>
      }
    />
  </div>
);
