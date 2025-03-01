import React from 'react';
// import { X, Calendar, Copy, ChevronDown } from 'lucide-react';

interface TipDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  tipData: {
    name: string;
    WalletName: string;
    odds: string;
    code: string;
    date: string;
    status: string;
    category?: string;
    Walletimg: string;
  } | null;
}

const TipDetailsModal: React.FC<TipDetailsModalProps> = ({ isOpen, onClose, tipData }) => {
  if (!isOpen || !tipData) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).replace(/\//g, '-');
  };

  return (
    <div className="fixed inset-0 bg-[#00000069] bg-opacity-50 flex items-center justify-center z-[1000] overflow-auto py-[100px]">
      <div className="bg-white rounded-lg w-full max-w-md mx-4 overflow-hidden transform translate-y-[130px]">
        <div className="p-4 border-b border-b-gray-300 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Tip Details by <span className="text-red-600">{tipData.name}</span></h2>
          <button onClick={onClose} className="text-gray-500 cursor-pointer hover:text-gray-700">
            <i className='bi bi-x-circle text-3xl'></i>
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Betting Company</label>
            <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={tipData.Walletimg} alt={tipData.WalletName} className='w-10 h-10 rounded-full' />
                <span>{tipData.WalletName.replace(' Wallet', '')}</span>
              </div>
              <i className="bi bi-chevron-down text-lg"></i>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Number of odds</label>
            <div className="bg-gray-100 p-4 rounded-lg">
              {tipData.odds}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Booking code</label>
            <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-between">
              {tipData.code}
              <button className="text-gray-500 hover:text-gray-700 cursor-pointer" onClick={() => navigator.clipboard.writeText(tipData.code)}>
                <i className="bi bi-copy text-lg"></i>
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Category</label>
            <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-between">
              <div className="flex items-center">
                {/* <div className="bg-red-500 rounded-full p-2 mr-3">
                  <span className="text-white font-bold">$</span>
                </div> */}
                <span>{tipData.category || "Basketball"}</span>
              </div>
              <i className="bi bi-chevron-down text-lg"></i>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Date</label>
            <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-between">
              {formatDate(tipData.date)}
              <i className='bi bi-calendar3 text-lg'></i>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Approval Status</label>
            <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-between">
              <span>{tipData.status}</span>
              <i className="bi bi-chevron-down text-lg"></i>
            </div>
          </div>
        </div>

        <div className="p-4">
          <button
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-md font-medium cursor-pointer"
            onClick={onClose}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TipDetailsModal;