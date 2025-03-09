import React, { useState } from 'react';
import MoreDropdown from '../../../components/MoreDropdown';
import FormatDate from '../../../components/FormatDate';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { DeletePost } from '../../../../util/queries/PostQueries';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import BtnLoader from '../../../components/btnLoader';
import { Route, useLocation } from 'react-router-dom';
interface PostRowProps {
  displayData: {
    id: number;
    title: string | null;
    content: string | null;
    user_id: number;
    has_image: number;
    status: string;
    created_at: string;
    updated_at: string;
    images: string;
    share_count: number;
    view_count: number;
    type: string;
  };
  index: number;
  onViewPost?: (data: any) => void;
}

const PostRow: React.FC<PostRowProps> = ({ displayData, index, onViewPost }) => {
  // get url pathanme
  const CustomQueryKey = useLocation().pathname.substring(0,5) == '/user' ? 'usersProfile' : 'allPostData' ;
  const token = Cookies.get('authToken');
  const [isdelLoading, setisdelLoading] = useState(false);
  const queryClient = useQueryClient();

  const { isLoading: isDeleteLoading, error: deleteError, refetch: fetchDelete } = useQuery({
    queryKey: ['deletePost'],
    queryFn: () => DeletePost(token, displayData.id),
    enabled: false,
  });

  const handleDelete = () => {
    if (!token) {
      toast.error("Authentication token is missing");
      return;
    }
    setisdelLoading(true)
    toast.info('Wait!! Post is deleting...')
    fetchDelete().then(({ error }) => {
      if (error) {
        toast.error("Something went wrong");
        setisdelLoading(isDeleteLoading);
        return;
      }
      if (!isDeleteLoading && !deleteError) {
        toast.success("Post deleted successfully");
        queryClient.invalidateQueries({ queryKey: [CustomQueryKey] });
        // refresh the page
        window.location.reload();
        setisdelLoading(isDeleteLoading);
      }
    });
  }
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
          {displayData.type}
        </div>

      </td>

      {/* Post Content */}
      <td className='px-4 py-2 text-black'>
        {displayData.content?.length < 30 ? displayData.content : (displayData.content)?.slice(0, 30) + " ..."}
      </td>

      {/* Date */}
      <td className='px-4 py-2 text-black'>{FormatDate(displayData.created_at)}</td>
      <td className='px-4 py-2 text-black'>{displayData.share_count},{displayData.view_count}</td>

      {/* Approval Status */}
      <td className='px-4 py-2'>
        <div className={`capitalize p-1 px-2 rounded-full ${displayData.status === 'under_review' ? 'text-red-500' : 'text-green-500'}`}>
          {displayData.status.replace("_", " ")}
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
            <button onClick={handleDelete} disabled={isDeleteLoading} className='bg-white block p-2 text-left cursor-pointer rounded-lg hover:bg-red-600 w-full hover:text-black text-red-600'>
              {isdelLoading ?  <BtnLoader  /> : "Delete Post"}
            </button>
          </div>
        </MoreDropdown>
      </td>
    </tr>
  );
};

export default PostRow;