import React from 'react';

type props = {
    rank?: string;
    name: string;
    img:string;
}

const FirstTwoRow = ({rank,name,img}:props) => {

    return (
        <>
            {rank && (
                <>
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
                            {rank}
                        </div>
                    </td>
                    <td className="px-2 py-4">
                        <div className="flex items-center gap-2">
                            <img
                                src={
                                    img
                                        ? img
                                        : `https://randomuser.me/api/portraits/men/41.jpg`
                                }
                                alt="profile"
                                className="h-8 w-8 rounded-full"
                                loading="lazy"
                            />
                            <span className="text-black">{name}</span>
                        </div>
                    </td>
                </>
            )}

            {!rank && (
                <>
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
                            <div className="flex items-center gap-2">
                                <img
                                    src={
                                        img
                                            ? img
                                            : `https://randomuser.me/api/portraits/men/41.jpg`
                                    }
                                    alt="profile"
                                    className="h-8 w-8 rounded-full"
                                    loading="lazy"
                                />
                                <span className="text-black">{name}</span>
                            </div>
                        </div>
                    </td>
                </>
            )}
        </>
    );
};

export default FirstTwoRow;