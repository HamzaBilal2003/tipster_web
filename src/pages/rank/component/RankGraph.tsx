import React from 'react'
import Dropdown from '../../../components/DropDown'
import Graph from './Graph'
import PriceList from './PriceList';
import images from '../../../assets/images';

type FirstThree ={
    id?:string;
    username:string;
    rankCount: number;
    percentage:string;
    position:string;
    profileImage:string;
}

type props ={
    handleFilter: (value: string) => void,
    FirstThree: FirstThree[];
}


const RankGraph = ({handleFilter,FirstThree}:props) => {
    const DateDropOptions = [
        { name: "Today", value: "today" },
        { name: "Yesterday", value: "yesterday" },
        { name: "Last 7 Days", value: "last-7-days" },
        { name: "Last 30 Days", value: "last-30-days" },
        { name: "Last 60 Days", value: "last-60-days" },
    ]
    const initialPrices = [
        { position: "1", amount: "2,000", icon: images.first_1 },
        { position: "2", amount: "2,000", icon: images.second_2 },
        { position: "3", amount: "2,000", icon: images.third_3 },
        { position: "4", amount: "2,000" },
        { position: "5", amount: "2,000" },
        { position: "6", amount: "2,000" },
        { position: "7", amount: "2,000" },
        { position: "8", amount: "2,000" },
        { position: "9", amount: "2,000" },
        { position: "10", amount: "2,000" },
      ];
      
    return (
        <div className='space-y-6'>
            <Dropdown
                options={DateDropOptions}
                onChange={handleFilter}
                placeholder="Date"
                position='left-0'
            />
            <div className='grid grid-cols-1 md:grid-cols-12 gap-4'>
                <div className='md:col-span-4 shadow-md shadow-gray-400 p-4 pb-0 rounded-md'>
                    <Graph data={FirstThree}/>
                </div>
                <div className='md:col-span-8 shadow-md shadow-gray-400 p-4 rounded-md h-fit'>
                    <PriceList data={initialPrices} />
                </div>
            </div>
        </div>
    )
}

export default RankGraph