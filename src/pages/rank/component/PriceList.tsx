import React, { useState } from "react";
import PriceUpdateModal from "./PriceUpdateModal";
import images from "../../../assets/images";

type data = {
  position: string;
  amount: string;
  icon?: string
}

const PriceList = ({data}:{data:data[]}) => {
  const [prices, setPrices] = useState(data);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePriceUpdate = (updatedPrices: { position: string; amount: string }[]) => {
    setPrices(updatedPrices);
  };
  const positionStyles: Record<string, { color: string; }> = {
    "1": { color: "text-[#F4B400] border-[#F9A604]", }, // Gold 🥇
    "2": { color: "text-[#E67E22] border-[#A0A0A0]", }, // Silver 🥈
    "3": { color: "text-[#A0A0A0] border-[#E67E22]", }  // Bronze 🥉
  };

  return (
    <div className="p-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Prices</h2>
        <span className="text-gray-500 text-sm">Last Updated: 2nd Feb, 2025 - 09:22 AM</span>
      </div>

      <div className="grid grid-cols-5 gap-4 text-center my-8">
        {prices.map((item, index) => (
          <div key={index} className="flex flex-col items-center ">
            <div className={`flex items-center justify-center bg-gray-200 p-4 rounded-full w-20 h-20 border-2 ${positionStyles[item.position]?.color}`}>
              {item.icon ? (
                <img src={item.icon} alt={item.position} className="w-10 h-10" />
              ) : (
                <span className="text-2xl font-bold">{item.position}th</span>
              )}
            </div>
            <p className="text-sm font-medium mt-2">N {item.amount}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-4">
        <button onClick={() => setIsModalOpen(true)} className="bg-red-700 text-white px-6 py-2 rounded-lg cursor-pointer">
          Update
        </button>
      </div>

      <PriceUpdateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onUpdate={handlePriceUpdate} prices={prices} />
    </div>
  );
};

export default PriceList;
