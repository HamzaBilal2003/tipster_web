import React, { useState } from 'react';
import Dropdown from '../../../components/DropDown';
import images from '../../../assets/images';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateTipFetch } from '../../../../util/mutations/TipsMutation';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { API_DOMAIN_images } from '../../../../util/apiConfig';

interface TipModalProps {
  isOpen: boolean;
  onClose: () => void;
  tipData: {
    id: number;
    user_id: number;
    betting_company_id: number;
    codes: string;
    ods: string;
    status: string;
    result: string;
    match_date: string;
    betting_category: string;
    created_at: string;
    updated_at: string;
    betting_company: {
      id: number;
      title: string;
      logo: string;
      status: string;
      created_at: string;
      updated_at: string;
    };
    user: {
      id: number;
      username: string;
      profile_picture: string;
      win_rate: string;
      last_five: Array<string>;
    };
  };
  dataFetchName:string
}

const TipModal: React.FC<TipModalProps> = ({ isOpen, onClose, tipData,dataFetchName }) => {
  const [selectedDate, setSelectedDate] = useState<string>(tipData?.match_date);
  const [approvalStatus, setApprovalStatus] = useState<string>(tipData.status);
  const [betStatus, setBetStatus] = useState<string>(tipData.result);
  const [odds, setOdds] = useState<string>(tipData?.ods);
  const [selectedCompony, setselectedCompony] = useState(tipData?.betting_company.title);
  const [code, setCode] = useState<string>(tipData?.codes);
  const [category, setCategory] = useState<string>(tipData?.betting_category);

  const token = Cookies.get('authToken');
  console.log("tipData from Model: " , tipData)
  const BetStatusOptions = [
    { name: 'Running', value: 'running' },
    { name: 'Won', value: 'won' },
    { name: 'Lost', value: 'lost' },
  ];
  const queryClient = useQueryClient()

  const { mutate: updateTipMutation, isPending, error } = useMutation({
    mutationKey: ['updateTip'],
    mutationFn: () => UpdateTipFetch({ status: approvalStatus, result: betStatus },tipData.id, token),
    onSuccess: (data : any) => {
      console.log(data)
      queryClient.invalidateQueries({ queryKey: [dataFetchName] });
      onClose();
      toast('Tip updated successfully');
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(
        error?.response?.data?.message || error.message || "Update failed."
      );
    },
  });

  const handleSave = () => {
    console.log({ status: approvalStatus, result: betStatus });
    updateTipMutation();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#0000004d] bg-opacity-50 py-[50px] z-[1000] overflow-auto">
      <div className="bg-white rounded-lg w-full max-w-md mx-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Tip Details</h2>
          <button onClick={onClose} className="cursor-pointer p-1 rounded-full hover:bg-gray-200">
            <i className='bi bi-x-circle text-xl'></i>
          </button>
        </div>

        <div className="p-4 space-y-6">
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Betting Company</label>
            <div className='flex items-center pl-2 bg-gray-300 rounded-md'>
              <img src={API_DOMAIN_images + tipData.betting_company.logo} alt="" />
              <input
                type="text"
                value={tipData.betting_company.title}
                className="p-3  rounded-lg w-full outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Number of odds</label>
            <input
              type="text"
              value={tipData.ods}
              className="p-3 bg-gray-300 rounded-lg w-full outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Booking code</label>
            <div className="flex items-center justify-between p-3 bg-gray-300 rounded-lg">
              <input
                type="text"
                value={tipData.codes}
                className="bg-transparent outline-none w-full"
              />
              <button onClick={() => copyToClipboard(tipData.codes)} className="text-gray-500 hover:text-gray-700">
                <i className='bi bi-copy text-xl'></i>
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Category</label>
            <input
              type="text"
              value={tipData.betting_category}
              className="p-3 bg-gray-300 rounded-lg w-full outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Date</label>
            <div className="flex items-center justify-between p-3 bg-gray-300 rounded-lg">
              <input
                type="text"
                value={tipData.match_date}
                className="bg-transparent outline-none w-full"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Approval Status</label>
            <div className="flex items-center justify-between bg-gray-300 rounded-lg pr-2">
              <select
                value={approvalStatus}
                onChange={(e) => setApprovalStatus(e.target.value)}
                className="outline-none w-full p-3"
              >
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Bet Status</label>
            <div className="flex items-center justify-between bg-gray-300 rounded-lg pr-2">
              <select
                value={betStatus}
                onChange={(e) => setBetStatus(e.target.value)}
                className="bg-transparent outline-none w-full p-3"
              >
                {BetStatusOptions.map((option, index) => (
                  <option key={index} value={option.value}>{option.name}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            disabled={isPending}
            onClick={handleSave}
            className="w-full py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
          >
            {isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TipModal;