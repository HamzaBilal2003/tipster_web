import React from 'react'
import ProfileCard from '../../components/ProfileCard'
import TableFiltersCan from '../../components/TableFiltersCan'
import Dropdown from '../../components/DropDown'
import SearchFilter from '../../components/SearchFilter'
import TableCan from '../../components/TableCan'
import SettingRow from './components/SettingRow'

const Settings = () => {
    const DateDropOptions = [
        { name: "Today", value: "today" },
        { name: "Yesterday", value: "yesterday" },
        { name: "Last 7 Days", value: "last-7-days" },
        { name: "Last 30 Days", value: "last-30-days" },
        { name: "Last 60 Days", value: "last-60-days" },
    ]
    const activity = [
        { activity: "User 1 logged in", date: "26-2-2025 / 12:30 PM", },
        { activity: "User 2 logged out", date: "26-2-2025 / 11:45 PM",},
        { activity: "User 3 logged in", date: "26-2-2025 / 10:15 AM", },
        { activity: "User 4 logged out", date: "26-2-2025 / 09:30 AM",},
        { activity: "User 5 logged in", date: "26-2-2025 / 08:00 PM", },
        { activity: "User 6 logged out", date: "26-2-2025 / 07:15 PM",},
        { activity: "User 7 logged in", date: "26-2-2025 / 06:45 AM", },
    ]
    const handleFilter = (value: any) => {
        console.log("hello world : ", value)
    }
    return (
        <div className='flex flex-col gap-8'>
            <h1 className='text-3xl font-bold'>Admin Details</h1>
            <ProfileCard />
            <TableFiltersCan>
                <Dropdown
                    options={DateDropOptions}
                    onChange={handleFilter}
                    placeholder="Date"
                    position='left-0'
                />
                <SearchFilter
                    handleFunction={handleFilter}
                />
            </TableFiltersCan>

            <TableCan
                headerTr={['Account Activities','date','Other']}
                dataTr={activity}
                headerAlign='left'
                TrName={SettingRow}
            />
        </div>
    )
}

export default Settings