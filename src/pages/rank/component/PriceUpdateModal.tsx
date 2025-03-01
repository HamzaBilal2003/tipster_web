import React, { useState } from "react";

interface PriceUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedPrices: { position: string; amount: string }[]) => void;
  prices: { position: string; amount: string }[];
}

const PriceUpdateModal: React.FC<PriceUpdateModalProps> = ({ isOpen, onClose, onUpdate, prices }) => {
  const [updatedPrices, setUpdatedPrices] = useState(prices);

  if (!isOpen) return null;

  const handlePriceChange = (index: number, value: string) => {
    const newPrices = [...updatedPrices];
    newPrices[index].amount = value;
    setUpdatedPrices(newPrices);
  };

  const handleSubmit = () => {
    onUpdate(updatedPrices);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0000003d] bg-opacity-50 z-[1000] py-[100px] overflow-auto">
      <div className="bg-white w-[500px] p-5 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Price Update</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black cursor-pointer">
            <i className="bi bi-x-circle text-2xl"></i>
          </button>
        </div>

        <div className="space-y-3">
          {updatedPrices.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className="w-6 text-center font-bold">{index + 1}</span>
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
          <button onClick={handleSubmit} className="w-full bg-red-700 text-white py-2 rounded-lg">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default PriceUpdateModal;
