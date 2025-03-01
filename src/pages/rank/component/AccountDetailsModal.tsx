import React from "react";

interface AccountDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  account: {
    name: string;
    AmountWon: string;
    bankName: string;
    accountNumber: string;
    id:string
  } | null;
  onSubmit:(id:string)=> void;
}

const AccountDetailsModal: React.FC<AccountDetailsModalProps> = ({ isOpen, onClose, account,onSubmit }) => {
  if (!isOpen || !account) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0000005c] bg-opacity-50 z-50">
      <div className="bg-white w-[450px] p-6 rounded-lg shadow-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">
            <span className="text-red-600">{account.name}</span> Account Details - {account.AmountWon}
          </h2>
          <button onClick={onClose} className="text-gray-500 text-xl cursor-pointer">×</button>
        </div>

        {/* Account Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Account Name</label>
          <div className="bg-gray-100 p-3 rounded-md">{account.name}</div>
        </div>

        {/* Bank Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Bank Name</label>
          <div className="bg-gray-100 p-3 rounded-md">{account.bankName}</div>
        </div>

        {/* Account Number */}
        <div className="mb-4 relative">
          <label className="block text-sm font-medium text-gray-700">Account Number</label>
          <div className="bg-gray-100 p-3 rounded-md flex justify-between items-center">
            <span>{account.accountNumber}</span>
            <button
              className="text-gray-500 cursor-pointer hover:text-gray-700"
              onClick={() => navigator.clipboard.writeText(account.accountNumber)}
            >
              <i className="bi bi-copy"></i>
            </button>
          </div>
        </div>

        {/* Mark as Paid Button */}
        <button className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700" onClick={()=>onSubmit(account.id)}>
          Mark As Paid
        </button>
      </div>
    </div>
  );
};

export default AccountDetailsModal;
