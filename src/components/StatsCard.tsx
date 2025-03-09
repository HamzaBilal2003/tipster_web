import React from 'react';

type StatsCardProps = {
    title?: string;
    value?: string | number;
    change?: string | number;
    icon?: string;
    color: string; // Accepts hex, tailwind color, or RGB values
    textSizeHeading?:number;
    textSizeValue?:number;
    textSizeChange?: number;
};

const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, icon, color,textSizeHeading,textSizeValue }) => {
    return (
        <div
            className="bg-white shadow-sm shadow-gray-400 rounded-lg p-4 border-l-[6px]"
            style={{ borderLeftColor: color }}
        >
            <div className='flex items-center justify-between'>
                <div className='flex flex-col gap-4'>
                    <h2 className="text-xl font-semibold" style={textSizeHeading ? { fontSize: `${textSizeHeading}px` } : undefined}>{title}</h2>
                    <p className="text-4xl font-bold text-gray-900 "  style={textSizeHeading ? { fontSize: `${textSizeValue}px` ,color:color } : {color:color}}>{value}</p>
                    {change && <span style={{ color: parseInt(change.toString()) > 0 ? 'green' : 'red' }}>{change} <span className='text-black'> from last week</span></span>}
                </div>
                {icon &&
                    <div
                        className='w-16 h-16 rounded-full flex items-center justify-center'
                        style={{ backgroundColor: color }}
                    >
                        <img src={icon} alt={title} className='w-8' />
                    </div>}
            </div>
        </div>
    );
};

export default StatsCard;
