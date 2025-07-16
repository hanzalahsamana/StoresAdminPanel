import { useRef, useState, useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";

export default function PopupMenu2({ label = '', trigger = null, data = [], onOpenChange = () => { } }) {
    const [visible, setVisible] = useState(false);
    const buttonRef = useRef(null);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(e.target) &&
                !buttonRef.current.contains(e.target)
            ) {
                setVisible(false);
                onOpenChange(false)
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleMenu = () => {
        const button = buttonRef.current;
        const menu = menuRef.current;
        if (!button || !menu) return;

        const buttonRect = button.getBoundingClientRect();
        const menuRect = menu.getBoundingClientRect();

        let left = 0
        let top = 0;

        const hasSpaceLeft = (buttonRect.left - 10) > menuRect.width;
        const hasSpaceAbove = (buttonRect.top - 10) > menuRect.height;

        if (!hasSpaceLeft) {
            left = 0;
        } else {
            left = -(menuRect.width - buttonRect.width);
        }

        if (!hasSpaceAbove) {

            top = buttonRect.height + 5;
        } else {
            top = -(menuRect.height + 5)
        }
        menu.style.top = `${top}px`;
        menu.style.left = `${left}px`;

        setVisible((prev) => {
            const newVal = !prev;
            onOpenChange(newVal);
            return newVal;
        });
    };


    return (
        <div className="relative z-10 w-max">
            <div ref={buttonRef} onClick={toggleMenu}>
                {trigger ? trigger : (
                    <div className='p-2 hover:bg-gray-200 rounded-md transition'>
                        <BsThreeDots />
                    </div>
                )}
            </div>

            <div
                ref={menuRef}
                className={`absolute w-max p-1.5 rounded-lg dropdownShadow bg-white z-[9990009] transition-all duration-150 ease-in-out 
                    ${visible
                        ? "opacity-100 translate-y-0 visible"
                        : "opacity-0 -translate-y-2 invisible"
                    }`}
            >
                {label && (<p className="text-sm font-semibold text-gray-400">{label}</p>)}
                {(data || []).map((item) => (
                    <div
                        key={item.name}
                        onClick={item?.action}
                        className="flex items-center gap-3 pl-2 pr-[30px] rounded-md text-[14px] py-2 hover:bg-gray-100 cursor-pointer text-gray-800"
                    >
                        <i className={``}>{item.icon}</i>
                        <span>{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
