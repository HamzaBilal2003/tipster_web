import React, { useEffect, useState } from "react";

interface SearchFilterProps {
  Icon?: React.ElementType | null;
  Placeholder?: string;
  className?: string;
  handleFunction?: (value: string) => void;
  bgColor?: string;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  Icon = null,
  Placeholder = "Search User",
  className = "text-gray-600",
  handleFunction = () => console.log("search button"),
  bgColor
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handler = () => {
    handleFunction(searchTerm);
    console.log("click from search filter");
  }

  return (
    <div className={`${bgColor || "bg-white"} border border-gray-300 relative py-2 px-2 rounded-lg ${className}`}>
      {Icon ? (
        <Icon className="text-2xl absolute top-1/2 left-3 transform -translate-y-1/2 block" />
      ) : (
        <i onClick={handler} className="cursor-pointer bi bi-search text-xl absolute top-1/2 left-3 transform -translate-y-1/2 block"></i>
      )}
      <input
        type="text"
        onChange={(e) => setSearchTerm(e.target.value)}
        className={`ml-9 bg-transparent pl-2 text-xl outline-none py-1 placeholder:text-gray-600 placeholder:text-base ${className}`}
        placeholder={Placeholder}
      />
    </div>
  );
};

export default SearchFilter;
