import React, { useState, useEffect } from 'react';
import StatsCard from '../../components/StatsCard';
import TableFiltersCan from '../../components/TableFiltersCan';
import ItemGap from '../../components/ItemGap';
import SearchFilter from '../../components/SearchFilter';
import FilterTab from '../../components/FilterTab';
import Dropdown from '../../components/DropDown';
import TableCan from '../../components/TableCan';
import UserRow from './components/UserRow';
import UserModal from './components/UserModal';
import { users } from '../../assets/Data';
import Cookies from 'js-cookie';
import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../../../util/queries/userManagement'
interface selectedUser {
    id: number;
    username: string;
    email: string;
    profile_picture: string | null;
    is_active: number;
    vip_status: string;
    created_at: string;
    phone: string;
};
const UserManagement = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<selectedUser | null>(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [appliedFilters, setAppliedFilters] = useState<any[]>({});
    const [searchTerm, setSearchTerm] = useState('');

    const token = Cookies.get('authToken')?.toString();
    console.log(token)
    // usequesy funcion
    const { data: UsersManagemaentData, onsuccess, error, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: () => fetchUsers(token),
    })
    const bodyTable = UsersManagemaentData?.data.users
    const statsData = UsersManagemaentData?.data.stats

    const tabs = [
        { name: "all", value: "all" },
        { name: "online", value: "online" },
        { name: "offline", value: "offline" },
    ];

    const BulkAction = [
        { name: "Export CSV", value: "csv", },
        { name: "Export PDF", value: "pdf", },
        { name: "Ban", value: "ban", danger: true },
    ];

    const handleFilter = (value: string) => {
        console.log(value);
    };

    const onEditUser = (userData: selectedUser) => {
        console.log("edited profile", userData)
        setSelectedUser(userData);
        setIsEditMode(true);
        setIsModalOpen(true);
    };

    const handleAddUser = () => {
        setSelectedUser(null);
        setIsEditMode(false);
        setIsModalOpen(true);
    };

    const handleSaveUser = (userData: any) => {
        console.log('Saving user data:', userData);
    };
    const handleSearch = (searchTerm: string) => {
        console.log(searchTerm)
        setSearchTerm(searchTerm)
        const serachUser = bodyTable?.filter((item)=>{
            return item.username.toLowerCase().includes(searchTerm.toLowerCase())
        })
        setAppliedFilters(serachUser)
    }

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
            <div className="flex justify-between items-center">
                <h1 className='text-4xl font-medium'>Users Summary</h1>
                <button
                    onClick={handleAddUser}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                    Add User
                </button>
            </div>
            <TableFiltersCan>
                <ItemGap>
                    {/* <FilterTab
                        tabs={tabs}
                        handleValue={handleFilter}
                        activeTab={tabs[0].name}
                    /> */}
                    <Dropdown
                        options={BulkAction}
                        onChange={handleFilter}
                        placeholder="Bulk Action"
                        position='left-0'
                    />
                </ItemGap>
                <SearchFilter
                    handleFunction={handleSearch}
                />
            </TableFiltersCan>
            {!isLoading && bodyTable && <TableCan
                // bodyTable "status",
                headerTr={['name', 'email', 'phone', "reg date", "subscription", "other"]}
                headerAlign={'left'}
                dataTr={searchTerm && searchTerm.length > 0 ?  appliedFilters :  bodyTable}
                TrName={UserRow}
                trNameProps={{
                    onEditUser: onEditUser
                }}
            />}

            <UserModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveUser}
                userData={selectedUser}
                isEdit={isEditMode}
            />
        </div>
    );
};

export default UserManagement;