import React, { useState } from "react";
import Dropdown from "../../../components/DropDown";
import { API_DOMAIN_images } from "../../../../util/apiConfig";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { approvePost, DeletePost } from "../../../../util/queries/PostQueries";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  postData: {
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
  };
}

const PostModal: React.FC<PostModalProps> = ({ isOpen, onClose, postData }) => {
  console.log("Post data : ", postData);

  const token = Cookies.get("authToken");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [PostImages, setPostImages] = useState<string[]>([]);
  const queryClient = useQueryClient();

  // Mutation for approving post
  const { mutate: handleApprove, isPending: isApproveLoading } = useMutation({
    mutationKey: ["approvePost"],
    mutationFn: () => approvePost(token, postData.id),
    onSuccess: () => {
      toast.success("Post approved successfully");
      queryClient.invalidateQueries({ queryKey: ["allPostData"] });
      onClose();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Mutation for deleting post
  const { mutate: handleDelete, isPending: isDeleteLoading } = useMutation({
    mutationKey: ["deletePost"],
    mutationFn: () => DeletePost(token, postData.id),
    onSuccess: () => {
      toast.success("Post deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["allPostData"] });
      onClose();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Function to run on Save button click
  const handleSubmit = () => {
    if (selectedStatus === "approved") {
      handleApprove();
    } else if (selectedStatus === "delete") {
      handleDelete();
    }
  };

  // Extract and Render Images
  const renderImages = () => {
    const imageUrls = Object.keys(postData)
      .filter((key) => key.startsWith("image_") && postData[key])
      .map((key) => postData[key]);

    if (imageUrls.length === 0) return null;

    const displayedImages = imageUrls.slice(0, 4);
    const remainingImages = imageUrls.length > 4 ? imageUrls.length - 4 : 0;

    return (
      <div className="grid grid-cols-2 gap-[5px] mt-3">
        {displayedImages.map((image, index) => (
          <div
            key={index}
            className="relative w-full h-28 cursor-pointer"
            onClick={() => {
              setPostImages(imageUrls);
              setIsSliderOpen(true);
            }}
          >
            <img
              src={API_DOMAIN_images + image}
              alt={`attachment-${index}`}
              className="w-full h-full object-cover rounded-md"
            />
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

  if (!isOpen) return null;

  return (
    <>
      {/* Post Modal */}
      <div className="fixed inset-0 bg-[#0000004d] bg-opacity-50 py-[50px] z-[1000] overflow-auto">
        <div className="bg-white rounded-lg w-full max-w-md mx-auto overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-bold">Post Details</h2>
            <button onClick={onClose} className="cursor-pointer p-1 rounded-full hover:bg-gray-200">
              <i className="bi bi-x-circle text-xl"></i>
            </button>
          </div>
          {/* Post Content */}
          <div className="p-4 space-y-6">
            <div className="bg-gray-100 p-4 rounded-lg">
              {postData.user && <div className="flex items-center gap-2">
                <img src={API_DOMAIN_images + postData.user.profile_picture} alt="" className="w-10 h-10 rounded-full" />
                <div className="">
                  <h1>{postData.user.username}</h1>
                </div>
              </div>}
              <p className="mt-2 text-black">{postData?.content}</p>
              {renderImages()}
            </div>

            {/* Approval Status */}
            <div className="space-y-2">
              <label className="block text-gray-700 font-medium">Approval Status</label>
              <Dropdown
                FullWidth={true}
                isNotActiveBg={true}
                options={[
                  { name: "Approved", value: "approved" },
                  { name: "Delete", value: "delete" },
                ]}
                onChange={(value) => setSelectedStatus(value)}
                placeholder={postData?.status}
                borderColor="gray-300"
              />
            </div>

            {/* Save Button */}
            <button
              onClick={handleSubmit}
              className={`w-full cursor-pointer py-3 text-white rounded-lg font-medium transition-colors ${selectedStatus === "delete" ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
                }`}
              disabled={isApproveLoading || isDeleteLoading}
            >
              {isApproveLoading || isDeleteLoading ? "Processing..." : "Save"}
            </button>
          </div>
        </div>
      </div>

      {/* Image Slider Modal */}
      {isSliderOpen && (
        <div className="fixed inset-0 bg-[#00000061] bg-opacity-70 flex items-center justify-center z-[1000]">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl relative">
            <button
              className="absolute top-3 z-[999] cursor-pointer right-3 text-2xl font-bold text-gray-600"
              onClick={() => setIsSliderOpen(false)}
            >
              <i className="bi bi-x-circle text-2xl"></i>
            </button>
            <Swiper navigation pagination={{ clickable: true }} modules={[Navigation, Pagination]} className="w-full h-96">
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

export default PostModal;
