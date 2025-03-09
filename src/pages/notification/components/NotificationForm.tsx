import React from "react";

interface User {
  id: string;
  name: string;
  avatar: string;
  selected?: boolean;
}

interface NotificationData {
  id?: string;
  heading: string;
  content: string;
  audience: User[];
  timestamp?: string;
  attachment?: File | null;
}

interface Errors {
  user_ids?: string[];
  message?: string[];
  attachment?: string[];
}

interface NotificationFormProps {
  notification: NotificationData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  openAudienceModal: () => void;
  selectedUsers: User[];
  handleAttachmentUpload: (file: File) => void;
  errors?: Errors;
}

const NotificationForm: React.FC<NotificationFormProps> = ({
  notification,
  handleInputChange,
  openAudienceModal,
  selectedUsers,
  handleAttachmentUpload,
  errors = {},
}) => {
  return (
    <>
      {/* Heading */}
      <div className="mb-6">
        <label htmlFor="heading" className="block text-lg mb-2">Heading</label>
        <input
          type="text"
          id="heading"
          name="heading"
          value={notification.heading}
          onChange={handleInputChange}
          placeholder="Enter heading"
          className="w-full p-3 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Content */}
      <div className="mb-6">
        <label htmlFor="content" className="block text-lg mb-2">Message</label>
        <textarea
          id="content"
          name="content"
          value={notification.content}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="w-full p-3 bg-gray-200 rounded-lg min-h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message[0]}</p>}
      </div>

      {/* Attachment Upload */}
      <div className="mb-6">
        <label htmlFor="camera-upload" className="p-4 px-6 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer">
          <i className="bi bi-camera text-xl" />
          <input
            type="file"
            id="camera-upload"
            accept=".jpg,.png,.pdf,.doc,.docx"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleAttachmentUpload(e.target.files[0]);
              }
            }}
          />
        </label>
        {errors.attachment && <p className="text-red-500 text-sm mt-1">{errors.attachment[0]}</p>}
      </div>

      {/* Image Preview */}
      {notification.attachment && (
        <div className="mb-6">
          <label className="block text-lg mb-2">Attachment Preview</label>
          <div className="flex flex-wrap gap-2">
            <img src={URL.createObjectURL(notification.attachment)} alt="Attachment" className="w-16 h-16 rounded-lg border" />
          </div>
        </div>
      )}

      {/* Audience */}
      <div className="mb-6">
        <label className="block text-lg mb-2">Audience</label>
        <div
          className="w-full p-3 bg-gray-200 rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-300 transition-colors"
          onClick={openAudienceModal}
        >
          {selectedUsers.length > 0 ? (
            <div className="flex items-center">
              <div className="flex -space-x-2">
                {selectedUsers.slice(0, 3).map((user, index) => (
                  <img key={user.id} src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full border-2 border-white" style={{ zIndex: 3 - index }} />
                ))}
              </div>
              {selectedUsers.length > 3 && <span className="ml-2 text-gray-700">+ {selectedUsers.length - 3} Others</span>}
            </div>
          ) : (
            <span className="text-gray-500">Select audience</span>
          )}
          <i className="bi bi-chevron-down text-lg"></i>
        </div>
        {errors.user_ids && <p className="text-red-500 text-sm mt-1">{errors.user_ids[0]}</p>}
      </div>
    </>
  );
};

export default NotificationForm;
