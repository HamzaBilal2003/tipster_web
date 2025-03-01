import React from "react";

interface UserRowProps {
    displayData: {
        select: boolean;
        name: string;
        duration: string;
        amount: string;
        sub_date: string;
        exp_date: string;
        status: string;
        img:string;
    };
    index?: number;
}

const SubRow: React.FC<UserRowProps> = ({ displayData, index }) => {

    return (
        <tr
            className={`hover:bg-[#ececec] hover:cursor-pointer`}
        >
            {/* Checkbox and User Info */}
            <td className="px-4 py-4 w-[200px]">
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

            {/* Duration , Amount , Subscription Date , Expiry Date */}
            <td className="px-2 py-4 text-black">{displayData.duration}</td>
            <td className="px-2 py-4 text-black">{displayData.amount}</td>
            <td className="px-2 py-4 text-black">{displayData.sub_date}</td>
            <td className="px-2 py-4 text-black">{displayData.exp_date}</td>

            {/* Status */}
            <td className="px-4 py-4 w-[100px]">
                <div className={`flex items-center justify-center gap-2 p-2 py-1 rounded-full `}>
                    <div
                        className={`h-3 w-3 rounded-full ${displayData.status ? "bg-green-500" : "bg-[#FF0000]"}`}
                    >
                    </div>
                </div>
            </td>
        </tr>
    );
};

export default SubRow;
