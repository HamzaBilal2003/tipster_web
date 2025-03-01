import React, { useState } from "react";
import CommentModal from "./CommentModal";

interface Comment {
    id: string;
    username: string;
    profileImage: string;
    content: string;
    likes: number;
}

interface PostProps {
    id?: string;
    username: string;
    profileImage: string;
    timestamp: string;
    content: string;
    likes: number;
    comments: Comment[];
    shares: number;
    views: string;
    images?: string[];
}

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

    const renderImages = () => {
        if (!post.images || post.images.length === 0) return null;

        const displayedImages = post.images.slice(0, 4);
        const remainingImages = post.images.length - 4;

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
        <>
            <div className="bg-[#F1F1F1] p-4 rounded-md flex flex-col gap-4 shadow-md">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <img src={post.profileImage} alt="User profile" className="w-16 h-16 rounded-full" />
                        <div>
                            <h1 className="text-lg font-bold">{post.username}</h1>
                            <h6 className="text-[#00000080] text-sm">{post.timestamp}</h6>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button className="text-green-500 font-medium cursor-pointer">Approve</button>
                        <button className="text-red-500 font-medium cursor-pointer">Delete</button>
                    </div>
                </div>

                {/* Post Content */}
                <div className="text-lg">{post.content}</div>

                {/* Image Attachments */}
                {renderImages()}

                {/* Post Actions */}
                <div className="flex justify-between items-center pt-3 text-gray-700">
                    <div className="flex items-center gap-2">
                        <i className="bi bi-hand-thumbs-up text-xl"></i>
                        <span>{post.likes}</span>
                    </div>
                    <div 
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => setIsCommentModalOpen(true)}
                    >
                        <i className="bi bi-chat text-xl"></i>
                        <span>{post.comments.length}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <i className="bi bi-share text-xl"></i>
                        <span>{post.shares}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <i className="bi bi-eye text-xl"></i>
                        <span>{post.views}</span>
                    </div>
                </div>
            </div>

            {/* Comment Modal */}
            <CommentModal isOpen={isCommentModalOpen} onClose={() => setIsCommentModalOpen(false)} comments={post.comments} />
        </>
    );
};

export default Post;
