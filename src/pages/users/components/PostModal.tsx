import React from 'react';
import Dropdown from '../../../components/DropDown';

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  postData: any;
}

const PostModal: React.FC<PostModalProps> = ({ isOpen, onClose, postData }) => {
  if (!isOpen) return null;

  const renderImages = () => {
    if (!postData.images || postData.images.length === 0) return null;

    const displayedImages = postData.images.slice(0, 4);
    const remainingImages = postData.images.length - 4;

    return (
      <div className="grid grid-cols-2 gap-[5px] mt-3">
        {displayedImages.map((image, index) => (
          <div key={index} className="relative w-full h-28">
            <img src={image} alt={`attachment-${index}`} className="w-full h-full object-cover rounded-md" />
            {index === 3 && remainingImages > 0 && (
              <div className="absolute inset-0 bg-[#00000057] bg-opacity-50 flex items-center justify-center text-white font-semibold text-lg rounded-md">
                +{remainingImages}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };


  return (
    <div className='fixed inset-0 bg-[#0000004d] bg-opacity-50 py-[50px] z-[1000] overflow-auto'>
      <div className='bg-white rounded-lg w-full max-w-md mx-auto overflow-hidden'>
        <div className='flex justify-between items-center p-4 border-b'>
          <h2 className='text-xl font-bold'>Post Details</h2>
          <button onClick={onClose} className='cursor-pointer p-1 rounded-full hover:bg-gray-200'>
            <i className='bi bi-x-circle text-xl'></i>
          </button>
        </div>

        <div className='p-4 space-y-6'>
          {/* Post Content */}
          <div className='bg-gray-100 p-4 rounded-lg'>
            <div className='flex gap-2 items-center'>
              <img src={postData?.img} alt='User' className='h-10 w-10 rounded-full' />
              <div>
                <p className='font-bold'>{postData?.name}</p>
                <p className='text-sm text-gray-500'>{postData?.date}</p>
              </div>
            </div>
            <p className='mt-2 text-black'>{postData?.postContent}</p>
            {renderImages()}
            <div className='flex justify-evenly gap-4 mt-3 text-gray-600'>
              <span className='flex items-center gap-1'><i className='bi bi-hand-thumbs-up'></i> {postData?.likes}</span>
              <span className='flex items-center gap-1'><i className='bi bi-chat'></i> {postData?.comments}</span>
              <span className='flex items-center gap-1'><i className='bi bi-share'></i> {postData?.shares}</span>
              <span className='flex items-center gap-1'><i className='bi bi-eye'></i> {postData?.views}</span>
            </div>
          </div>

          {/* Approval Status */}
          <div className='space-y-2'>
            <label className='block text-gray-700 font-medium'>Approval Status</label>
            <Dropdown
              FullWidth={true}
              isNotActiveBg={true}
              options={[{ name: 'Pending', value: 'Pending' }, { name: 'Approved', value: 'Approved' }]}
              onChange={() => { }}
              placeholder={postData?.approval || 'Pending'}
              borderColor='gray-300'
            />
          </div>

          <button className='w-full cursor-pointer py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors'>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
