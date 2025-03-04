import React, { useEffect, useState } from 'react'
import TableFiltersCan from '../../../components/TableFiltersCan'
import ItemGap from '../../../components/ItemGap'
import Dropdown from '../../../components/DropDown'
import FilterDropdown from '../../../components/FilterDropdown'
import SearchFilter from '../../../components/SearchFilter'
import TableCan from '../../../components/TableCan'
import images from '../../../assets/images'
import PreRow from '../../predication/components/PreRow'
import TipModal from '../components/TipModal'
import TipRow from '../components/TipRow'
import { SingleUserData } from '../../../../util/queries/userManagement'
import { useQueries, useQuery } from '@tanstack/react-query'
import { API_DOMAIN } from '../../../../util/apiConfig'
import Cookies from 'js-cookie'
type props = {
  userId: string;
  DataList: {
    id: number;
    user_id: number;
    betting_company_id: number;
    codes: string;
    ods: string;
    status: string;
    result: string;
    match_date: string;
    betting_category: string;
    created_at: string;
    updated_at: string;
    betting_company: {
      id: number;
      title: string;
      logo: string;
      status: string;
      created_at: string;
      updated_at: string;
    };
    user: {
      id: number;
      username: string;
      profile_picture: string;
      win_rate: string;
      last_five: Array<string>;
    };
  }[];
}

