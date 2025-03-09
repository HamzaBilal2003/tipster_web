import React from 'react';
import FormatDate from '../../../components/FormatDate';


interface User {
  id: string;
  name: string;
  avatar: string;
  selected?: boolean;
}
interface NotificationData {
  id: number;
  user_id: number;
  triggered_by_username: string;
  type: string; // Extend types if needed
  post_id: number | null;
  message: string;
  is_read: boolean;
  created_at: string;
  updated_at: string;
  attachment: string[] | null;
}

interface NotificationRowProps {
  displayData: NotificationData;
  index: number;
  onEdit: (notification: NotificationData) => void;
  onDelete: (id: string) => void;
}

const NotificationRow: React.FC<NotificationRowProps> = ({ displayData, onEdit, onDelete }) => {
  return (
    <tr className=" cursor-pointer hover:bg-gray-50">
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
            <span className="text-black">{displayData.message}</span>
          </div>
        </div>
      </td>
      <td className="p-4 text-left">{FormatDate(displayData.created_at)}</td>
      <td className="p-4 text-left">
        {displayData.attachment && displayData.attachment.length > 0 ? (
          <div className="flex -space-x-2">
            {displayData.attachment.map((item, index) => (
              <div key={index} className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <i className="bi bi-file-earmark text-gray-500"></i>
              </div>
            ))}
          </div>
        ) : (
          <span className="text-gray-500">No attachments</span>
        )}
      </td>
      <td className="p-4 text-left">
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(displayData)}
            className="p-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
          >
            <i className="bi bi-pencil"></i>
          </button>
          <button
            onClick={() => onDelete(displayData.id)}
            className="p-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200"
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default NotificationRow;