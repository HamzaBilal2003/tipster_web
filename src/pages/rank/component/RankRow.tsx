import React from 'react';

type displayData = {
    select: boolean;
    name: string;
    rank: "1";
    img?: string;
    winRate: string;
    point: string;
    AmountWon: string;
    paymentStatus: string;
    id?: string
}

type UserRowProps = {
    displayData: displayData;
    index?: number;
    onAccountView: (displayData : displayData) => void;
}

const RankRow = ({ displayData, index, onAccountView }: UserRowProps) => {

    return (
        <>
            <tr
                className={`hover:bg-[#ececec] hover:cursor-pointer`}
            >
                {/* Checkbox and User Info */}
                <td className="px-4 py-4">
                    <div className='flex items-center gap-4'>
                        <input
                            type="checkbox"
                            className="appearance-none w-5 h-5 border-2 border-gray-400 rounded-md 
                                checked:bg-green-600 checked:border-green-600 focus:ring-2 focus:ring-green-500 
                                relative flex items-center justify-center 
                                checked:after:content-['✓'] checked:after:text-white checked:after:text-xs checked:after:font-bold 
                                checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"
                            id="checkbox"
                            name="checkbox"
                        />
                        {displayData.rank}
                    </div>
                </td>
                <td className="px-2 py-4">
                    <div className="flex items-center gap-2">
                        <img
                            src={
                                displayData.img
                                    ? displayData.img
                                    : `https://randomuser.me/api/portraits/men/41.jpg`
                            }
                            alt="profile"
                            className="h-8 w-8 rounded-full"
                            loading="lazy"
                        />
                        <span className="text-black">{displayData.name}</span>
                    </div>
                </td>

                <td className='p-4'>{displayData.winRate}</td>
                <td className='p-4'>{displayData.point}</td>
                <td className='p-4'>{displayData.AmountWon}</td>
                <td className={`p-4 text-center ${displayData.paymentStatus == "paid" ? 'text-green-500' : 'text-red-500'} `}>{displayData.paymentStatus}</td>
                <td>
                    <div className='flex items-center justify-center'>
                        <button className='px-6 py-2 text-white bg-green-500 cursor-pointer rounded-lg' onClick={() => onAccountView(displayData)}>
                            Account Detials
                        </button>
                    </div>
                </td>
            </tr>
        </>
    );
};

export default RankRow;