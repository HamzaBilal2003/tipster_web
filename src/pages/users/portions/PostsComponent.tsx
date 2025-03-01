import React, { useState } from 'react';
import TableFiltersCan from '../../../components/TableFiltersCan';
import ItemGap from '../../../components/ItemGap';
import Dropdown from '../../../components/DropDown';
import FilterDropdown from '../../../components/FilterDropdown';
import SearchFilter from '../../../components/SearchFilter';
import { filterOptions } from '../../../components/FilterJson';
import TableCan from '../../../components/TableCan';
import PreRow from '../../predication/components/PreRow';
import PostModal from '../components/PostModal';
import PostRow from '../components/PostRow';

const PostsComponent = () => {
  const [appliedFilters, setAppliedFilters] = useState<Record<string, any>>({});
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const BulkAction = [
    { name: 'Export CSV', value: 'csv' },
    { name: 'Export PDF', value: 'pdf' },
    { name: 'Delete', value: 'delete', danger: true },
  ];

  const Status = [
    { name: 'Approved', value: 'approved' },
    { name: 'Pending', value: 'pending' },
  ];

  const DateDropOptions = [
    { name: 'Today', value: 'today' },
    { name: 'Yesterday', value: 'yesterday' },
    { name: 'Last 7 Days', value: 'last-7-days' },
    { name: 'Last 30 Days', value: 'last-30-days' },
    { name: 'Last 60 Days', value: 'last-60-days' },
  ];

  const bodyData = [
    {
      img: '/mnt/data/image.png',
      name: 'Alucard',
      postType: 'Post',
      postContent: 'I am the best punter in the game.....',
      date: '01-01-25 / 11:22 AM',
      approval: 'Pending',
      likes: 200,
      comments: 230,
      shares: 200,
      views: '2.5k',
      id: '001',
    },
    {
      img: '/mnt/data/image.png',
      name: 'Sarah Smith',
      postType: 'Comment',
      postContent: 'This is amazing! I totally agree...',
      date: '01-01-25 / 10:30 AM',
      approval: 'Pending',
      likes: 150,
      comments: 100,
      shares: 90,
      views: '1.8k',
      id: '002',
    },
  ];

  const handleFilter = (value: any) => {
    console.log(value);
  };

  const handleViewPost = (postData: any) => {
    setSelectedPost(postData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleApplyFilters = (filters: Record<string, any>) => {
    console.log('Applied filters:', filters);
    setAppliedFilters(filters);
  };

  return (
    <div className='flex flex-col gap-6'>
      <TableFiltersCan>
        <ItemGap>
          <Dropdown options={DateDropOptions} onChange={handleFilter} placeholder='Date' position='left-0' />
          <Dropdown options={Status} onChange={handleFilter} placeholder='Approval Status' position='left-0' />
          <Dropdown options={BulkAction} onChange={handleFilter} placeholder='Bulk Action' position='left-0' />
        </ItemGap>
        <div className='flex items-center gap-4'>
          <FilterDropdown options={filterOptions} onApply={handleApplyFilters} />
          <SearchFilter handleFunction={handleFilter} />
        </div>
      </TableFiltersCan>
      <TableCan
        headerTr={['Post Type', 'Post', 'Date', "stat (C,L,S)",'Approval', 'Other']}
        dataTr={bodyData}
        headerAlign='left'
        TrName={PostRow}
        trNameProps={{ onViewPost: handleViewPost }}
      />
      <PostModal isOpen={isModalOpen} onClose={closeModal} postData={selectedPost} />
    </div>
  );
};

export default PostsComponent;
