import React from "react";
import MoreDropdown from "../../../components/MoreDropdown";
import { API_DOMAIN_images } from "../../../../util/apiConfig";

interface TipRowProps {
    displayData: {
        id: number;
        user_id: number;
        betting_company_id: number;
        codes: string;
        ods: string;
        status: string;
        result: string;
        match_date: string;
        betting_category: string;
        created_at: string;
        updated_at: string;
        betting_company: {
            id: number;
            title: string;
            logo: string;
            status: string;
            created_at: string;
            updated_at: string;
        };
        user: {
            id: number;
            username: string;
            profile_picture: string;
            win_rate: string;
            last_five: Array<string>;
        };
    }
    index: number;
    onViewTip?: (data: any) => void;
}

const TipRow: React.FC<TipRowProps> = ({ displayData, index, onViewTip }) => {
    const getColor = (icon: string) => {
        if (icon.toLowerCase() === "l") return "red-500";
        if (icon.toLowerCase() === "r") return "yellow-500";
        return "green-500";
      };
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
                            src={API_DOMAIN_images + displayData.betting_company.logo}
                            alt="profile"
                            className="h-8 w-8 rounded-full"
                        />
                        <span className="text-black">{displayData.betting_company.title}</span>
                    </div>
                </div>
            </td>

            {/* Odds, Code, Win Rate, Date */}
            <td className="px-4 py-2 text-black">{displayData.ods}</td>


            <td className="px-4 py-2 text-black">
                <div className="flex items-center justify-start gap-2">
                    {displayData.codes}
                    <button
                        className="text-gray-500 cursor-pointer hover:text-gray-700"
                        onClick={() => navigator.clipboard.writeText(displayData.codes)}
                    >
                        <i className="bi bi-copy"></i>
                    </button>
                </div>
            </td>
            <td className="px-4 py-2">
                <div className="flex items-center gap-1">
                    {displayData.user.last_five.map((icon,index)=>(
                     <div key={index} className={`flex items-center justify-center border-2 rounded-md w-8 h-8 border-${getColor(icon)}`}>
                        <span className={`text-sm font-bold text-${getColor(icon)}`}>{icon}</span>
                    </div>
                    ))}
                </div>
            </td>
            <td className="px-4 py-2 text-black text-center">{displayData.match_date}</td>
            {/* Status */}
            <td className="px-4 py-2">
                <div className={`text-center capitalize gap-2 p-1 px-2 rounded-full ${displayData.result === 'running'
                    ? "bg-yellow-500 text-black"
                    : displayData.status === 'lost'
                        ? "bg-red-500 text-white"
                        : "bg-green-500 text-white"
                    }`}>
                    {displayData.result}
                </div>
            </td>
            {/* <td className="px-4 py-2 text-black">{displayData.date}</td> */}


            {/* Approval */}
            <td className="px-4 py-2">
                <div className={`flex items-center capitalize gap-2 p-1 px-2 rounded-full ${displayData.status == 'approved' ? "text-green-500" : "text-[#FFA500]"
                    }`}>
                    {displayData.status == 'approved' ? "Approved" : "Pending"}
                </div>
            </td>

            {/* Dropdown Menu */}
            <td className="px-4 relative">
                <MoreDropdown
                    iconClass="bi bi-three-dots-vertical text-black"
                    menuClass="bg-white min-w-[150px]"
                >
                    <div className="p-2 flex flex-col gap-2">
                        <button
                            onClick={() => onViewTip && onViewTip(displayData)}
                            className="bg-white block text-left p-2 cursor-pointer rounded-lg hover:bg-gray-200 w-full hover:text-black"
                        >
                            View Tip
                        </button>
                        <div className="w-full h-[2px] bg-gray-300"></div>
                        <button className="bg-white block p-2 text-left cursor-pointer rounded-lg hover:bg-gray-200 w-full hover:text-black">
                            Delete
                        </button>
                    </div>
                </MoreDropdown>
            </td>
        </tr>
    );
};

export default TipRow;