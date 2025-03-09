import React, { useState, useEffect } from "react";
import PriceUpdateModal from "./PriceUpdateModal";
import images from "../../../assets/images";

type PriceData = {
  id: number;
  amount: string;
  currency: string;
  rank: string;
  created_at: string;
  updated_at: string;
}

const PriceList = ({ initialData, refresh }: { initialData: PriceData[], refresh: () => void }) => {
  const [prices, setPrices] = useState<PriceData[]>(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    setPrices(initialData);
  }, [initialData]);

  const positionStyles: Record<string, { color: string }> = {
    "1": { color: "text-[#F4B400] border-[#F9A604]" },
    "2": { color: "text-[#E67E22] border-[#A0A0A0]" },
    "3": { color: "text-[#A0A0A0] border-[#E67E22]" }
  };

  const icons = [
    images.first_1,
    images.second_2,
    images.third_3,
  ];

  const handlePriceUpdate = (updatedPrices: PriceData[]) => {
    setPrices(updatedPrices);
    refresh();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const lastUpdated = prices?.[0]?.updated_at 
    ? formatDate(prices[0].updated_at)
    : 'Not available';

  return (
    <div className="p-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Prices</h2>
        <span className="text-gray-500 text-sm">Last Updated: {lastUpdated}</span>
      </div>

      <div className="grid grid-cols-5 gap-4 text-center my-8">
        {prices.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className={`flex items-center justify-center bg-gray-200 p-4 rounded-full w-20 h-20 border-2 ${positionStyles[item.rank]?.color}`}>
              {index < 3 ? (
                <img src={icons[index]} alt={`Rank ${index + 1}`} className="w-10 h-10" />
              ) : (
                <span className="text-2xl font-bold">{item.rank}th</span>
              )}
            </div>
            <p className="text-sm font-medium mt-2">N {item.amount}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-4">
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="bg-red-700 text-white px-6 py-2 rounded-lg cursor-pointer"
        >
          Update
        </button>
      </div>

      <PriceUpdateModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        prices={prices}
        onUpdate={handlePriceUpdate}
      />
    </div>
  );
};

export default PriceList;