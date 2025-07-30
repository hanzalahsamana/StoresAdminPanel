import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { BsThreeDots } from "react-icons/bs";

export default function PopupMenu2({ label = '', trigger = null, data = [], onOpenChange = () => { } }) {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
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
                onOpenChange(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const button = buttonRef.current;
        const menu = menuRef.current;
        if (button && menu) {

            const buttonRect = button.getBoundingClientRect();
            const menuRect = menu.getBoundingClientRect();

            let left = 0;
            let top = 0;

            const hasSpaceLeft = (buttonRect.left - 10) > menuRect.width;
            const hasSpaceAbove = (buttonRect.top - 10) > menuRect.height;

            if (!hasSpaceLeft) {
                left = buttonRect.left;
            } else {
                left = buttonRect.right - menuRect.width;
            }

            if (!hasSpaceAbove) {
                top = buttonRect.bottom + 5;
            } else {
                top = buttonRect.top - menuRect.height - 5;
            }

            setPosition({ top, left });
        }
    }, [visible])

    const toggleMenu = () => {


        setVisible((prev) => {
            const newVal = !prev;
            onOpenChange(newVal);
            return newVal;
        });
    };

    const menu = createPortal(
        <div
            ref={menuRef}
            className={`fixed w-max p-1.5 rounded-lg dropdownShadow bg-white z-[9990009] transition-all duration-150 ease-in-out
        ${visible ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"}`}
            style={{ top: position.top, left: position.left }}
        >
            {label && (<p className="text-sm font-semibold text-gray-400">{label}</p>)}
            {(data || []).map((item) => (
                <div
                    key={item.name}
                    onClick={() => {
                        item?.action?.();
                        setVisible(false);
                        onOpenChange(false);
                    }}
                    className="flex items-center gap-3 pl-2 pr-[30px] rounded-md text-[14px] py-2 hover:bg-gray-100 cursor-pointer text-gray-800"
                >
                    <i>{item.icon}</i>
                    <span>{item.name}</span>
                </div>
            ))}
        </div>,
        document.body
    );

    return (
        <>
            <div className="relative w-max">
                <div ref={buttonRef} onClick={toggleMenu}>
                    {trigger ? trigger : (
                        <div className="p-2 hover:bg-gray-200 rounded-md transition">
                            <BsThreeDots />
                        </div>
                    )}
                </div>
            </div>
            {menu}
        </>
    );
}
