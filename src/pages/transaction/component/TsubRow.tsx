import React from "react";
import FirstTwoRow from "./FirstTwoRow";

interface UserRowProps {
    displayData: {
        select: boolean;
        name: string;
        duration: string;
        amount: string;
        sub_date: string;
        exp_date: string;
        status: string;
        img: string;
        reference: string;
        email: string;
        rank:string;
        mode:string;
    };
    index?: number;
}

const TsubRow: React.FC<UserRowProps> = ({ displayData, index }) => {

    return (
        <tr
            className={`hover:bg-[#ececec] hover:cursor-pointer`}
        >
            {/* Checkbox and User Info */}
            <FirstTwoRow name={displayData.name} img={displayData.img} rank={displayData.rank} />

            {/* Duration , Amount , Subscription Date , Expiry Date */}
            <td className="px-2 py-4 text-black">{displayData.email}</td>
            <td className="px-2 py-4 text-black">{displayData.amount}</td>

            {/* mode if leaderBoard payment */}
            {displayData.mode && <td className="px-2 py-4 text-black">{displayData.mode}</td>}


            <td className="px-2 py-4 text-black">{displayData.sub_date}</td>

            {/* if reference exits */}
            {displayData.reference && !displayData.mode && <td className="px-2 py-4 text-black">{displayData.reference}</td>}


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

export default TsubRow;
