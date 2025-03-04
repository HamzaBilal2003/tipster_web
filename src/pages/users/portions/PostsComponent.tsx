import React, { useEffect, useState } from 'react';
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
import { SingleUserData } from '../../../../util/queries/userManagement';

type Props = {
  DataList: SingleUserData['data']['posts'];
};

const PostsComponent = ({ DataList }: Props) => {
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredData, setFilteredData] = useState(DataList);
  const [selectedDateFilter, setSelectedDateFilter] = useState<string>('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('');

  console.log("Tips data: ", DataList);

  const BulkAction = [
    { name: 'Export CSV', value: 'csv' },
    { name: 'Export PDF', value: 'pdf' },
    { name: 'Delete', value: 'delete', danger: true },
  ];

  const Status = [
    { name: 'Approved', value: 'approved' },
    { name: 'Under review', value: 'under_review' },
  ];

  const DateDropOptions = [
    { name: 'Today', value: 'today' },
    { name: 'Yesterday', value: 'yesterday' },
    { name: 'Last 7 Days', value: 'last-7-days' },
    { name: 'Last 30 Days', value: 'last-30-days' },
    { name: 'Last 60 Days', value: 'last-60-days' },
  ];

  const handleFilter = () => {
    let filtered = DataList;

    if (selectedStatusFilter) {
      filtered = filtered.filter((post) => post.status === selectedStatusFilter);
    }
    console.log("status filter : ",filtered)

    if (selectedDateFilter) {
      const today = new Date();
      let startDate = new Date();
      
      switch (selectedDateFilter) {
        case 'today':
          startDate = new Date();
          break;
        case 'yesterday':
          startDate.setDate(today.getDate() - 1);
          break;
        case 'last-7-days':
          startDate.setDate(today.getDate() - 7);
          break;
        case 'last-30-days':
          startDate.setDate(today.getDate() - 30);
          break;
        case 'last-60-days':
          startDate.setDate(today.getDate() - 60);
          break;
        default:
          startDate = new Date();
      }
      
      filtered = filtered.filter((post) => new Date(post.created_at) >= startDate);
    }

    setFilteredData(filtered);
  };

  const handleDateFilter = (value: string) => {
    setSelectedDateFilter(value);
  };

  const handleStatusFilter = (value: string) => {
    setSelectedStatusFilter(value);
  };
  useEffect(() => {
    handleFilter();
  }, [selectedDateFilter,selectedStatusFilter])
  

  const handleViewPost = (postData: any) => {
    setSelectedPost(postData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='flex flex-col gap-6'>
      <TableFiltersCan>
        <ItemGap>
          <Dropdown options={DateDropOptions} onChange={handleDateFilter} placeholder='Date' position='left-0' />
          <Dropdown options={Status} onChange={handleStatusFilter} placeholder='Approval Status' position='left-0' />
          <Dropdown options={BulkAction} onChange={() => {}} placeholder='Bulk Action' position='left-0' />
        </ItemGap>
        <div className='flex items-center gap-4'>
          <SearchFilter handleFunction={() => {}} />
        </div>
      </TableFiltersCan>
      <TableCan
        headerTr={['Post Type', 'Post', 'Date', 'Stat (S,V)', 'Approval', 'Other']}
        dataTr={filteredData}
        headerAlign='left'
        TrName={PostRow}
        trNameProps={{ onViewPost: handleViewPost }}
      />
      <PostModal isOpen={isModalOpen} onClose={closeModal} postData={selectedPost} />
    </div>
  );
};

export default PostsComponent;