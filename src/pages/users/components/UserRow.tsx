import React from "react";
import { Link } from "react-router-dom";
import MoreDropdown from "../../../components/MoreDropdown";

interface UserRowProps {
    displayData: {
        img?: string;
        name: string;
        email: string;
        phone: string;
        status: boolean;
        dob: string;
        reg_date: string;
        isOnline: boolean;
        subscription: boolean;
        last_login: string
    };
    index: number;
    onEditUser?: (data: any) => void;
}

const UserRow: React.FC<UserRowProps> = ({ displayData, index,onEditUser }) => {

    return (
        <tr
            className={`hover:bg-[#ececec] hover:cursor-pointer`}
        >
            {/* Checkbox and User Info */}
            <td className="px-4 py-2">
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        className="appearance-none w-5 h-5 border-2 border-gray-400 rounded-md 
                        checked:bg-green-600 checked:border-green-600 focus:ring-2 focus:ring-green-500 
                        relative flex items-center justify-center 
                        checked:after:content-['✓'] checked:after:text-white checked:after:text-xs checked:after:font-bold 
                        checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"
                    />
                    <div className="flex items-center gap-2">
                        <img
                            src={
                                displayData.img
                                    ? displayData.img
                                    : `https://randomuser.me/api/portraits/men/4${index}.jpg`
                            }
                            alt="profile"
                            className="h-8 w-8 rounded-full"
                        />
                        <span className="text-black">{displayData.name}</span>
                    </div>
                </div>
            </td>

            {/* Email , Phone , dob , reg_date */}
            <td className="px-4 py-2 text-black">{displayData.email}</td>
            <td className="px-4 py-2 text-black">{displayData.phone}</td>
            <td className="px-4 py-2 text-black">{displayData.last_login}</td>
            <td className="px-4 py-2 text-black">{displayData.reg_date}</td>

            {/* isOnline Status Indicator */}
            <td className="px-4 py-2">
                <div className={`flex items-center justify-center gap-2 p-2 py-1 rounded-full `}>
                    <div
                        className={`h-3 w-3 rounded-full ${displayData.isOnline ? "bg-green-500" : "bg-[#FF0000]"}`}
                    >
                    </div>
                </div>
            </td>


            {/* subscription Indicator */}
            <td className="px-4 py-2">
                <div className={`flex items-center gap-2 p-1 px-2 rounded-full ${displayData.subscription ? "bg-[#0080004a] text-[#008000]" : "bg-[#ff00003e] text-[#FF0000]"}`}>
                    <div
                        className={`h-3 w-3 rounded-full ${displayData.subscription ? "bg-green-500" : "bg-[#FF0000]"}`}
                    >
                    </div>
                    {displayData.subscription ? "Active" : "Inactive"}
                </div>
            </td>

            {/* Dropdown Menu */}
            <td className="px-4 relative">
                <MoreDropdown
                    iconClass="bi bi-three-dots-vertical text-black"
                    menuClass="bg-white min-w-[150px]"
                >
                    <div className="p-2 flex flex-col gap-2">
                        <Link to={`/users/${displayData.name}/profile`} className="px-2 py-4 text-left rounded-lg cursor-pointer hover:bg-gray-100">
                            User Detials
                        </Link>
                        <button onClick={() => onEditUser && onEditUser(displayData)} className="px-2 py-4 text-left rounded-lg cursor-pointer hover:bg-gray-100">
                            Edit Detials
                        </button>
                        <div className="w-full h-[2px] bg-gray-300"></div>
                        <button className="px-2 py-4 text-left rounded-lg cursor-pointer hover:bg-gray-100">
                            Ban
                        </button>
                    </div>
                </MoreDropdown>
            </td>
        </tr>
    );
};

export default UserRow;
