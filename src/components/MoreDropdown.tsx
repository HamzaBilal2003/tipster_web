import React, { useState, useRef, useEffect } from "react";

interface MoreDropdownProps {
    iconClass?: string;
    dropdownClass?: string;
    buttonClass?: string;
    menuClass?: string;
    children?: React.ReactNode;
}

const MoreDropdown: React.FC<MoreDropdownProps> = ({
    iconClass = "bi bi-three-dots-vertical",
    dropdownClass = "",
    buttonClass = "",
    menuClass = "",
    children,
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    return (
        <div className={`relative w-fit ${dropdownClass}`} ref={dropdownRef}>
            {/* Dropdown Trigger Button */}
            <button
                className={`w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer  ${buttonClass}`}
                onClick={toggleDropdown}
                aria-haspopup="true"
                aria-expanded={isOpen}
                role="button"
            >
                <i className={iconClass}></i>
            </button>

            {/* Dropdown Content */}
            {isOpen && (
                <div
                    className={`absolute top-[88%] mt-2 z-40 right-0 overflow-hidden shadow-md shadow-gray-900 rounded-md ${menuClass}`}
                >
                    {children ? (
                        <div>{children}</div>
                    ) : (
                        <div className="px-4 py-2 text-gray-500">No content available</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MoreDropdown;
