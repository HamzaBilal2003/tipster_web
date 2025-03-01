import React, { useState } from 'react'
import RankGraph from './component/RankGraph';
import images from '../../assets/images';
import TableFiltersCan from '../../components/TableFiltersCan';
import ItemGap from '../../components/ItemGap';
import Dropdown from '../../components/DropDown';
import SearchFilter from '../../components/SearchFilter';
import TableCan from '../../components/TableCan';
import SubRow from '../subscription/components/SubRow';
import RankRow from './component/RankRow';
import AccountDetailsModal from './component/AccountDetailsModal';

type displayData = {
  select: boolean;
  name: string;
  rank: "1";
  img?: string;
  winRate: string;
  point: string;
  AmountWon: string;
  paymentStatus: string;
  id?: string;
  bankName?: string;
  accountNumber?: string;
}
const Rank = () => {
  const [selectedAccount, setselectedAccount] = useState<displayData>({
    select: false,
    name: "John Doe",
    rank: "1",
    img: images.dummyImage,
    winRate: "85%",
    point: "1200",
    AmountWon: "100000",
    paymentStatus: "paid",
    id: "1",
    bankName: "ABC Bank",
    accountNumber: "1234567890"
  })
  const [isModalOpen, setIsModalOpen] = useState(false);

  const rankData = [
    {
      "id": "1",
      "username": "John Doe",
      "rankCount": 1200,
      "percentage": "85%",
      "position": "1st",
      "profileImage": images.dummyImage
    },
    {
      "id": "2",
      "username": "Jane Smith",
      "rankCount": 1100,
      "percentage": "82%",
      "position": "2nd",
      "profileImage": images.dummyImage
    },
    {
      "id": "3",
      "username": "Michael Johnson",
      "rankCount": 1050,
      "percentage": "78%",
      "position": "3rd",
      "profileImage": images.dummyImage
    }
  ]
  const DateDropOptions = [
    { name: "Today", value: "today" },
    { name: "Yesterday", value: "yesterday" },
    { name: "Last 7 Days", value: "last-7-days" },
    { name: "Last 30 Days", value: "last-30-days" },
    { name: "Last 60 Days", value: "last-60-days" },
  ];
  const Status = [
    { name: "paid", value: "paid" },
    { name: "pending", value: "pending" },
  ];
  const bodyData = [
    {
      "select": false,
      "name": "John Doe",
      "rank": "1",
      "img": "https://randomuser.me/api/portraits/men/1.jpg",
      "winRate": "85%",
      "point": "1500",
      "AmountWon": "N 10,000",
      "paymentStatus": "paid",
      "id": "001",
      "bankName":"dummy bank",
      "accountNumber":"123123123123123"
    },
    {
      "select": false,
      "name": "Sarah Smith",
      "rank": "1",
      "img": "https://randomuser.me/api/portraits/women/2.jpg",
      "winRate": "90%",
      "point": "1800",
      "AmountWon": "N 12,000",
      "paymentStatus": "Pending",
      "id": "002",
      "bankName":"dummy bank",
      "accountNumber":"123123123123123"
    },
    {
      "select": false,
      "name": "Michael Brown",
      "rank": "1",
      "img": "https://randomuser.me/api/portraits/men/3.jpg",
      "winRate": "78%",
      "point": "1400",
      "AmountWon": "N 8,500",
      "paymentStatus": "paid",
      "id": "003",
      "bankName":"dummy bank",
      "accountNumber":"123123123123123"
    },
    {
      "select": false,
      "name": "Jessica Lee",
      "rank": "1",
      "img": "https://randomuser.me/api/portraits/women/4.jpg",
      "winRate": "92%",
      "point": "1900",
      "AmountWon": "N 15,000",
      "paymentStatus": "Pending",
      "id": "004",
      "bankName":"dummy bank",
      "accountNumber":"123123123123123"
    },
    {
      "select": false,
      "name": "David Wilson",
      "rank": "1",
      "img": "https://randomuser.me/api/portraits/men/5.jpg",
      "winRate": "80%",
      "point": "1600",
      "AmountWon": "N 9,500",
      "paymentStatus": "paid",
      "id": "005",
      "bankName":"dummy bank",
      "accountNumber":"123123123123123"
    },
    {
      "select": false,
      "name": "Olivia Taylor",
      "rank": "1",
      "img": "https://randomuser.me/api/portraits/women/6.jpg",
      "winRate": "88%",
      "point": "1700",
      "AmountWon": "N 11,500",
      "paymentStatus": "Pending",
      "id": "006",
      "bankName":"dummy bank",
      "accountNumber":"123123123123123"
    },
    {
      "select": false,
      "name": "James Anderson",
      "rank": "1",
      "img": "https://randomuser.me/api/portraits/men/7.jpg",
      "winRate": "84%",
      "point": "1550",
      "AmountWon": "N 10,200",
      "paymentStatus": "paid",
      "id": "007",
      "bankName":"dummy bank",
      "accountNumber":"123123123123123"
    }
  ];

  const [FilterData, setFilterData] = useState(bodyData);

  const handleMarkFunction = (id :string)=>{
    // update payment status paid
    const updatedData = FilterData.map((item) => {
      if (item.id === id) {
        return {...item, paymentStatus: "paid" };
      }
      return item;
    });
    setFilterData(updatedData);
    setIsModalOpen(false)
  }
  const handleAccountClick = (account : displayData) => {
    setselectedAccount(account);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  const handleFilter = (value: string) => {
    console.log(value);
  }
  return (
    <div className='flex flex-col gap-6'>
      <RankGraph handleFilter={handleFilter} FirstThree={rankData} />
      <div className='my-4'></div>
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
            placeholder="Payemnt Status"
            position='left-0'
          />
        </ItemGap>
        <SearchFilter
          handleFunction={handleFilter}
        />
      </TableFiltersCan>

      <TableCan
        headerTr={["rank", "name", "win rate", "point", "amount won", "payment status", "Other"]}
        dataTr={FilterData}
        headerAlign='left'
        TrName={RankRow}
        trNameProps={{
          onAccountView: (acount: displayData) => handleAccountClick(acount) ,
        }}
      />
      <AccountDetailsModal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={(id:string)=>handleMarkFunction(id)} account={selectedAccount} />
    </div>
  )
}

export default Rank