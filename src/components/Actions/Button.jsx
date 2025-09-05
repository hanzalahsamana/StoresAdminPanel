'use client';

import React from 'react';
import ButtonLoader from '../Loader/ButtonLoader';
import { useSelector } from 'react-redux';
import { PiIntersectionDuotone } from 'react-icons/pi';

const Button = ({
  type = 'button',
  label = 'Click',
  className = '',
  loading = false,
  size = 'large',
  variant = 'primary', // Added variant prop
  action = () => {},
  active = true,
  icon = null,
  iconPosition = 'left',
  iconOnHover = false,
}) => {
  const isOnline = useSelector((state) => state.network.isOnline);

  // Define button styles based on variant
  const buttonStyles = {
    primary: 'bg-primaryC text-backgroundC border border-primaryC shadow-[inset_0_-3.2px_#02599b]',
    outline: 'border-2 border-primaryC text-primaryC bg-transparent  leading-[calc(1em)]',
    danger: 'bg-red-600 text-backgroundC border border-red-600 shadow-[inset_0_-3.2px_#991b1b]',
    black: 'bg-[#424242] border border-[#424242] text-backgroundC shadow-[inset_0_-3.2px_#000000]',
    white: 'bg-backgroundC border text-textC border-borderC shadow-[inset_0_-3px_#d7d7da]',
    warning: 'bg-[#FA9A1F] text-white border border-[#FA9A1F] shadow-[inset_0_-3.2px_#b45309]',
    text: 'bg-transparent text-primaryC py-0 !px-[5px]',
    disable: 'cursor-not-allowed text-[#4f4c4c89] border !border-transparent !bg-[#c5c5c589]',
  };

  const buttonSizes = {
    large: 'text-[16px]/[16px] h-[42px] px-[10px] min-w-[150px] ',
    small: 'text-[14px]/[14px] py-[10px] px-[20px] h-max w-max',
  };

  return (
    <button
      onClick={action}
      disabled={loading || !active}
      type={type}
      className={`relative group  transition-all duration-200 w-full font-medium inline-flex items-center justify-center rounded-[4px]  ease-in-out
                        ${buttonSizes[size]}
                        ${loading || !active ? buttonStyles?.disable : buttonStyles[variant] || buttonStyles.primary} 
                        ${className}
                  `}
    >
      {loading && (
        <span className="absolute inset-0  flex items-center justify-center">
          <ButtonLoader />
        </span>
      )}

      <span className={`${loading ? 'invisible' : 'visible'} flex items-center`}>
        {icon && iconPosition === 'left' && (
          <span
            className={`flex-none transition-all duration-300 overflow-hidden ${
              iconOnHover ? 'opacity-0 max-w-0 group-hover:opacity-100 group-hover:max-w-6' : 'opacity-100 max-w-6'
            }`}
            style={{ transitionProperty: 'opacity, max-width' }}
          >
            <span className="pr-2 flex items-center">{icon}</span>
          </span>
        )}

        {label && <span className="whitespace-nowrap">{label}</span>}

        {icon && iconPosition === 'right' && (
          <span
            className={`flex-none transition-all duration-200 overflow-hidden ${
              iconOnHover ? 'opacity-0 max-w-0 group-hover:opacity-100  group-hover:max-w-6 ' : 'opacity-100 max-w-6'
            }`}
            style={{ transitionProperty: 'opacity, max-width' }}
          >
            <span className="pl-2 flex items-center">{icon}</span>
          </span>
        )}
      </span>
    </button>
  );
};

export default Button;
