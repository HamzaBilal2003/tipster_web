import React from 'react';
import WinRateChart from '../components/WinRateChart';
import StatCard from '../components/StatCard';
import Dropdown from '../../../components/DropDown';
import { SingleUserData } from '../../../../util/queries/userManagement';

type Props = {
  DataList: SingleUserData['data']['statistics']
};

const StatisticsComponent: React.FC<Props> = ({DataList}) => {
  // Dummy data for demonstration - replace with actual data fetching

  console.log("Statictis Data : ", DataList);
  const winRates = DataList.graphicalData;
  const overallWinRate = '75%';
  const totalWins = 245;
  const last5Wins = ['w', 'w', 'w', 'l', 'w']; // 'w' for win, 'l' for loss
  const averageOdds = 22.02;
  const totalPredictions = 320;


  const DateDropOptions = [
    { name: "Today", value: "today" },
    { name: "Yesterday", value: "yesterday" },
    { name: "Last 7 Days", value: "last-7-days" },
    { name: "Last 30 Days", value: "last-30-days" },
    { name: "Last 60 Days", value: "last-60-days" },
  ];
  const handleFilter =(value : any)=>{
    console.log(value);
  }
  return (
    <div className="flex flex-col gap-6">
      {/* <Dropdown
        options={DateDropOptions}
        onChange={handleFilter}
        placeholder="Date"
        position='left-0'
      /> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Win Rate Chart */}
        <div className="">
          <WinRateChart winRates={winRates} overallWinRate={DataList.win_rate} chartId='10' />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2'>
          {/* Total Wins */}
          <StatCard title="Total Wins" subtitle="Last 30 days" value={DataList.total_wins} />

          {/* Last 5 Wins */}
          <StatCard title="Last 5 Wins" subtitle="Last 30 days" icons={DataList.last_five} />

          {/* Average Odds */}
          <StatCard title="Average Odds" subtitle="Last 30 days" value={DataList.average_odds} />

          {/* Total Predictions */}
          <StatCard title="Total Predictions" subtitle="Last 30 days" value={DataList.total_predictions} />
        </div>
      </div>
    </div>
  );
};

export default StatisticsComponent;