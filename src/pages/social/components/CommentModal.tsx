import React from "react";

interface Comment {
    id: string;
    username: string;
    profileImage: string;
    content: string;
    likes: number;
}

interface CommentModalProps {
    isOpen: boolean;
    onClose: () => void;
    comments: Comment[];
}

const CommentModal: React.FC<CommentModalProps> = ({ isOpen, onClose, comments }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-[#00000061] bg-opacity-50 flex items-center justify-center z-[1000]">
            <div className="bg-white min-w-md  p-5 rounded-lg shadow-lg relative ">
                <div className="border-b border-gray-400 flex items-center justify-between gap-4 pb-4">
                    <h2 className="text-xl font-bold">Comments ({comments.length})</h2>
                    {/* Close Button */}
                    <button
                        className="cursor-pointer"
                        onClick={onClose}
                    >
                        <i className="bi bi-x-circle text-xl"></i>
                    </button>
                </div>

                {/* Comment List */}
                <div className="space-y-4 max-h-[400px] overflow-y-auto px-2 specific-scroll py-4">
                    {comments.map((comment) => (
                        <div key={comment.id} className="pb-3">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-2">
                                    <img src={comment.profileImage} alt="User profile" className="w-10 h-10 rounded-full" />
                                    <h3 className="font-bold">{comment.username}</h3>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex gap-3 items-center">
                                        <button className="text-green-500 text-sm font-medium cursor-pointer">Approve</button>
                                        <button className="text-red-500 text-sm font-medium cursor-pointer">Delete</button>
                                        {/* <div className="flex items-center gap-1">
                                            <i className="bi bi-hand-thumbs-up text-xl text-gray-600"></i>
                                            <span>{comment.likes}</span>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                            <p className="my-2">{comment.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CommentModal;
