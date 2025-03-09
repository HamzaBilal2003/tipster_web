import React, { useState, useMemo } from 'react'
import ProfileCard from '../../components/ProfileCard'
import TableFiltersCan from '../../components/TableFiltersCan'
import Dropdown from '../../components/DropDown'
import SearchFilter from '../../components/SearchFilter'
import TableCan from '../../components/TableCan'
import SettingRow from './components/SettingRow'
import { fetchSingleUsers } from '../../../util/queries/userManagement'
import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import UserModal from '../users/components/UserModal'

const Settings = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentDateFilter, setCurrentDateFilter] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const userdata = JSON.parse(Cookies.get('user'));
    const token = Cookies.get('authToken')

    const DateDropOptions = [
        { name: "Today", value: "today" },
        { name: "Yesterday", value: "yesterday" },
        { name: "Last 7 Days", value: "last-7-days" },
        { name: "Last 30 Days", value: "last-30-days" },
        { name: "Last 60 Days", value: "last-60-days" },
    ]

    const { data: ResponseData, error, isLoading } = useQuery({
        queryKey: ['usersProfile'],
        queryFn: () => fetchSingleUsers(token, userdata.id),
        refetchInterval: 1000 * 60 * 5,
    })

    const userData = ResponseData?.data.user;
    const TableData = ResponseData?.data.userActivity;

    const filteredData = useMemo(() => {
        if (!TableData) return [];
        
        let filtered = [...TableData];
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        // Apply date filter
        if (currentDateFilter) {
            filtered = filtered.filter(item => {
                const itemDate = new Date(item.created_at);
                
                switch (currentDateFilter) {
                    case 'today':
                        return itemDate >= today;
                    case 'yesterday': {
                        const yesterday = new Date(today);
                        yesterday.setDate(yesterday.getDate() - 1);
                        return itemDate >= yesterday && itemDate < today;
                    }
                    case 'last-7-days': {
                        const sevenDaysAgo = new Date(today);
                        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
                        return itemDate >= sevenDaysAgo;
                    }
                    case 'last-30-days': {
                        const thirtyDaysAgo = new Date(today);
                        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                        return itemDate >= thirtyDaysAgo;
                    }
                    case 'last-60-days': {
                        const sixtyDaysAgo = new Date(today);
                        sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);
                        return itemDate >= sixtyDaysAgo;
                    }
                    default:
                        return true;
                }
            });
        }

        // Apply search filter
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            filtered = filtered.filter(item =>
                item.activity.toLowerCase().includes(searchLower)
            );
        }

        return filtered;
    }, [TableData, currentDateFilter, searchTerm]);

    const handleFilter = (value: string) => {
        if (DateDropOptions.some(option => option.value === value)) {
            setCurrentDateFilter(value);
        }
    };

    const handleSearch = (term: string) => {
        setSearchTerm(term);
    };

    const handleSaveUser = (userData: any) => {
        console.log('Saving user data:', userData);
    };

    const onEditUser = (userData: any) => {
        setSelectedUser(userData);
        setIsEditMode(true);
        setIsModalOpen(true);
    };

    return (
        <div className='flex flex-col gap-8'>
            <h1 className='text-3xl font-bold'>Admin Details</h1>
            <ProfileCard
                name={userData?.username}
                role="user"
                id={userData?.id}
                profileImage={userData?.profile_picture}
                subscriber={userData?.id}
                follower={120}
                isSubcriberActive={userData?.vip_status == "active" ? true : false}
                Nationality={userData?.nationality}
                email={userData?.email}
                password={userData?.username}
                phone={userData?.phone}
                dob={userData?.dob}
                registerDate={userData?.created_at}
                onEdit={onEditUser}
            />
            <TableFiltersCan>
                <Dropdown
                    options={DateDropOptions}
                    onChange={handleFilter}
                    placeholder="Date"
                    position='left-0'
                />
                <SearchFilter
                    handleFunction={handleSearch}
                    Placeholder="Search activities..."
                />
            </TableFiltersCan>

            <TableCan
                headerTr={['Account Activities', 'date']}
                dataTr={filteredData}
                headerAlign='left'
                TrName={SettingRow}
            />
            {selectedUser && <UserModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveUser}
                userData={selectedUser}
                isEdit={isEditMode}
                dataFetchName={'usersProfile'}
            />}
        </div>
    )
}

export default Settings