import React, { useState } from 'react'
import StatsCard from '../../components/StatsCard'
import images from '../../assets/images'
import TableFiltersCan from '../../components/TableFiltersCan'
import ItemGap from '../../components/ItemGap'
import FilterTab from '../../components/FilterTab'
import Dropdown from '../../components/DropDown'
import SearchFilter from '../../components/SearchFilter'
import TableCan from '../../components/TableCan'
import { subscriptions } from '../../assets/Data'
import TsubRow from './component/TsubRow'

const Transaction = () => {
    const subscriptionTr = ['name','email','amount',"payment date","reference","status"];
    const transactionTr = ['rank','name','email','amount',"mode","payment date","status"];
    const [Headertr, setHeadertr] = useState<any[]>(subscriptionTr);
    const [BodyData, setBodyData] = useState<any[]>(subscriptions)

    const statsData = [
        {
            title: 'Total Users',
            value: "2,600",
            change: 5,
            icon: images.sidebarIcons.user,
            color: '#D51C1C'
        },
        {
            title: 'Total Transactions',
            value: "250",
            change: "10",
            icon: images.sidebarIcons.transactions,
            color: '#D51C1C'
        },
        {
            title: 'Total Revenue',
            value: "N 22,600",
            change: "10",
            icon: images.sidebarIcons.user,
            color: '#D51C1C'
        },
    ]
    const tabs = [
        { name: "Subscription", value: "subscription" },
        { name: "Leaderboard Payment", value: "leaderboard_payment" },
    ]

    const TransactionStatus = [
        { name: "successfull", value: "successfull" },
        { name: "pending", value: "pending" },
        { name: "failed", value: "failed" },
    ]
    const BulkAction = [
        { name: "Export CSV", value: "csv", },
        { name: "Export PDF", value: "pdf", },
        { name: "Ban", value: "ban", danger: true },
    ]
    const handlePortion = (value:string)=>{
        switch (value) {
            case "subscription":
                setHeadertr(subscriptionTr)
                setBodyData(subscriptions)
                break;
            case "leaderboard_payment":
                setHeadertr(transactionTr)
                setBodyData(subscriptions.map((sub, index) => ({...sub, rank: index + 1, mode: "transfer" })))
                break;
        
            default:
                break;
        }
    }

    const handleFilter = (value: string) => {
        console.log(value)
    }
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

            <h1 className='text-3xl font-bold'>Transaction Summary</h1>

            <TableFiltersCan>
                <ItemGap>
                    <FilterTab
                        tabs={tabs}
                        handleValue={handlePortion}
                        activeTab={tabs[0].name}
                    />
                    <Dropdown
                        options={TransactionStatus}
                        onChange={handleFilter}
                        placeholder="Transaction Status"
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
                headerTr={Headertr}
                dataTr={BodyData}
                TrName={TsubRow}
            />
        </div>
    )
}

export default Transaction