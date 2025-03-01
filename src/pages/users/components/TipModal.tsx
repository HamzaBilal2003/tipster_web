import React, { useState } from 'react';
import Dropdown from '../../../components/DropDown';
import images from '../../../assets/images';

interface TipModalProps {
  isOpen: boolean;
  onClose: () => void;
  tipData: any;
}

const TipModal: React.FC<TipModalProps> = ({ isOpen, onClose, tipData }) => {
  const [selectedDate, setSelectedDate] = useState<string>(tipData?.date || '2025-02-01');
  const [approvalStatus, setApprovalStatus] = useState<string>(tipData?.approval ? 'Approved' : 'Pending');
  const [betStatus, setBetStatus] = useState<string>(tipData?.status || 'Pending');
  const [odds, setOdds] = useState<string>(tipData?.odds || '25.22');
  const [selectedCompony, setselectedCompony] = useState(tipData?.WalletName || 'Company 1');
  const [code, setCode] = useState<string>(tipData?.code || 'WECSEKCKSC');
  const [category, setCategory] = useState<string>(tipData?.category || 'Basketball');

  const companyOptions = [
    { name: 'Sporty Bet', value: 'Sporty Bet',icon: images.swapy },
    { name: 'Betway', value: 'Betway',icon: images.swapy },
    { name: '1xBet', value: '1xBet',icon: images.swapy },
    { name: 'Bet365', value: 'Bet365',icon: images.swapy },
  ];

  const categoryOptions =[
    { name: 'Football', value: 'Football' },
    { name: 'Basketball', value: 'Basketball' },
    { name: 'Tennis', value: 'Tennis' },
  ]
  const BetStatusOptions = [
    { name: 'Pending', value: 'pending' },
    { name: 'Won', value: 'won' },
    { name: 'Lost', value: 'lost' },
  ];

  if (!isOpen) return null;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="fixed inset-0 bg-[#0000004d] bg-opacity-50 py-[50px] z-[1000] overflow-auto">
      <div className="bg-white rounded-lg w-full max-w-md mx-auto overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Tip Details</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200">
            <i className='bi bi-x-circle text-xl'></i>
          </button>
        </div>

        <div className="p-4 space-y-6">
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Betting Company</label>
            <Dropdown
              FullWidth={true}
              isNotActiveBg={true}
              options={companyOptions}
              onChange={setselectedCompony}
              placeholder={selectedCompony}
              borderColor="gray-300"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Number of odds</label>
            <input
              type="text"
              value={odds}
              onChange={(e) => setOdds(e.target.value)}
              className="p-3 bg-gray-100 rounded-lg w-full outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Booking code</label>
            <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="bg-transparent outline-none w-full"
              />
              <button onClick={() => copyToClipboard(code)} className="text-gray-500 hover:text-gray-700">
                <i className='bi bi-copy text-xl'></i>
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Category</label>
            <Dropdown
              FullWidth={true}
              isNotActiveBg={true}
              options={categoryOptions}
              onChange={setCategory}
              placeholder={category}
              borderColor="gray-300"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Date</label>
            <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-transparent outline-none w-full"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Approval Status</label>
            <div className="flex items-center justify-between bg-gray-100 rounded-lg">
              <select
                value={approvalStatus}
                onChange={(e) => setApprovalStatus(e.target.value)}
                className="bg-transparent outline-none w-full p-3"
              >
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Bet Status</label>
            <div className="flex items-center justify-between bg-gray-100 rounded-lg">
              <Dropdown
                FullWidth={true}
                isNotActiveBg={true}
                options={BetStatusOptions}
                onChange={setBetStatus}
                placeholder={betStatus}
                borderColor="gray-300"
              />
            </div>
          </div>

          <button className="w-full py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TipModal;