const TipsComponent = ({ userId, DataList }: props) => {
  const [appliedFilters, setAppliedFilters] = useState<Record<string, any>>({});
  const [selectedTip, setSelectedTip] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status,setStatus] =useState<'approved' | 'pending' | string >();
  const [DateFilter,setDateFilter] = useState<any>();
  const [searchUser,setSearchUser] = useState<string>('');
  console.log("tips data", DataList)
  const [FilteredData, setFilteredData] = useState<props['DataList']>(DataList)
  const BulkAction = [
    { name: "Export CSV", value: "csv", },
    { name: "Export PDF", value: "pdf", },
    { name: "Ban", value: "ban", danger: true },
  ];
  const Status = [
    { name: "approved", value: "approved", },
    { name: "pending", value: "pending", },
  ];

  const DateDropOptions = [
    { name: "Today", value: "today" },
    { name: "Yesterday", value: "yesterday" },
    { name: "Last 7 Days", value: "last-7-days" },
    { name: "Last 30 Days", value: "last-30-days" },
    { name: "Last 60 Days", value: "last-60-days" },
  ];

  const bodyData = [
    {
      "img": "https://randomuser.me/api/portraits/men/10.jpg",
      "name": "John Doe",
      "Walletimg": images.swapy,
      "WalletName": "Bitcoin Wallet",
      "odds": "2.5",
      "code": "XJH237",
      "winRate": "85",
      "date": "2025-02-28",
      "status": "Approved",
      "approval": true,
      "id": "001",
      "category": "Football",
      "bettingCompany": "Sportybet"
    },
    {
      "img": "https://randomuser.me/api/portraits/women/15.jpg",
      "name": "Sarah Smith",
      "Walletimg": images.swapy,
      "WalletName": "Ethereum Wallet",
      "odds": "1.8",
      "code": "ABT987",
      "winRate": "78",
      "date": "2025-02-27",
      "status": "Pending",
      "approval": false,
      "id": "002",
      "category": "Basketball",
      "bettingCompany": "1xbet"
    },
    {
      "img": "https://randomuser.me/api/portraits/men/20.jpg",
      "name": "Michael Brown",
      "Walletimg": images.swapy,
      "WalletName": "Tron Wallet",
      "odds": "3.0",
      "code": "TRX543",
      "winRate": "90",
      "date": "2025-02-26",
      "status": "Approved",
      "approval": true,
      "id": "003",
      "category": "Tennis",
      "bettingCompany": "Betway"
    },
    {
      "img": "https://randomuser.me/api/portraits/women/25.jpg",
      "name": "Jessica Lee",
      "Walletimg": images.swapy,
      "WalletName": "Litecoin Wallet",
      "odds": "2.2",
      "code": "LTC321",
      "winRate": "82",
      "date": "2025-02-25",
      "status": "Rejected",
      "approval": false,
      "id": "004",
      "category": "Soccer",
      "bettingCompany": "Bet9ja"
    },
    {
      "img": "https://randomuser.me/api/portraits/men/30.jpg",
      "name": "David Wilson",
      "Walletimg": images.swapy,
      "WalletName": "Ripple Wallet",
      "odds": "2.7",
      "code": "XRP654",
      "winRate": "88",
      "date": "2025-02-24",
      "status": "Approved",
      "approval": true,
      "id": "005",
      "category": "Hockey",
      "bettingCompany": "Sportybet"
    }
  ];

  const handleStatusFilter = (value: any) => {
    setStatus(value)
  };
  const handleDateFilter = (value: any) => {
    setDateFilter(value)
  };

  const handleViewTip = (tipData: any) => {
    setSelectedTip(tipData);
    setIsModalOpen(true);
    console.log("Viewing tip:", tipData);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const token = Cookies.get("authToken");

  interface Company {
    id: number;
    title: string;
  }

  const { data: companies, isLoading, error } = useQuery<Company[]>({
    queryKey: ["companies"],
    queryFn: async () => {
      try {
        const response = await fetch(`${API_DOMAIN}betting-company/get-all`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch companies");
        }

        const result = await response.json();
        return result.data.map((company: Company) => ({
          value: company.id,
          label: company.title,
        }));
      } catch (error) {
        console.error("Error fetching companies:", error);
        throw error;
      }
    },
  });
  const filterOptions = [
    {
      id: "odds",
      label: "Odds",
      type: "range",
      min: 0,
      max: 1000,
    },
    {
      id: "bettingCompany",
      label: "Betting Company",
      type: "checkbox",
      options: companies, // ✅ Now correctly waits for data
    },
    {
      id: "winRate",
      label: "Win Rate",
      type: "range",
      min: 0,
      max: 100,
    },
    {
      id: "category",
      label: "Category",
      type: "checkbox",
      options: [
        { id: "football", label: "Football" },
        { id: "basketball", label: "Basketball" },
        { id: "tennis", label: "Tennis" },
        { id: "hockey", label: "Hockey" },
      ],
    },
  ];
  const handleApplyFilters = (filters: Record<string, any>) => {
    console.log('Applied filters:', filters);
    setAppliedFilters(filters);
  };
  const HandleAllFilter = () => {
    let filtered = DataList;

    if (status) {
      filtered = filtered.filter((tip) => tip.status === status);
    }

    if (appliedFilters.bettingCompany && appliedFilters.bettingCompany.length > 0) {
      filtered = filtered.filter((tip) => appliedFilters.bettingCompany.includes(tip.betting_company_id.toString()));
    }

    if (appliedFilters.winRate) {
      filtered = filtered.filter((tip) => tip.user.win_rate >= appliedFilters.winRate[0] && tip.user.win_rate <= appliedFilters.winRate[1]);
    }
    if (appliedFilters.odds) {
      filtered = filtered.filter((tip) => parseInt(tip.ods) >= appliedFilters.odds.min && parseInt(tip.ods) <= appliedFilters.odds.max );
    }

    if (searchUser && searchUser.length > 0) {
      filtered = filtered.filter((tip) => tip.user.username.toLowerCase().includes(searchUser.toLowerCase()));
    }

    if (DateFilter) {
      const today = new Date();
      let startDate = new Date();

      switch (DateFilter) {
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

      filtered = filtered.filter((tip) => new Date(tip.match_date) >= startDate);
    }

    setFilteredData(filtered);
  };

  useEffect(() => {
    HandleAllFilter()
  }, [DateFilter,status,appliedFilters,searchUser])
  console.log(FilteredData)

  return (
    <div className='flex flex-col gap-6'>
      <TableFiltersCan>
        <ItemGap>
          <Dropdown
            options={DateDropOptions}
            onChange={handleDateFilter}
            placeholder="Date"
            position='left-0'
          />
          <Dropdown
            options={Status}
            onChange={handleStatusFilter}
            placeholder="Approval Status"
            position='left-0'
          />
          <Dropdown
            options={BulkAction}
            onChange={()=>console.log("bulk action selected")}
            placeholder="Bulk Action"
            position='left-0'
          />
        </ItemGap>
        <div className='flex items-center gap-4'>
          {!isLoading && filterOptions && <FilterDropdown
            options={filterOptions}
            onApply={handleApplyFilters}
          />}
          {/* <SearchFilter
            handleFunction={(search :string) => setSearchUser(search)}
          /> */}
        </div>
      </TableFiltersCan>
      <TableCan
        headerTr={["company", "odds", "code", "last wins", "Date", "status", "approval", "other"]}
        dataTr={FilteredData}
        headerAlign='left'
        TrName={TipRow}
        trNameProps={{
          onViewTip: handleViewTip
        }}

      />
      {!isLoading && selectedTip && <TipModal
        isOpen={isModalOpen}
        onClose={closeModal}
        tipData={selectedTip}
      />}
    </div>
  )
}

export default TipsComponent