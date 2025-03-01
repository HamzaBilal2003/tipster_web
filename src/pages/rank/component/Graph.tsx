import React from 'react';

type FirstThree = {
    id?: string;
    username: string;
    profileImage: string;
    rankCount: number;
    percentage: string;
    position: string;
};

const positionStyles: Record<string, { height: string;bgColor:string; color: string;order:string }> = {
    "1st": { height: "h-[300px]", bgColor:"bg-[#F6F6F6]" , color: "text-[#F4B400] border-[#F9A604]",order:"order-2" }, // Gold 🥇
    "2nd": { height: "h-[250px]",  bgColor:"bg-[#EBEBEB]" ,color: "text-[#E67E22] border-[#A0A0A0]",order:" order-1" }, // Silver 🥈
    "3rd": { height: "h-[200px]", bgColor:"bg-[#EBEBEB]" , color: "text-[#A0A0A0] border-[#E67E22]",order:"order-3" }  // Bronze 🥉
};

const Graph = ({ data }: { data: FirstThree[] }) => {
    return (
        <div className="flex flex-col gap-6 p-2 pb-0">
            <h1 className="text-xl font-medium mb-[50px]">Top 3</h1>
            <div className="grid grid-cols-3 items-end">
                {data.map((rank) => (
                    <div key={rank.id} className={`w-full ${positionStyles[rank.position]?.order}`}>
                        <div
                            className={`${positionStyles[rank.position]?.bgColor} relative rounded-t-4xl ${positionStyles[rank.position]?.height} pt-12 flex flex-col justify-between gap-4 shadow-md`}
                        >
                            <img
                                src={rank.profileImage}
                                alt={`${rank.username}'s profile`}
                                className={`w-20 h-20 rounded-full absolute top-[-50px] left-1/2 transform -translate-x-1/2 border-4 ${positionStyles[rank.position]?.color}`}
                            />
                            <div className="flex flex-col items-center">
                                <h2 className="font-medium">
                                    {rank.username.length > 8 ? rank.username.slice(0, 8) + "..." : rank.username}
                                </h2>
                                <p className="text-lg font-bold text-[#A52A2A]">{rank.rankCount.toLocaleString()}</p>
                                <p className="text-sm font-medium">{rank.percentage}</p>
                            </div>
                            <h1 className={`text-center p-2 text-xl font-bold ${positionStyles[rank.position]?.color}`}>
                                {rank.position}
                            </h1>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Graph;
