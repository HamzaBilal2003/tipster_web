import React from "react";

interface FaqRowProps {
  displayData: {
    id: number;
    question: string;
    answer: string;
    type: string;
    created_at: string;
    updated_at: string;
  };
  index?: number;
  onEdit: (faq: any) => void;
}

const FaqsRow: React.FC<FaqRowProps> = ({ displayData, index, onEdit }) => {
  return (
    <tr className="hover:bg-[#ececec] hover:cursor-pointer">
      <td className="px-4 py-4">
        <div className="flex items-center gap-2 w-fit">
          <input
            type="checkbox"
            className="appearance-none w-5 h-5 border-2 border-gray-400 rounded-md 
            checked:bg-green-600 checked:border-green-600 focus:ring-2 focus:ring-green-500 
            relative flex items-center justify-center 
            checked:after:content-['✓'] checked:after:text-white checked:after:text-xs checked:after:font-bold 
            checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"
          />
          <div className="flex items-center gap-2">
            <span className="line-clamp-1">{displayData.question}</span>
          </div>
        </div>
      </td>

      <td className="px-4 py-4">
        <span className="text-sm">
          {displayData.answer}
        </span>
      </td>

      <td className="px-2 py-4 text-black w-[100px] text-center">
        <button
          onClick={() => onEdit(displayData)}
          className="text-blue-600 hover:text-blue-800"
        >
          <i className="bi bi-pencil-square cursor-pointer"></i>
        </button>
      </td>
    </tr>
  );
};

export default FaqsRow;