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
  const token = Cookies.get("authToken");
  const queryClient = useQueryClient();

  // Fetch Bank Info
  const { data: bankInfoDetail, isLoading, isError, refetch } = useQuery({
    queryKey: ["bankinfo", account?.user_id],
    queryFn: async () => {
      const response = await fetch(API_DOMAIN + "bank/get-of-user/" + account?.user_id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch bank info");
      return response.json();
    },
    enabled: isOpen && !!account,
    retry: 1,
  });

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
      queryClient.invalidateQueries({ queryKey: ["rankPrices"] });
      onClose();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  if (!isOpen || !account) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0000005c] bg-opacity-50 z-50">
      <div className="bg-white w-[450px] p-6 rounded-lg shadow-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">
            <span className="text-red-600">{account.username}</span> Account Details - {account.win_amount}
          </h2>
          <button onClick={onClose} className="text-gray-500 text-xl cursor-pointer">×</button>
        </div>

        {isLoading ? (
          <Loarder />
        ) : isError ? (
          <div className="text-red-600 text-center">
            <p>Error fetching bank info</p>
            <button
              onClick={refetch}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            {/* Account Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Account Name</label>
              <input
                type="text"
                value={bankInfoDetail?.data.account_name || "N/A"}
                disabled
                className="w-full bg-gray-100 p-3 rounded-md"
              />
            </div>

            {/* Bank Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Bank Name</label>
              <input
                type="text"
                value={bankInfoDetail?.data.bank_name || "N/A"}
                disabled
                className="w-full p-3 rounded-md border border-gray-300"
              />
            </div>

            {/* Account Number */}
            <div className="mb-4 relative">
              <label className="block text-sm font-medium text-gray-700">Account Number</label>
              <div className="flex items-center">
                <input
                  type="text"
                  value={bankInfoDetail?.data.account_number || "N/A"}
                  disabled
                  className="w-full p-3 rounded-md border border-gray-300"
                />
                <button
                  className="ml-2 text-gray-500 cursor-pointer hover:text-gray-700"
                  onClick={() => navigator.clipboard.writeText(bankInfoDetail?.data.account_number || "")}
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
          </>
        )}
      </div>
    </div>
  );
};

export default AccountDetailsModal;
