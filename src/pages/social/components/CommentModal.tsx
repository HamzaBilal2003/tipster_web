import React from "react";
import { API_DOMAIN_images } from "../../../../util/apiConfig";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApproveComment, DeleteComment, DeletePost } from "../../../../util/queries/PostQueries";
import Cookies from "js-cookie";

interface Comment {
    id: string;
    user: {
        id: string;
        username: string;
        profile_picture: string | null;
    };
    status: string;
    content: string;
}

interface CommentModalProps {
    isOpen: boolean;
    onClose: () => void;
    comments: Comment[];
}

const CommentModal: React.FC<CommentModalProps> = ({ isOpen, onClose, comments }) => {
    if (!isOpen) return null;
    const token = Cookies.get('authToken');
    const queryClient = useQueryClient(); // For updating the cache

    // Mutation for approving a comment
    const approveMutation = useMutation({
        mutationFn: (commentId: string) => ApproveComment(token, commentId),
        onSuccess: () => {
            queryClient.invalidateQueries(['comments']); // Refetch comments after approval
            alert('Comment approved successfully!');
        },
    });

    // Mutation for deleting a comment
    const deleteMutation = useMutation({
        mutationFn: (commentId: string) => DeleteComment(token, commentId),
        onSuccess: () => {
            queryClient.invalidateQueries(['comments']); // Refetch comments after deletion
            alert('Comment deleted successfully!');
        },
    });

    return (
        <div className="fixed inset-0 bg-[#00000061] bg-opacity-50 flex items-center justify-center z-[1000]">
            <div className="bg-white min-w-md p-5 rounded-lg shadow-lg relative">
                <div className="border-b border-gray-400 flex items-center justify-between gap-4 pb-4">
                    <h2 className="text-xl font-bold">Comments ({comments.length})</h2>
                    {/* Close Button */}
                    <button className="cursor-pointer" onClick={onClose}>
                        <i className="bi bi-x-circle text-xl"></i>
                    </button>
                </div>

                {/* Comment List */}
                <div className="space-y-4 max-h-[400px] overflow-y-auto px-2 specific-scroll py-4">
                    {comments.map((comment) => (
                        <div key={comment.id} className="pb-3">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-2">
                                    <img
                                        src={API_DOMAIN_images + comment.user.profile_picture}
                                        alt="User profile"
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <h3 className="font-bold">{comment.user.username}</h3>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex gap-3 items-center">
                                       {
                                        comment.status=='under_review' &&
                                        <button
                                        className="text-green-500 text-sm font-medium cursor-pointer"
                                        onClick={() => approveMutation.mutate(comment.id)}
                                        // disabled={approveMutation.isLoading}
                                    >
                                        Approve
                                        {/* {approveMutation.isLoading ? "Approving..." : "Approve"} */}
                                    </button>
                                       }
                                        <button
                                            className="text-red-500 text-sm font-medium cursor-pointer"
                                            onClick={() => deleteMutation.mutate(comment.id)}
                                            // disabled={deleteMutation.isLoading}
                                        >
                                            Delete
                                            {/* {deleteMutation.isLoading ? "Deleting..." : "Delete"} */}
                                        </button>
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
