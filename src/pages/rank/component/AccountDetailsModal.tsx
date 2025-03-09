import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import Loarder from "../../../components/Loarder";
import { API_DOMAIN } from "../../../../util/apiConfig";

interface AccountDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  account: {
    user_id: number;
    username: string;
    profile_picture: string | null;
    rank: number;
    points: number;
    win_rate: string;
    win_amount: string;
    currency: string;
    bank_account: {
      id: number;
      user_id: number;
      bank_name: string;
      account_number: string;
      account_name: string;
      created_at: string;
      updated_at: string;
    } | null;
    paid_status: boolean;
  } | null;
}

const AccountDetailsModal: React.FC<AccountDetailsModalProps> = ({ isOpen, onClose, account }) => {
  const [bankInfo, setBankInfo] = useState({
    bankName: "",
    accountNumber: "",
  });

  const token = Cookies.get("authToken");
  const queryClient = useQueryClient();

  // Fetch Bank Info
  const { data: bankInfoDetail, isLoading } = useQuery({
    queryKey: ["bankinfo"],
    queryFn: async () => {
      const response = await fetch(API_DOMAIN + "bank/get-for-user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Attach Authorization Token
        },
      });

      if (!response.ok) throw new Error("Failed to fetch bank info");
      return response.json();
    },
    enabled: isOpen && !!account,
  });
  console.log(bankInfoDetail)

  // Mutation for marking as paid
  const { mutate: markAsPaid, isPending } = useMutation({
    mutationKey: ["markAsPaid"],
    mutationFn: async () => {
      const response = await fetch(API_DOMAIN + "admin/rank/pay-rank-amount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: account?.win_amount,
          user_id: account?.user_id,
          rank: account?.rank,
        }),
      });

      if (!response.ok) throw new Error("Failed to mark as paid");
      return response.json();
    },
    onSuccess: () => {
      toast.success("Payment marked as paid successfully!");
      queryClient.invalidateQueries({ queryKey: ["rankPrices"] }); // Refresh data
      onClose();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  if (!isOpen || !account) return null;
  if (isLoading) return <Loarder />
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
          <input
            type="text"
            value={bankInfoDetail.data.account_name}
            disabled
            className="w-full bg-gray-100 p-3 rounded-md"

          />
        </div>

        {/* Bank Name (Editable) */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Bank Name</label>
          <input
            type="text"
            value={bankInfoDetail.data.bank_name}
            onChange={(e) => setBankInfo((prev) => ({ ...prev, bankName: e.target.value }))}
            className="w-full p-3 rounded-md border border-gray-300"
            disabled
          />
        </div>

        {/* Account Number (Editable) */}
        <div className="mb-4 relative">
          <label className="block text-sm font-medium text-gray-700">Account Number</label>
          <div className="flex items-center">
            <input
              type="text"
              value={bankInfoDetail.data.account_number}
              onChange={(e) => setBankInfo((prev) => ({ ...prev, accountNumber: e.target.value }))}
              className="w-full p-3 rounded-md border border-gray-300"
              disabled
            />
            <button
              className="ml-2 text-gray-500 cursor-pointer hover:text-gray-700"
              onClick={() => navigator.clipboard.writeText(bankInfoDetail.data.account_number)}
            >
              <i className="bi bi-copy"></i>
            </button>
          </div>
        </div>

        {/* Mark as Paid Button */}
        <button
          className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400"
          onClick={() => markAsPaid()}
          disabled={isPending}
        >
          {isPending ? "Processing..." : "Mark As Paid"}
        </button>
      </div>
    </div>
  );
};

export default AccountDetailsModal;
