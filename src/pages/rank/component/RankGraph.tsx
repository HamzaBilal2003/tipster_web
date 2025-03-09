import React from 'react';
import Dropdown from '../../../components/DropDown';
import Graph from './Graph';
import PriceList from './PriceList';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchrankPrices } from '../../../../util/queries/rank';
import Cookies from 'js-cookie';
import BtnLoader from '../../../components/btnLoader';

type FirstThree = {
    id?: string;
    username: string;
    rankCount: number;
    percentage: string;
    position: string;
    profileImage: string;
}

type props = {
    handleFilter: (value: string) => void,
    FirstThree: FirstThree[];
}

const RankGraph = ({ handleFilter, FirstThree }: props) => {
    const token = Cookies.get('authToken');
    const DateDropOptions = [
        { name: "Today", value: "today" },
        { name: "Yesterday", value: "yesterday" },
        { name: "Last 7 Days", value: "last-7-days" },
        { name: "Last 30 Days", value: "last-30-days" },
        { name: "Last 60 Days", value: "last-60-days" },
    ];

    const queryClient = useQueryClient();
    const { data: rankPrices, isLoading, refetch } = useQuery({
        queryKey: ["rankPrices"],
        queryFn: () => fetchrankPrices(token),
    });

    const refreshRankPrices = async () => {
        await queryClient.invalidateQueries({ queryKey: ["rankPrices"] });
        refetch();
    };

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
                    <Graph data={FirstThree} />
                </div>
                <div className='md:col-span-8 shadow-md shadow-gray-400 p-4 rounded-md h-fit'>
                    {isLoading ? <BtnLoader /> : (
                        <PriceList 
                            initialData={rankPrices?.data} 
                            refresh={refreshRankPrices} 
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default RankGraph;