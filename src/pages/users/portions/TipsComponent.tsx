import React, { useState } from 'react'
import TableFiltersCan from '../../../components/TableFiltersCan'
import ItemGap from '../../../components/ItemGap'
import Dropdown from '../../../components/DropDown'
import FilterDropdown from '../../../components/FilterDropdown'
import SearchFilter from '../../../components/SearchFilter'
import { filterOptions } from '../../../components/FilterJson'
import TableCan from '../../../components/TableCan'
import images from '../../../assets/images'
import PreRow from '../../predication/components/PreRow'
import TipModal from '../components/TipModal'
import TipRow from '../components/TipRow'

type props = {
  userId: string
}

const TipsComponent = ({ userId }: props) => {
  const [appliedFilters, setAppliedFilters] = useState<Record<string, any>>({});
  const [selectedTip, setSelectedTip] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


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

  const handleFilter = (value: any) => {
    console.log(value);
  };

  const handleViewTip = (tipData: any) => {
    setSelectedTip(tipData);
    setIsModalOpen(true);
    console.log("Viewing tip:", tipData);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleApplyFilters = (filters: Record<string, any>) => {
    console.log('Applied filters:', filters);
    setAppliedFilters(filters);

    // Here you would typically filter your data based on the selected filters
  };

  return (
    <div className='flex flex-col gap-6'>
      <TableFiltersCan>
        <ItemGap>
          <Dropdown
            options={DateDropOptions}
            onChange={handleFilter}
            placeholder="Date"
            position='left-0'
          />
          <Dropdown
            options={Status}
            onChange={handleFilter}
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
            handleFunction={handleFilter}
          />
        </div>
      </TableFiltersCan>
      <TableCan
        headerTr={["company", "odds", "code", "win rate","last wins", "Date", "status", "approval", "other"]}
        dataTr={bodyData}
        headerAlign='left'
        TrName={TipRow}
        trNameProps={{
          onViewTip: handleViewTip
        }}

      />
      <TipModal
        isOpen={isModalOpen}
        onClose={closeModal}
        tipData={selectedTip}
      />
    </div>
  )
}

export default TipsComponent