import React, { useState } from 'react'
import { API_DOMAIN_images } from '../../../../util/apiConfig';
// import { postData } from './SocialData';
import PostModal from '../../users/components/PostModal';


type Props = {
    PostData: {
        id: number;
        user: {
            id: number;
            username: string;
            profile_picture: string;
        };
        timestamp: string;
        content: string;
        type: string;
        likes_count: number;
        comments_count: number;
        share_count: number;
        view_count: number;
        recent_comments: any[];
    }[];
}

const PostTable = ({ PostData }: Props) => {
    const [selectedPost, setSelectedPost] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleViewPost = (postData: any) => {
        setSelectedPost(postData);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    console.log('================ data ====================');
    console.log("post table ", PostData);
    console.log('================ data ====================');
    return (
        <div className='max-h-[500px] overflow-auto my-4 specific-scroll rounded-md shadow-md shadow-gray-400'>
            <table className="w-full rounded-md shadow-md shadow-gray-400 overflow-hidden">
                <thead className='bg-[#FFDADA]'>
                    <tr className='sticky top-0'>
                        <th className='text-left p-4'>Post</th>
                        <th className='text-left p-4'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        PostData.map((post, index) => (
                            <tr className='' key={index}>
                                <td className='p-4'>
                                    <div className='flex items-center gap-4 text-justify'>
                                        <img src={post.user.profile_picture && API_DOMAIN_images + post.user.profile_picture} alt={post.user.username} className='w-10 h-10 rounded-full' />
                                        <span>
                                            {post.content}
                                        </span>
                                    </div>
                                </td>
                                <td className='p-4'>
                                    <div className='flex items-center' onClick={() => handleViewPost(post)}>
                                        <button className='py-2 px-4 rounded-md bg-[#008000] text-nowrap text-white'>
                                            View Post
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <PostModal isOpen={isModalOpen} onClose={closeModal} postData={selectedPost} />
        </div>
    )
}

export default PostTable