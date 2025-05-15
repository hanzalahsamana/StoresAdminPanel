import React from 'react';
import { BsQuestion } from 'react-icons/bs';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const InfoTooltip = ({ id, content }) => {
  return (
    <div className="inline-block">
      <div
        data-tooltip-id={id}
        className="w-[14px] h-[14px] text-[10px] rounded-full bg-primaryC text-backgroundC  text-xs flex items-center justify-center cursor-pointer"
      >
        <BsQuestion/>
      </div>
      
      <Tooltip
        id={id}
        place="top"
        content={content}
        className="text-xs px-2 py-1"
        style={{
          backgroundColor: '#000',
          color: '#fff',
          borderRadius: '4px',
          maxWidth: '200px',
          whiteSpace: 'normal',
          fontSize: '0.75rem',
        }}
      />
    </div>
  );
};

export default InfoTooltip;
