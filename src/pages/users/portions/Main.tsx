import React, { useState } from 'react';
import FilterTab from '../../../components/FilterTab';
import ActivityComponent from './ActivityComponent';
import TipsComponent from './TipsComponent';
import PostsComponent from './PostsComponent';
import StatisticsComponent from './StatisticsComponent';

type Props = {
  userId: string;
};

const Main: React.FC<Props> = ({ userId }) => {
  const [portionSelected, setPortionSelected] = useState<string>('activity');

  const tabs = [
    { name: 'activity', value: 'activity' },
    { name: 'tips', value: 'tips' },
    { name: 'posts', value: 'posts' },
    { name: 'statistics', value: 'statistics' },
  ];

  const handlePortion = (portion: string) => {
    setPortionSelected(portion);
    console.log(portion, userId);
  };

  const renderPortion = () => {
    switch (portionSelected) {
      case 'activity':
        return <ActivityComponent userId={userId} />;
      case 'tips':
        return <TipsComponent userId={userId} />;
      case 'posts':
        return <PostsComponent userId={userId} />;
      case 'statistics':
        return <StatisticsComponent userId={userId} />;
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