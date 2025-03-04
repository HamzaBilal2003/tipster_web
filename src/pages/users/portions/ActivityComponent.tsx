import React from 'react'
import Dropdown from '../../../components/DropDown'
import TableCan from '../../../components/TableCan'
import SettingRow from '../../setting/components/SettingRow'
import { SingleUserData } from '../../../../util/queries/userManagement'
type props = {
    userId: string;
    DataList: SingleUserData['data']['userActivity']
}

const ActivityComponent = ({ userId ,DataList }: props) => {
    console.log("activity",DataList)

    const activity = [
        { activity: "User 1 logged in", date: "26-2-2025 / 12:30 PM", },
        { activity: "User 2 logged out", date: "26-2-2025 / 11:45 PM", },
        { activity: "User 3 logged in", date: "26-2-2025 / 10:15 AM", },
        { activity: "User 4 logged out", date: "26-2-2025 / 09:30 AM", },
        { activity: "User 5 logged in", date: "26-2-2025 / 08:00 PM", },
        { activity: "User 6 logged out", date: "26-2-2025 / 07:15 PM", },
        { activity: "User 7 logged in", date: "26-2-2025 / 06:45 AM", },
    ]

    // Filter options
    const BulkAction = [
        { name: "Export CSV", value: "csv", },
        { name: "Export PDF", value: "pdf", },
        { name: "Delete All", value: "delete", danger: true },
    ];

    // Handle filter changes
    const handleFilter = (value: any) => {
        console.log(value);
    };

    return (
        <div className='flex flex-col gap-6'>
            <Dropdown
                options={BulkAction}
                onChange={handleFilter}
                placeholder="Bulk Action"
                position='left-0'
            />
            <TableCan
            // others
                headerTr={['Account Activities','date']}
                dataTr={DataList}
                headerAlign='left'
                TrName={SettingRow}
            />
        </div>
    )
}

export default ActivityComponent