import React from 'react';
import { User } from '../../types';

interface AudienceModalProps {
  showModal: boolean;
  closeModal: () => void;
  applySelection: () => void;
  allUsers: User[];
  tempSelectedUsers: User[];
  selectAll: boolean;
  toggleSelectAll: () => void;
  toggleUserSelection: (userId: string) => void;
  isUserSelected: (userId: string) => boolean;
}

const AudienceModal: React.FC<AudienceModalProps> = ({
  showModal,
  closeModal,
  applySelection,
  allUsers,
  selectAll,
  toggleSelectAll,
  toggleUserSelection,
  isUserSelected
}) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-[#0000002b] bg-opacity-50 flex items-center justify-center p-4 z-[1000]">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4">
          <h2 className="text-xl font-bold">Select Audience</h2>
          <button
            onClick={closeModal}
            className="p-1 cursor-pointer"
          >
            <i className="bi bi-x-circle text-xl"></i>
          </button>
        </div>

        {/* Select All */}
        <div className="p-4">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={toggleSelectAll}
          >
            <div className={`w-6 h-6 flex items-center justify-center rounded ${selectAll ? 'bg-red-700' : 'border border-gray-400'}`}>
              {selectAll &&
                <i className="bi bi-check2 text-white"></i>
              }
            </div>
            <span className="font-medium">Select All</span>
          </div>
        </div>

        {/* User List */}
        <div className="overflow-y-auto flex-grow">
          {allUsers.map(user => (
            <div
              key={user.id}
              className="p-4 hover:bg-gray-50 transition-colors"
            >
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => toggleUserSelection(user.id)}
              >
                <div className={`w-6 h-6 flex items-center justify-center rounded ${isUserSelected(user.id) ? 'bg-red-700' : 'border border-gray-400'}`}>
                  {isUserSelected(user.id) &&
                    <i className="bi bi-check2 text-white"></i>
                  }
                </div>
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="font-medium">{user.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Apply Button */}
        <div className="p-4 mt-auto">
          <button
            onClick={applySelection}
            className="w-full py-3 bg-red-700 text-white rounded-lg hover:bg-red-800 transition-colors font-medium"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudienceModal;