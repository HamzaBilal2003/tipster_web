import React from 'react'
import StatsCard from '../../components/StatsCard'
import images from '../../assets/images'
import TableFiltersCan from '../../components/TableFiltersCan'
import ItemGap from '../../components/ItemGap'
import Dropdown from '../../components/DropDown'
import SearchFilter from '../../components/SearchFilter'
import TableCan from '../../components/TableCan'
import { subscriptions } from '../../assets/Data'
import SubRow from './components/SubRow'

const Subscriptions = () => {
    const statsData = [
        {
            title: 'Total Users',
            value: "2,600",
            change: 5,
            icon: images.sidebarIcons.user,
            color: 'red'
        },
        {
            title: 'Total Subscribers',
            value: "250",
            change: "10",
            icon: images.sidebarIcons.user,
            color: '#1C26D5'
        },
        {
            title: 'Subscription Revenue',
            value: "N 22,600",
            change: "10",
            icon: images.sidebarIcons.user,
            color: '#D51C92'
        },
        {
            title: 'Total Profit',
            value: "N 22,600",
            change: "10",
            icon: images.sidebarIcons.user,
            color: '#1CADD5'
        },
    ]
    const BulkAction = [
        { name: "Export CSV", value: "csv", },
        { name: "Export PDF", value: "pdf", },
        { name: "Ban", value: "ban", danger: true },
    ]
    const ActiveStatus = [
        { name: "Active", value: "active", },
        { name: "Inactive", value: "inactive", },
    ]

    const DateDropOptions = [
        { name: "Today", value: "today" },
        { name: "Yesterday", value: "yesterday" },
        { name: "Last 7 Days", value: "last-7-days" },
        { name: "Last 30 Days", value: "last-30-days" },
        { name: "Last 60 Days", value: "last-60-days" },
    ]

    const handleFilter = (value: any) => {
        console.log(value)
    }
    return (
        <div className='flex flex-col gap-6'>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                {statsData.map((data, index) => (
                    <StatsCard
                        key={index}
                        title={data.title}
                        value={data.value}
                        change={data.change}
                        color={data.color}
                        icon={data.icon}
                        textSizeHeading={14}
                    />
                ))}
            </div>

            <TableFiltersCan>
                <ItemGap>
                    <Dropdown
                        options={DateDropOptions}
                        onChange={handleFilter}
                        placeholder="Date"
                        position='left-0'
                    />
                    <Dropdown
                        options={ActiveStatus}
                        onChange={handleFilter}
                        placeholder="Status"
                        position='left-0'
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
                headerTr={["name","duration","amount","sab date","exp date","status"]}
                headerAlign={'left'}
                dataTr={subscriptions}
                TrName={SubRow}
            />
        </div>
    )
}

export default Subscriptions