import React, { useState, useMemo } from 'react';
import FilterTab from '../../../components/FilterTab';
import SearchFilter from '../../../components/SearchFilter';
import TableCan from '../../../components/TableCan';
import DashBoardRow from './DashBoardRow';

interface User {
    id: number;
    username: string;
    email: string;
    profile_picture: string | null;
    is_active: number;
    vip_status: string;
    phone: string;
    created_at: string;
}

const UserDiv = ({ Datalist }: { Datalist: User[] }) => {
    const [activeTab, setActiveTab] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const tabs = [
        { name: "all", value: "all" },
        { name: "online", value: "online" },
        { name: "offline", value: "offline" },
    ];

    const handleFilter = (value: string) => {
        setActiveTab(value);
    };

    const handleSearch = (value: string) => {
        setSearchQuery(value);
    };

    const filteredUsers = useMemo(() => {
        return Datalist.filter(user => {
            // First apply status filter
            if (activeTab !== "all") {
                const isOnline = user.is_active === 1;
                if (activeTab === "online" && !isOnline) return false;
                if (activeTab === "offline" && isOnline) return false;
            }

            // Then apply search filter
            if (searchQuery) {
                const searchLower = searchQuery.toLowerCase();
                return (
                    user.username.toLowerCase().includes(searchLower) ||
                    user.email.toLowerCase().includes(searchLower) ||
                    user.phone.toLowerCase().includes(searchLower)
                );
            }

            return true;
        });
    }, [Datalist, activeTab, searchQuery]);

    const headerTr = ['name', "email", "phone", "VIP Status", "Reg Date", "status", "subscription", "other"];

    return (
        <div className='my-8'>
            <h1 className='text-4xl font-bold'>Users</h1>
            <div className='flex flex-col md:flex-row md:items-center justify-between gap-8 my-6'>
                <FilterTab
                    tabs={tabs}
                    handleValue={handleFilter}
                    activeTab={activeTab}
                />
                <SearchFilter
                    handleFunction={handleSearch}
                />
            </div>
            <TableCan
                headerTr={headerTr}
                dataTr={filteredUsers}
                TrName={DashBoardRow}
            />
        </div>
    );
};

export default UserDiv;