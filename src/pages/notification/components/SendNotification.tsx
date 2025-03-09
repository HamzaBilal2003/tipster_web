import React, { useState, useEffect } from "react";
import NotificationForm from "./NotificationForm";
import AudienceModal from "./AudienceModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiCall } from "../../../../util/cutomApiCall";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { API_ENDPOINTS } from "../../../../util/apiConfig";

interface User {
  id: number;
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

interface SendNotificationProps {
  editNotification?: NotificationData | null;
  resetEditMode: () => void;
}

// **Mutation Function for Sending Notifications**
const useSendNotification = () => {
  const queryClient = useQueryClient();
  const token = Cookies.get("authToken");

  return useMutation({
    mutationKey: ["sendNotification"],
    mutationFn: async (formData: FormData) => {
      return await apiCall({
        url: API_ENDPOINTS.Notifcation.create,
        method: "POST",
        data: formData,
        token: token,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      toast.success("Notification sent successfully!");
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error) => {
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        Object.keys(errors).forEach((key) => {
          toast.error(errors[key][0]);
        });
      } else {
        toast.error(error.message || "Failed to send notification.");
      }
    },
  });
};

const SendNotification: React.FC<SendNotificationProps> = ({
  editNotification,
  resetEditMode,
}) => {
  const sendNotification = useSendNotification();
  const [audienceSelectdata, setaudienceSelectdata] = useState<number[]>([]);

  const allUsers: User[] = [
    { id: 1, name: "Alucard", avatar: "https://via.placeholder.com/150" },
    { id: 2, name: "Sarah", avatar: "https://via.placeholder.com/150" },
  ];

  const [notification, setNotification] = useState<NotificationData>({
    heading: "",
    content: "",
    audience: [],
    attachment: null,
  });

  const [showAudienceModal, setShowAudienceModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [tempSelectedUsers, setTempSelectedUsers] = useState<User[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (editNotification) {
      setNotification(editNotification);
      setSelectedUsers(editNotification.audience || []);
    }
  }, [editNotification]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNotification((prev) => ({ ...prev, [name]: value }));
  };

  const openAudienceModal = () => {
    setTempSelectedUsers([...selectedUsers]);
    setShowAudienceModal(true);
    setaudienceSelectdata(selectedUsers.map((item) => item.id));
    setSelectAll(allUsers.length === selectedUsers.length && selectedUsers.length > 0);
  };

  const closeAudienceModal = () => {
    setShowAudienceModal(false);
  };

  const applyAudienceSelection = () => {
    setSelectedUsers([...tempSelectedUsers]);
    setNotification((prev) => ({ ...prev, audience: tempSelectedUsers }));
    setaudienceSelectdata(tempSelectedUsers.map(user => user.id));
    setShowAudienceModal(false);
  };

  // **Handle Submit & Call API**
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!notification.content.trim()) {
      toast.error("The message field is required.");
      return;
    }

    if (selectedUsers.length === 0) {
      toast.error("At least one user must be selected.");
      return;
    }

    const formData = new FormData();
    formData.append("message", notification.content);
    formData.append("heading", notification.heading);
    
    // Properly append user_ids as an array
    audienceSelectdata.forEach((userId, index) => {
      formData.append(`user_ids[${index}]`, userId.toString());
    });

    if (selectedFile) {
      formData.append("attachment", selectedFile);
    }

    sendNotification.mutate(formData, {
      onSuccess: () => {
        resetForm();
      },
    });
  };

  // Reset Form
  const resetForm = () => {
    setNotification({
      heading: "",
      content: "",
      audience: [],
      attachment: null,
    });
    setSelectedUsers([]);
    setSelectedFile(null);
    setaudienceSelectdata([]);
    resetEditMode();
  };

  // Handle File Upload
  const handleAttachmentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      if (!allowedTypes.includes(file.type)) {
        toast.error("Invalid file type. Allowed: jpg, png, pdf, doc, docx");
        return;
      }

      setSelectedFile(file);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md shadow-gray-400 w-full">
      <form onSubmit={handleSubmit} className="p-6">
        <h1 className="text-2xl font-medium mb-6">
          {editNotification ? "Update Notification" : "Send New Notification"}
        </h1>

        <NotificationForm
          notification={notification}
          handleInputChange={handleInputChange}
          openAudienceModal={openAudienceModal}
          selectedUsers={selectedUsers}
          handleAttachmentUpload={handleAttachmentUpload}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-[#A52A2A] text-white rounded-lg hover:bg-[#a52a2abe] cursor-pointer transition-colors font-medium"
          disabled={sendNotification.isPending}
        >
          {sendNotification.isPending
            ? "Sending..."
            : editNotification
            ? "Update Notification"
            : "Send Notification"}
        </button>
      </form>

      {/* Audience Modal */}
      <AudienceModal
        showModal={showAudienceModal}
        closeModal={closeAudienceModal}
        applySelection={applyAudienceSelection}
        allUsers={allUsers}
        tempSelectedUsers={tempSelectedUsers}
        selectAll={selectAll}
        toggleSelectAll={() => {
          const newSelectAll = !selectAll;
          setSelectAll(newSelectAll);
          setTempSelectedUsers(newSelectAll ? [...allUsers] : []);
        }}
        toggleUserSelection={(userId) =>
          setTempSelectedUsers((prev) =>
            prev.some((user) => user.id === userId)
              ? prev.filter((user) => user.id !== userId)
              : [...prev, allUsers.find((user) => user.id === userId)!]
          )
        }
        isUserSelected={(userId) =>
          tempSelectedUsers.some((user) => user.id === userId)
        }
      />
    </div>
  );
};

export default SendNotification;