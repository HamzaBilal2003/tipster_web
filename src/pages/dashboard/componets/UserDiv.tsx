import React from 'react'
import FilterTab from '../../../components/FilterTab'
import SearchFilter from '../../../components/SearchFilter'
import TableCan from '../../../components/TableCan'
import { users } from '../../../assets/Data'
import DashBoardRow from './DashBoardRow'

const UserDiv = () => {

    const tabs = [
        { name: "all", value: "all" },
        { name: "online", value: "online" },
        { name: "offline", value: "offline" },
    ]

    const handleFilter = (value: string) => {
        console.log(value);
    }
    const headerTr=['name',"email","phone","DOB","Reg Date","status","subscription","other"]

    return (
        <div className='my-8'>
            <h1 className='text-4xl font-bold'>Users</h1>
            <div className='flex flex-col md:flex-row md:items-center justify-between gap-8 my-6'>
                <FilterTab
                    tabs={tabs}
                    handleValue={handleFilter}
                    activeTab={tabs[0].name}
                />
                <SearchFilter
                    handleFunction={handleFilter}
                />
            </div>
            <TableCan
                headerTr={headerTr}
                dataTr={users}
                TrName={DashBoardRow}
            />
        </div>

    )
}

export default UserDiv