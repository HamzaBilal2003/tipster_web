import React, { useState } from "react";
import CommentModal from "./CommentModal";
import { API_DOMAIN, API_DOMAIN_images } from "../../../../util/apiConfig";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Cookies from "js-cookie";
import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { approvePost, DeletePost } from "../../../../util/queries/PostQueries";
import { toast } from "react-toastify";


interface PostProps {
    id: number;
    user: {
        id: number;
        username: string;
        profile_picture: string | null;
    };
    timestamp: string;
    content: string;
    type: string;
    likes_count: number;
    comments_count: number;
    share_count: number;
    view_count: number;
    recent_comments: any[];
    image_1?: string;
    image_2?: string;
    image_3?: string;
    image_4?: string;
    image_5?: string;
    image_6?: string;
    image_7?: string;
    image_8?: string;
    image_9?: string;
    image_10?: string;
}

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
    console.log("post from right column", post);

    function extractImages(post: PostProps): string[] {
        return Object.keys(post)
            .filter(key => key.startsWith("image_") && post[key as keyof PostProps]) // Ignore empty, null, or undefined values
            .map(key => post[key as keyof PostProps] as string); // Convert filtered keys to an array of values
    }
    const PostImages = extractImages(post);

    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
    const [isSliderOpen, setIsSliderOpen] = useState(false);
    const token = Cookies.get('authToken');
    const queryClient = useQueryClient()

    const [isApploading, setisApploading] = useState(false);
    const [isdelLoading, setisdelLoading] = useState(false)
    
    const { isLoading: isApproveLoading, error: approveError, refetch: fetchApprove } = useQuery({
        queryKey: ['approvePost'],
        queryFn: () => approvePost(token, post.id),
        enabled: false,
    });
    const { isLoading: isDeleteLoading, error: deleteError, refetch: fetchDelete } = useQuery({
        queryKey: ['deletePost'],
        queryFn: () => DeletePost(token, post.id),
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
                queryClient.invalidateQueries({ queryKey: ['allPostData'] });
                setisdelLoading(isDeleteLoading);
            }
        });
    }

    const handleApprove = () => {
        if (!token) {
            toast.error("Authentication token is missing");
            return;
        }
        setisApploading(true)
        toast.info('Wait!! Post is approving...')
        fetchApprove().then(({ error }) => {
            if (error) {
                toast.error("Something went wrong");
                setisApploading(isApproveLoading);
                return;
            }
            if (!isApproveLoading && !approveError) {
                toast.success("Post approved successfully");
                queryClient.invalidateQueries({ queryKey: ['allPostData'] });
                setisApploading(isApproveLoading);
            }
        });
    }

    const renderImages = () => {
        if (!PostImages || PostImages.length === 0) return null;

        const displayedImages = PostImages.slice(0, 4);
        const remainingImages = PostImages.length - 4;

        return (
            <div className="grid grid-cols-2 gap-[5px] mt-3">
                {displayedImages.map((image, index) => (
                    <div key={index} className="relative w-full h-28 cursor-pointer" onClick={() => setIsSliderOpen(true)}>
                        <img src={API_DOMAIN_images + image} alt={`attachment-${index}`} className="w-full h-full object-cover rounded-md" />
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
                        <img src={API_DOMAIN_images + post.user.profile_picture} alt="User profile" className="w-16 h-16 rounded-full" />
                        <div>
                            <h1 className="text-lg font-bold">{post.user.username}</h1>
                            <h6 className="text-[#00000080] text-sm">{post.timestamp}</h6>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button className="text-green-500 font-medium cursor-pointer" onClick={()=>handleApprove()} disabled={isApploading}>{isApploading ? 'Approving...' :  'Approve'}</button>
                        <button className="text-red-500 font-medium cursor-pointer" onClick={()=>handleDelete()} disabled={isdelLoading}>{isdelLoading ? "Deleting..." : 'Delete'}</button>
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
                        <span>{post.likes_count}</span>
                    </div>
                    <div
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => setIsCommentModalOpen(true)}
                    >
                        <i className="bi bi-chat text-xl"></i>
                        <span>{post.comments_count}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <i className="bi bi-share text-xl"></i>
                        <span>{post.share_count}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <i className="bi bi-eye text-xl"></i>
                        <span>{post.view_count}</span>
                    </div>
                </div>
            </div>

            {/* Comment Modal */}
            <CommentModal isOpen={isCommentModalOpen} onClose={() => setIsCommentModalOpen(false)} comments={post.recent_comments} />

            {/* Swiper Image Slider Modal */}
            {isSliderOpen && (
                <div className="fixed inset-0 bg-[#00000061] bg-opacity-70 flex items-center justify-center z-[1000]">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl relative">
                        <button className="absolute top-3 z-[999] cursor-pointer right-3 text-2xl font-bold text-gray-600" onClick={() => setIsSliderOpen(false)}>
                            <i className="bi bi-x-circle text-2xl"></i>
                        </button>
                        <Swiper
                            navigation
                            pagination={{ clickable: true }}
                            modules={[Navigation, Pagination]}
                            className="w-full h-96"
                        >
                            {PostImages.map((image, index) => (
                                <SwiperSlide key={index}>
                                    <img
                                        src={API_DOMAIN_images + image}
                                        alt={`slider-image-${index}`}
                                        className="w-full h-full object-contain rounded-lg"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            )}
        </>
    );
};

export default Post;
