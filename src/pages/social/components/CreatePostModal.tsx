import React, { useState } from "react";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (post: { content: string; images: string[] }) => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [content, setContent] = useState("");
  const [images, setImages] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImages]);
    }
  };

  const handleSubmit = () => {
    if (content.trim() === "") return;
    onSubmit({ content, images });
    setContent("");
    setImages([]);
    onClose();
  };

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
              <img src={img} alt={`upload-${index}`} className="w-full h-full object-cover" />
            </div>
          ))}

          {images.length > 3 && (
            <div className="w-12 h-12 bg-gray-300 flex items-center justify-center rounded-lg text-gray-600 text-sm">
              +{images.length - 3}
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-5">
          <button className="w-full py-3 bg-red-700 text-white rounded-lg font-medium" onClick={handleSubmit}>
            Send Post
          </button>
        </div>

        {/* Close Button */}
        <button className="absolute top-2 right-2 text-gray-500 hover:text-black" onClick={onClose}>
          ✖
        </button>
      </div>
    </div>
  );
};

export default CreatePostModal;
