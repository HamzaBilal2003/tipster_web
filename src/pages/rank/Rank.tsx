import React, { useState, useEffect } from 'react';
import RankGraph from './component/RankGraph';
import TableFiltersCan from '../../components/TableFiltersCan';
import ItemGap from '../../components/ItemGap';
import Dropdown from '../../components/DropDown';
import SearchFilter from '../../components/SearchFilter';
import TableCan from '../../components/TableCan';
import RankRow from './component/RankRow';
import AccountDetailsModal from './component/AccountDetailsModal';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchranks } from '../../../util/queries/rank';
import Cookies from 'js-cookie';
import Loader from '../../components/Loarder';

type Winner = {
  user_id: number;
  username: string;
  profile_picture: string | null;
  rank: number;
  points: number;
  win_rate: string;
  win_amount: string;
  currency: string;
  bank_account: {
    id: number;
    user_id: number;
    bank_name: string;
    account_number: string;
    account_name: string;
    created_at: string;
    updated_at: string;
  } | null;
  paid_status: boolean;
};

const Rank = () => {
  const [selectedAccount, setSelectedAccount] = useState<Winner | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterData, setFilterData] = useState<Winner[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const token = Cookies.get('authToken');

  const DateDropOptions = [
    { name: 'Today', value: 'today' },
    { name: 'Yesterday', value: 'yesterday' },
    { name: 'Last 7 Days', value: 'last-7-days' },
    { name: 'Last 30 Days', value: 'last-30-days' },
    { name: 'Last 60 Days', value: 'last-60-days' },
  ];

  const StatusOptions = [
    { name: 'Paid', value: 'paid' },
    { name: 'Pending', value: 'pending' },
  ];

  const { data: userRankList, isLoading,refetch } = useQuery({
    queryKey: ['ranklist'],
    queryFn: () => fetchranks(token),
    onSuccess: (data) => {
      setFilterData(data.data); // Initialize filtered data
    },
  });

  // Arrange Top 3 Winners
  const arrangeTopThreeWinners = (winners: Winner[] = []): Winner[] => {
    const top3 = winners.slice(0, 3);
    if (!top3 || top3.length !== 3) return top3 || [];

    return [
      top3.find((w) => w.rank === 2)!,
      top3.find((w) => w.rank === 1)!,
      top3.find((w) => w.rank === 3)!,
    ];
  };

  // **Handle Filter Updates (Date & Payment Status)**
  const handleFilter = (filterValue: string) => {
    if (!userRankList?.data) return;

    if (DateDropOptions.some((option) => option.value === filterValue)) {
      setSelectedDate(filterValue); // Update date filter
    } else if (StatusOptions.some((option) => option.value === filterValue)) {
      setSelectedStatus(filterValue); // Update status filter
    }
  };

  // **Handle Search**
  const handleSearch = (searchValue: string) => {
    setSearchTerm(searchValue);
  };

  // **Apply Filters & Search**
  useEffect(() => {
    if (!userRankList?.data) return;

    let filtered = [...userRankList.data];

    // Apply Date Filter (Dummy Logic: Customize as needed)
    if (selectedDate) {
      console.log('Filtering by Date:', selectedDate);
      // Add your date-based filtering logic here
    }

    // Apply Payment Status Filter
    if (selectedStatus) {
      filtered = filtered.filter(
        (item) =>
          (item.paid_status && selectedStatus === 'paid') ||
          (!item.paid_status && selectedStatus === 'pending')
      );
    }

    // Apply Search Filter
    if (searchTerm.trim()) {
      filtered = filtered.filter((item) =>
        item.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilterData(filtered);
  }, [userRankList?.data, selectedDate, selectedStatus, searchTerm]);

  // Handle Account Click
  const handleAccountClick = (account: Winner) => {
    setSelectedAccount(account);
    setIsModalOpen(true);
    refetch();
  };

  // Close Modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAccount(null);
    refetch()
  };

  // Handle Mark as Paid
  const handleMarkFunction = async (id: string) => {
    if (!filterData) return;

    const updatedData = filterData.map((item) => {
      if (item.user_id.toString() === id) {
        return { ...item, paid_status: true };
      }
      return item;
    });

    setFilterData(updatedData);
    setIsModalOpen(false);

    await queryClient.invalidateQueries({ queryKey: ['ranklist'] });
  };

  const topThreeWinners = arrangeTopThreeWinners(userRankList?.data);

  return (
    <div className="flex flex-col gap-6">
      <RankGraph handleFilter={handleFilter} FirstThree={topThreeWinners} />
      <div className="my-4"></div>

      {/* Filters Section */}
      <TableFiltersCan>
        <ItemGap>
          {/* Date Filter */}
          <Dropdown
            options={DateDropOptions}
            onChange={handleFilter}
            placeholder="Date"
            position="left-0"
          />
          {/* Payment Status Filter */}
          <Dropdown
            options={StatusOptions}
            onChange={handleFilter}
            placeholder="Payment Status"
            position="left-0"
          />
        </ItemGap>
        {/* Search Filter */}
        <SearchFilter handleFunction={handleSearch} />
      </TableFiltersCan>

      {/* Table Section */}
      {isLoading ? (
        <Loader />
      ) : (
        <TableCan
          headerTr={[
            'Rank',
            'Name',
            'Win Rate',
            'Points',
            'Amount Won',
            'Payment Status',
            'Other',
          ]}
          dataTr={filterData}
          headerAlign="left"
          TrName={RankRow}
          trNameProps={{
            onAccountView: handleAccountClick,
          }}
        />
      )}

      {/* Account Details Modal */}
      {selectedAccount && (
        <AccountDetailsModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleMarkFunction}
          account={selectedAccount}
        />
      )}
    </div>
  );
};

export default Rank;
