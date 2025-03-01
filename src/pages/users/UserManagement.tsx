import React, { useState } from 'react';
import StatsCard from '../../components/StatsCard';
import images from '../../assets/images';
import TableFiltersCan from '../../components/TableFiltersCan';
import ItemGap from '../../components/ItemGap';
import SearchFilter from '../../components/SearchFilter';
import FilterTab from '../../components/FilterTab';
import Dropdown from '../../components/DropDown';
import TableCan from '../../components/TableCan';
import UserRow from './components/UserRow';
import { usersManagmentData } from './components/UserData';
import UserModal from './components/UserModal';
import FilterDropdown from '../../components/FilterDropdown';
import { users } from '../../assets/Data';

const UserManagement = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [appliedFilters, setAppliedFilters] = useState<Record<string, any>>({});

    const statsData = [
        {
            title: 'Total Users',
            value: "2,600",
            change: 5,
            icon: images.sidebarIcons.user,
            color: 'red'
        },
        {
            title: 'Online Users',
            value: "250",
            change: "10",
            icon: images.sidebarIcons.user,
            color: 'red'
        },
        {
            title: 'Subscribed Users',
            value: "260",
            change: "10",
            icon: images.sidebarIcons.user,
            color: 'red'
        },
    ];

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

    const onEditUser = (userData: any) => {
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

    return (
        <div className='flex flex-col gap-6'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                {statsData.map((data, index) => (
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
                    <FilterTab
                        tabs={tabs}
                        handleValue={handleFilter}
                        activeTab={tabs[0].name}
                    />
                    <Dropdown
                        options={BulkAction}
                        onChange={handleFilter}
                        placeholder="Bulk Action"
                        position='left-0'
                    />
                </ItemGap>
                <SearchFilter
                    handleFunction={handleFilter}
                />
            </TableFiltersCan>
            <TableCan
                headerTr={['name','email','phone','last login',"reg date","status","subscription","other"]}
                headerAlign={'left'}
                dataTr={users}
                TrName={UserRow}
                trNameProps={{
                    onEditUser: onEditUser
                }}
            />

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