import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddPost } from "../../../../util/mutations/PostQueries";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import BtnLoader from "../../../components/btnLoader";
import { useLocation } from "react-router-dom";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  // onSubmit: (post: { content: string; images: File[]; type: string }) => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, onClose }) => {
  const CustomQueryKey = useLocation().pathname.substring(0, 5) == '/user' ? 'usersProfile' : 'allPostData';
  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [postType, setPostType] = useState("post");

  const queryClient = useQueryClient();
  const token = Cookies.get("authToken");

  const { mutate: addPostMutation, isPending } = useMutation({
    mutationFn: (formData: FormData) => AddPost(formData, token || ""),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CustomQueryKey] });
      toast.success("Post created successfully!");
      onClose();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error.message || "Failed to create post.");
    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files);
      setImages(prev => [...prev, ...newImages]);
    }
  };

  const handleSubmit = () => {
    if (content.trim() === "") return;

    const formData = new FormData();
    formData.append("content", content);
    formData.append("type", 'announcement');
    formData.append("status", 'approved');
    images.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });

    addPostMutation(formData);
    // setContent("");
    // setImages([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#00000052] bg-opacity-50 flex items-center justify-center z-[1000]">
      <div className="bg-white w-[500px] p-5 rounded-lg shadow-lg relative">
        <h2 className="text-xl font-bold mb-4">Create New Post</h2>

        {/* Post Input */}
        <label className="block text-lg mb-2">Type Post</label>
        <textarea
          className="w-full p-3 bg-gray-100 rounded-lg min-h-32 focus:outline-none"
          placeholder="Type here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {/* Image Upload */}
        <div className="flex gap-2 mt-3">
          <label className="w-12 h-12 bg-gray-100 flex items-center justify-center rounded-lg cursor-pointer">
            <i className="bi bi-image text-xl text-gray-500"></i>
            <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} />
          </label>

          {/* Uploaded Images Preview */}
          {images.slice(0, 3).map((img, index) => (
            <div key={index} className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
              <img src={URL.createObjectURL(img)} alt={`upload-${index}`} className="w-full h-full object-cover" />
            </div>
          ))}

          {images.length > 3 && (
            <div className="w-12 h-12 bg-gray-300 flex items-center justify-center rounded-lg text-gray-600 text-sm">
              +{images.length - 3}
            </div>
          )}
        </div>

        {/* Post Type Selection */}
        {/* <label className="block text-lg mb-2 mt-4">Post Type</label>
        <select
          className="w-full p-3 bg-gray-100 rounded-lg focus:outline-none"
          value={postType}
          onChange={(e) => setPostType(e.target.value)}
        >
          <option value="post">Post</option>
          <option value="announcement">Announcement</option>
        </select> */}

        {/* Buttons */}
        <div className="mt-5">
          <button
            className="w-full py-3 bg-red-700 text-white rounded-lg font-medium"
            onClick={handleSubmit}
            disabled={isPending}
          >
            {isPending ? <BtnLoader /> : "Send Post"}
          </button>
        </div>

        {/* Close Button */}
        <button className="cursor-pointer absolute top-2 right-2 text-gray-500 hover:text-black" onClick={onClose}>
          <i className="bi bi-x-circle text-2xl"></i>
        </button>
      </div>
    </div>
  );
};

export default CreatePostModal;