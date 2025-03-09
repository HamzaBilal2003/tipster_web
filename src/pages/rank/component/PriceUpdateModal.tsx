import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRankPrice } from "../../../../util/mutations/rank";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

interface Price {
  id: number;
  amount: string;
  currency: string;
  rank: number;
  created_at: string;
  updated_at: string;
}

interface PriceUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  prices: Price[];
  onUpdate: (updatedPrices: Price[]) => void;
}

const PriceUpdateModal: React.FC<PriceUpdateModalProps> = ({ 
  isOpen, 
  onClose, 
  prices, 
  onUpdate 
}) => {
  const [updatedPrices, setUpdatedPrices] = useState<Price[]>(prices);
  const token = Cookies.get("authToken");
  const queryClient = useQueryClient();

  const { mutate: handleUpdatePrices, isPending: isUpdating } = useMutation({
    mutationKey: ["updateRankPrice"],
    mutationFn: async () => {
      const formattedData = { 
        winners: updatedPrices.map((item) => ({ 
          rank: item.rank, 
          amount: Number(item.amount) 
        })) 
      };
      return await updateRankPrice(formattedData, token);
    },
    onSuccess: async (response: any) => {
      toast.success("Prices updated successfully!");
      await queryClient.invalidateQueries({ queryKey: ["rankPrices"] });
      onUpdate(updatedPrices); // Update parent component state
      onClose();
    },
    onError: (error: any) => {
      toast.error("Failed to update prices: " + error.message);
    },
  });

  const handlePriceChange = (index: number, value: string) => {
    setUpdatedPrices((prev) =>
      prev.map((item, i) => (i === index ? { ...item, amount: value } : item))
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0000003d] bg-opacity-50 z-[1000] py-[100px] overflow-auto">
      <div className="bg-white w-[500px] p-5 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Price Update</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-black cursor-pointer"
          >
            <i className="bi bi-x-circle text-2xl"></i>
          </button>
        </div>

        <div className="space-y-3">
          {updatedPrices.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className="w-6 text-center font-bold">{item.rank}</span>
              <input
                type="text"
                className="w-full p-2 bg-gray-100 rounded-lg focus:outline-none"
                placeholder="Enter Price"
                value={item.amount}
                onChange={(e) => handlePriceChange(index, e.target.value)}
              />
            </div>
          ))}
        </div>

        <div className="mt-4">
          <button
            onClick={() => handleUpdatePrices()}
            className="w-full bg-red-700 text-white py-2 rounded-lg disabled:bg-gray-500"
            disabled={isUpdating}
          >
            {isUpdating ? "Updating..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PriceUpdateModal;