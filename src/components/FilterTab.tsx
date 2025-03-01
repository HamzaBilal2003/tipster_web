import React, { useState } from "react";

interface Tab {
  name: string;
  value: string;
}

interface FilterProps {
  tabs: Tab[];
  handleValue: (value: string) => void;
  activeTab: string;
}

const FilterTab: React.FC<FilterProps> = ({
  tabs,
  handleValue,
  activeTab,
}) => {
  const [activeTabs, setActiveTabs] = useState<string>(activeTab);

  const handleTabClick = (tab: Tab) => {
    handleValue(tab.value);
    setActiveTabs(tab.name);
  };

  return (
    <div className="flex items-center bg-white border border-gray-300 w-fit rounded-md">
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`capitalize p-2 cursor-pointer px-6 rounded-md text-black text-lg ${
            activeTabs === tab.name
              ? "bg-[#a02a2a] text-white shadow-md" // Active styling (dark red with white text)
              : "bg-transparent text-black hover:bg-gray-100 transition"
          }`}
          onClick={() => handleTabClick(tab)}
        >
          {tab.name}
        </button>
      ))}
    </div>
  );
};

export default FilterTab;
