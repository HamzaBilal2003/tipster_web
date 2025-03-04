import React, { useState } from 'react';
import FilterTab from '../../../components/FilterTab';
import ActivityComponent from './ActivityComponent';
import TipsComponent from './TipsComponent';
import PostsComponent from './PostsComponent';
import StatisticsComponent from './StatisticsComponent';
import { SingleUserData } from '../../../../util/queries/userManagement';

type Props = {
  userId: string;
  DataList : SingleUserData['data'];
};

const Main: React.FC<Props> = ({ userId,DataList }) => {
  const [portionSelected, setPortionSelected] = useState<string>('activity');

  const tabs = [
    { name: 'activity', value: 'activity' },
    { name: 'tips', value: 'tips' },
    { name: 'posts', value: 'posts' },
    { name: 'statistics', value: 'statistics' },
  ];
  const TableData = {
    activity: DataList?.userActivity,
    tips: DataList?.tips,
    posts: DataList?.posts,
    statistics: DataList?.statistics,
  }

  const handlePortion = (portion: string) => {
    setPortionSelected(portion);
    console.log(portion, userId);
  };
  console.log("main data",TableData)

  const renderPortion = () => {
    switch (portionSelected) {
      case 'activity':
        return <ActivityComponent userId={userId} DataList={TableData.activity} />;
      case 'tips':
        return <TipsComponent userId={userId} DataList={TableData.tips} />;
      case 'posts':
        return <PostsComponent DataList={TableData.posts} />;
      case 'statistics':
        return <StatisticsComponent DataList={TableData.statistics} />;
      default:
        return null;
    }
  };

  return (
    <>
      <FilterTab tabs={tabs} handleValue={handlePortion} activeTab={portionSelected} />
      {renderPortion()}
    </>
  );
};

export default Main;