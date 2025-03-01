import React from "react";
import MoreDropdown from "../../../components/MoreDropdown";

interface UserRowProps {
    displayData: {
        activity: string;
        date: string;
    };
    index?: number;
}

const SettingRow: React.FC<UserRowProps> = ({ displayData, index }) => {

    return (
        <tr
            className={`hover:bg-[#ececec] hover:cursor-pointer`}
        >
            {/* Checkbox and User Info */}
            <td className="px-4 py-4">
                <div className="flex items-center gap-2 w-fit">
                    <input
                        type="checkbox"
                        checked={displayData.select}
                        className="appearance-none w-5 h-5 border-2 border-gray-400 rounded-md 
                        checked:bg-green-600 checked:border-green-600 focus:ring-2 focus:ring-green-500 
                        relative flex items-center justify-center 
                        checked:after:content-['✓'] checked:after:text-white checked:after:text-xs checked:after:font-bold 
                        checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"
                    />
                    <div className="flex items-center gap-2">
                        <span className="text-black">{displayData.activity}</span>
                    </div>
                </div>
            </td>

            {/* date  */}
            <td className="px-2 py-4 text-black w-[250px]">{displayData.date}</td>
            <td className="relative w-[100px]">
                <div className="flex justify-center">
                    <MoreDropdown
                        iconClass="bi bi-three-dots-vertical text-black"
                        menuClass="bg-black min-w-[300px]"
                    >
                        <div className="bg-white p-4 flex flex-col gap-3">
                            <div className="grid grid-cols-2 gap-2">
                                <button className="bor text-black bg-gray-400 py-2 rounded-lg hover:bg-white hover:text-black">
                                    Block
                                </button>
                            </div>
                        </div>
                    </MoreDropdown>
                </div>
            </td>
        </tr>
    );
};

export default SettingRow;
