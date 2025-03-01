import React from 'react';
import MoreDropdown from '../../../components/MoreDropdown';

interface PostRowProps {
  displayData: {
    img?: string;
    name: string;
    postType: string;
    postContent: string;
    date: string;
    approval: string;
    likes: number;
    comments: number;
    shares: number;
    views: string;
    id?: string;
  };
  index: number;
  onViewPost?: (data: any) => void;
}

const PostRow: React.FC<PostRowProps> = ({ displayData, index, onViewPost }) => {
  return (
    <tr className='hover:bg-[#ececec] hover:cursor-pointer'>
      {/* Checkbox */}

      {/* Post Type */}
      <td className='px-4 py-2 text-black'>
        <div className='flex items-center gap-2'>
          <input
            type='checkbox'
            className='appearance-none w-5 h-5 border-2 border-gray-400 rounded-md checked:bg-green-600 checked:border-green-600 focus:ring-2 focus:ring-green-500'
          />
          {displayData.postType}
        </div>

      </td>

      {/* Post Content */}
      <td className='px-4 py-2 text-black'>
        {displayData.postContent} <span className='text-red-600 cursor-pointer'>View All</span>
      </td>

      {/* Date */}
      <td className='px-4 py-2 text-black'>{displayData.date}</td>
      <td className='px-4 py-2 text-black'>{displayData.comments},{displayData.likes},{displayData.shares}</td>

      {/* Approval Status */}
      <td className='px-4 py-2'>
        <div className={`capitalize p-1 px-2 rounded-full ${displayData.approval === 'Pending' ? 'text-[#FFA500]' : 'text-green-500'}`}>
          {displayData.approval}
        </div>
      </td>

      {/* Actions Dropdown */}
      <td className='px-4 relative'>
        <MoreDropdown iconClass='bi bi-three-dots-vertical text-black' menuClass='bg-white min-w-[150px]'>
          <div className='p-2 flex flex-col gap-2'>
            <button onClick={() => onViewPost && onViewPost(displayData)} className='bg-white block text-left p-2 cursor-pointer rounded-lg hover:bg-gray-200 w-full hover:text-black'>
              View Post
            </button>
            <div className='w-full h-[2px] bg-gray-300'></div>
            <button className='bg-white block p-2 text-left cursor-pointer rounded-lg hover:bg-gray-200 w-full hover:text-black text-red-600'>
              Delete
            </button>
          </div>
        </MoreDropdown>
      </td>
    </tr>
  );
};

export default PostRow;