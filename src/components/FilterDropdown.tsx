import React, { useState, useRef, useEffect } from 'react';

interface FilterOption {
  id: string;
  label: string;
  type: 'range' | 'checkbox';
  options?: {
    id: string;
    label: string;
  }[];
  min?: number;
  max?: number;
}

interface FilterDropdownProps {
  options: FilterOption[];
  onApply: (filters: Record<string, any>) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ options, onApply }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, any>>({});
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Count selected filters
  const selectedCount = Object.keys(selectedFilters).length;

  // Handle clicking outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectFilter = (filterId: string) => {
    setActiveFilter(filterId);
  };

  const handleRangeChange = (filterId: string, key: 'min' | 'max', value: string) => {
    const numValue = value === '' ? '' : Number(value);
    
    setSelectedFilters(prev => ({
      ...prev,
      [filterId]: {
        ...prev[filterId],
        [key]: numValue
      }
    }));
  };

  const handleCheckboxChange = (filterId: string, optionId: string, checked: boolean) => {
    setSelectedFilters(prev => {
      const currentOptions = prev[filterId]?.options || [];
      
      if (checked) {
        return {
          ...prev,
          [filterId]: {
            ...prev[filterId],
            options: [...currentOptions, optionId]
          }
        };
      } else {
        return {
          ...prev,
          [filterId]: {
            ...prev[filterId],
            options: currentOptions.filter(id => id !== optionId)
          }
        };
      }
    });
  };

  const removeFilter = (filterId: string) => {
    setSelectedFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[filterId];
      return newFilters;
    });
  };

  const clearAllFilters = () => {
    setSelectedFilters({});
  };

  const applyFilters = () => {
    onApply(selectedFilters);
    setIsOpen(false);
  };

  const isFilterSelected = (filterId: string) => {
    return !!selectedFilters[filterId];
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Filter Button */}
      <button
        onClick={toggleDropdown}
        className={`flex items-center gap-4 px-2 py-1  text-gray-700 rounded-md border ${isOpen ? "bg-red-100 border-red-200" : "bg-transparent border-gray-400"}`}
      >
        <div className='flex items-center gap-1'>
          <i className="bi bi-filter text-3xl"></i>
          <span>Filter</span>
        </div>
        <i className="bi bi-chevron-down text-lg"></i>
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute md:right-0 mt-2 w-full md:w-[800px] bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="flex flex-col md:flex-row h-[400px] md:h-[300px]">
            {/* Filter Categories */}
            <div className="w-full md:w-1/4 border-b md:border-b-0 md:border-r border-gray-200 overflow-y-auto">
              {options.map(filter => (
                <div
                  key={filter.id}
                  onClick={() => selectFilter(filter.id)}
                  className={`px-4 py-3 cursor-pointer hover:bg-gray-100 ${
                    activeFilter === filter.id ? 'bg-gray-100' : ''
                  } ${isFilterSelected(filter.id) ? 'font-medium' : ''}`}
                >
                  {filter.label}
                </div>
              ))}
            </div>

            {/* Filter Options */}
            <div className="w-full md:w-2/4 border-b md:border-b-0 md:border-r border-gray-200 p-4 overflow-y-auto">
              {activeFilter && options.find(f => f.id === activeFilter)?.type === 'range' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-black text-white p-4 flex items-center justify-center">
                      Min
                    </div>
                    <input
                      type="number"
                      className="p-4 bg-gray-100 rounded-none"
                      placeholder="0"
                      value={selectedFilters[activeFilter]?.min ?? ''}
                      onChange={(e) => handleRangeChange(activeFilter, 'min', e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-black text-white p-4 flex items-center justify-center">
                      Max
                    </div>
                    <input
                      type="number"
                      className="p-4 bg-gray-100 rounded-none"
                      placeholder="1000"
                      value={selectedFilters[activeFilter]?.max ?? ''}
                      onChange={(e) => handleRangeChange(activeFilter, 'max', e.target.value)}
                    />
                  </div>
                </div>
              )}

              {activeFilter && options.find(f => f.id === activeFilter)?.type === 'checkbox' && (
                <div className="space-y-2">
                  {options.find(f => f.id === activeFilter)?.options?.map(option => (
                    <div key={option.id} className="flex items-center gap-3 p-2">
                      <input
                        type="checkbox"
                        id={`${activeFilter}-${option.id}`}
                        className="w-5 h-5 accent-red-600"
                        checked={(selectedFilters[activeFilter]?.options || []).includes(option.id)}
                        onChange={(e) => handleCheckboxChange(activeFilter, option.id, e.target.checked)}
                      />
                      <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                      <label htmlFor={`${activeFilter}-${option.id}`} className="cursor-pointer">
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Selected Filters */}
            <div className="w-full md:w-1/4 p-4 overflow-y-auto">
              <div className="mb-4 font-medium">
                {selectedCount} filters selected
              </div>
              <div className="space-y-2">
                {Object.keys(selectedFilters).map(filterId => {
                  const filter = options.find(f => f.id === filterId);
                  if (!filter) return null;
                  
                  return (
                    <div key={filterId} className="flex justify-between items-center">
                      <span>{filter.label}</span>
                      <button 
                        onClick={() => removeFilter(filterId)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <i className='bi bi-x text-xl'></i>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-4 border-t border-gray-200 flex justify-end gap-4">
            <button
              onClick={clearAllFilters}
              className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Clear
            </button>
            <button
              onClick={applyFilters}
              className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;