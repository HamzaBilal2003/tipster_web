import React, { useEffect, useState } from 'react';
import StatsCard from '../../components/StatsCard';
import images from '../../assets/images';
import TableFiltersCan from '../../components/TableFiltersCan';
import ItemGap from '../../components/ItemGap';
import Dropdown from '../../components/DropDown';
import SearchFilter from '../../components/SearchFilter';
import TableCan from '../../components/TableCan';
import PreRow from './components/PreRow';
import { fetchTipsData } from '../../../util/queries/TipQueries';
import Cookies from 'js-cookie';
import { useQuery } from '@tanstack/react-query';
import TipModal from '../users/components/TipModal';
import { Tip } from '../../../util/queries/TipQueries';
import { API_DOMAIN } from '../../../util/apiConfig';
import FilterDropdown from '../../components/FilterDropdown';
import Loarder from '../../components/Loarder';
interface Company {
    id: number;
    title: string;
}
const Predication = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTip, setSelectedTip] = useState<any>(null);
    const [appliedFilters, setAppliedFilters] = useState<Record<string, any>>({});
    const [FilterBodyData, setFilterBodyData] = useState<Tip[] | null>(null);
    const [DateFilter, setDateFilter] = useState<string | null>();
    const [searchUser, setSearchUser] = useState<string>('');
    const [status, setstatus] = useState('')

    const token = Cookies.get('authToken');
    const onViewTip = (tipData: any) => {
        setSelectedTip(tipData);
        setIsModalOpen(true);
    };

    const { data: Tipdata, isLoading } = useQuery({
        queryKey: ['allTipsData'],
        queryFn: () => fetchTipsData(token || ''),
    });
    useEffect(() => {
        if (!isLoading && Tipdata) {
            setFilterBodyData(Tipdata?.data.tips);
        }
    }, [isLoading, Tipdata]);

    console.log("Tips data : ", Tipdata)
    const statsData = Tipdata?.data.stats;
    const TableBodyData = Tipdata?.data.tips;

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

    const handleDate = (value: any) => {
        console.log(value);
        setDateFilter(value);
    };
    const handlestatus = (value: string) => {
        setstatus(value)
    }
    const handleSearch = (value: string) => {
        console.log(value);
        setSearchUser(value);
    };

    const handleApplyFilters = (filters: Record<string, any>) => {
        console.log('Applied filters:', filters);
        setAppliedFilters(filters);
    };
    const handleFilter = (value: string) => {
        console.log("bulk function", value);
    }


    const { data: companies, isCompanyLoading, error } = useQuery<Company[]>({
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

    const HandleAllFilter = () => {
        let filtered = TableBodyData;

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
            filtered = filtered.filter((tip) => parseInt(tip.ods) >= appliedFilters.odds.min && parseInt(tip.ods) <= appliedFilters.odds.max);
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
        if (searchUser && searchUser != '') {
            filtered = filtered.filter((tip) => tip.user.username.toLowerCase().includes(searchUser.toLowerCase()));
        }
        setFilterBodyData(filtered);
    };

    useEffect(() => {
        HandleAllFilter()
    }, [DateFilter, status, appliedFilters, searchUser])

    if (isLoading) return <Loarder/>;
    return (
        <div className='flex flex-col gap-6'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                {!isLoading && statsData?.map((data, index) => (
                    <StatsCard
                        key={index}
                        title={data.title}
                        value={data.value}
                        change={data.change}
                        color={data.color}
                        icon={data.icon}
                    />
                ))}
            </div>
            <h1 className='text-4xl font-medium'>Tips Summary</h1>
            <TableFiltersCan>
                <ItemGap>
                    <Dropdown
                        options={DateDropOptions}
                        onChange={handleDate}
                        placeholder="Date"
                        position='left-0'
                    />
                    <Dropdown
                        options={Status}
                        onChange={handlestatus}
                        placeholder="Approval Status"
                        position='left-0'
                    />
                    <Dropdown
                        options={BulkAction}
                        onChange={handleFilter}
                        placeholder="Bulk Action"
                        position='left-0'
                    />
                </ItemGap>
                <div className='flex items-center gap-4'>
                    <FilterDropdown
                        options={filterOptions}
                        onApply={handleApplyFilters}
                    />
                    <SearchFilter
                        handleFunction={(e: string) => handleSearch(e)}
                    />
                </div>
            </TableFiltersCan>
            {/*  win rate removed */}
            {!isLoading && FilterBodyData && <TableCan
                headerTr={["user", "company", "odds", "code", "Date", "status", "approval", "other"]}
                dataTr={FilterBodyData}
                headerAlign='left'
                TrName={PreRow}
                trNameProps={{
                    onViewTip: onViewTip
                }}
            />}

            {!isLoading && selectedTip && <TipModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                tipData={selectedTip}
                dataFetchName={'allTipsData'}
            />}
        </div>
    );
};

export default Predication;