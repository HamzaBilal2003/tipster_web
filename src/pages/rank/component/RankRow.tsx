import React from 'react';
import { API_DOMAIN_images } from '../../../../util/apiConfig';

type displayData = {
    user_id: number,
    username: string,
    profile_picture: string,
    rank: number,
    points: number,
    win_rate: string,
    win_amount: string,
    currency: string,
    bank_account: {
        id: number,
        user_i: number,
        bank_name: string,
        account_number: string,
        account_name: string,
        created_at: string,
        updated_at: string
    },
    paid_status: boolean
}

type UserRowProps = {
    displayData: displayData;
    index?: number;
    onAccountView: (displayData: displayData) => void;
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
                            src={API_DOMAIN_images + displayData.profile_picture}
                            alt="profile"
                            className="h-8 w-8 rounded-full"
                            loading="lazy"
                        />
                        <span className="text-black">{displayData.username}</span>
                    </div>
                </td>

                <td className='p-4'>{displayData.win_rate}</td>
                <td className='p-4'>{displayData.points}</td>
                <td className='p-4'>{displayData.win_amount}</td>
                <td className={`p-4 ${displayData.paid_status ? 'text-green-500' : 'text-red-500'} `}>{displayData.paid_status ? 'paid' : 'pending'}</td>
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