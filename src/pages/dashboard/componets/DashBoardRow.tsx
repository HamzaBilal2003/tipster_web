import React from "react";
import { Link, Links } from "react-router-dom";
import MoreDropdown from "../../../components/MoreDropdown";
import { API_DOMAIN_images } from "../../../../util/apiConfig";

interface User {
    id: number;
    username: string;
    email: string;
    profile_picture: string | null;
    is_active: number;
    vip_status: string;
    phone: string;
    created_at: string;
}

interface UserRowProps {
    displayData: User;
    index: number;
}

const DashBoardRow: React.FC<UserRowProps> = ({ displayData, index }) => {
    const isActive = displayData.is_active === 1;
    const formattedDate = new Date(displayData.created_at).toLocaleDateString();

    return (
        <tr className={`hover:bg-[#ececec] hover:cursor-pointer`}>
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
                                displayData.profile_picture
                                    ? API_DOMAIN_images+  displayData.profile_picture
                                    : `https://randomuser.me/api/portraits/men/4${index}.jpg`
                            }
                            alt="profile"
                            className="h-8 w-8 rounded-full"
                        />
                        <span className="text-black">{displayData.username}</span>
                    </div>
                </div>
            </td>

            {/* Email, Phone, VIP Status, Reg Date */}
            <td className="px-4 py-2 text-black">{displayData.email}</td>
            <td className="px-4 py-2 text-black">{displayData.phone}</td>
            <td className="px-4 py-2 text-black">{displayData.vip_status}</td>
            <td className="px-4 py-2 text-black">{formattedDate}</td>

            {/* Online Status Indicator */}
            <td className="px-4 py-2">
                <div className={`flex items-center justify-center gap-2 p-2 py-1 rounded-full`}>
                    <div
                        className={`h-3 w-3 rounded-full ${isActive ? "bg-green-500" : "bg-[#FF0000]"}`}
                    />
                </div>
            </td>

            {/* Subscription Indicator */}
            <td className="px-4 py-2">
                <div className={`flex items-center gap-2 p-1 px-2 rounded-full ${isActive ? "bg-[#0080004a] text-[#008000]" : "bg-[#ff00003e] text-[#FF0000]"}`}>
                    <div
                        className={`h-3 w-3 rounded-full ${isActive ? "bg-green-500" : "bg-[#FF0000]"}`}
                    />
                    {isActive ? "Active" : "Inactive"}
                </div>
            </td>

            {/* Dropdown Menu */}
            <td className="px-4 relative">
                <MoreDropdown
                    iconClass="bi bi-three-dots-vertical text-black"
                    menuClass="bg-black min-w-[200px]"
                >
                    <div className="bg-white p-4 flex flex-col gap-3">
                            <Link to={`/users/${displayData.id}/profile`} className="bor text-black bg-white py-2 rounded-lg hover:bg-gray-100 hover:text-black">
                                View profile
                            </Link>
                    </div>
                </MoreDropdown>
            </td>
        </tr>
    );
};

export default DashBoardRow;