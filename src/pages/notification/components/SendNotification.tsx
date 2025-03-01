import React, { useState, useEffect } from 'react';
import NotificationForm from './NotificationForm';
import AudienceModal from './AudienceModal';

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
    attachment?: string[];
}

interface SendNotificationProps {
    onSubmit: (notification: NotificationData) => void;
    editNotification?: NotificationData | null;
    resetEditMode: () => void;
}

const SendNotification: React.FC<SendNotificationProps> = ({
    onSubmit,
    editNotification,
    resetEditMode
}) => {
    // Sample users data
    const allUsers: User[] = [
        { id: '1', name: 'Alucard', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80' },
        { id: '2', name: 'Sarah', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80' },
    ];

    // State for notification form
    const [notification, setNotification] = useState<NotificationData>({
        heading: '',
        content: '',
        audience: [],
        attachment: []
    });

    // State for audience modal
    const [showAudienceModal, setShowAudienceModal] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
    const [tempSelectedUsers, setTempSelectedUsers] = useState<User[]>([]);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedImages, setSelectedImages] = useState<string[]>([]);

    // Effect to handle edit mode
    useEffect(() => {
        if (editNotification) {
            setNotification(editNotification);
            setSelectedUsers(editNotification.audience || []);
        }
    }, [editNotification]);

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNotification(prev => ({ ...prev, [name]: value }));
    };

    // Open audience modal
    const openAudienceModal = () => {
        setTempSelectedUsers([...selectedUsers]);
        setShowAudienceModal(true);
        setSelectAll(allUsers.length === selectedUsers.length && selectedUsers.length > 0);
    };

    // Close audience modal
    const closeAudienceModal = () => {
        setShowAudienceModal(false);
    };

    // Apply audience selection
    const applyAudienceSelection = () => {
        setSelectedUsers([...tempSelectedUsers]);
        setNotification(prev => ({ ...prev, audience: tempSelectedUsers }));
        setShowAudienceModal(false);
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Set notification only on submit
        const notificationToSubmit = {
            ...notification,
            audience: selectedUsers,
            attachment: selectedImages, // Use selectedImages instead of directly modifying notification
            timestamp: new Date().toLocaleString('en-US', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            }).replace(',', ' /'),
        };

        // Pass to parent component
        onSubmit(notificationToSubmit);

        // Reset form after submission
        setNotification({
            heading: '',
            content: '',
            audience: [],
            attachment: []
        });

        setSelectedUsers([]);
        setSelectedImages([]); // Clear selected images

        // Reset edit mode in parent
        resetEditMode();
    };

    // Handle image upload (Store images in selectedImages, not directly in notification)
    const handleAttachmentUpload = (file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setSelectedImages(prev => [...prev, reader.result as string]); // Store separately
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="bg-white rounded-lg shadow-md shadow-gray-400 w-full">
            <form onSubmit={handleSubmit} className="p-6">
                <h1 className="text-2xl font-medium mb-6">
                    {editNotification ? 'Update Notification' : 'Send New Notification'}
                </h1>

                <NotificationForm
                    notification={notification}
                    handleInputChange={handleInputChange}
                    openAudienceModal={openAudienceModal}
                    selectedUsers={selectedUsers}
                    handleAttachmentUpload={handleAttachmentUpload}
                />

                {/* Submit button */}
                <button
                    type="submit"
                    className="w-full py-3 bg-[#A52A2A] text-white rounded-lg hover:bg-[#a52a2abe] cursor-pointer transition-colors font-medium"
                >
                    {editNotification ? 'Update Notification' : 'Send Notification'}
                </button>
            </form>

            <AudienceModal
                showModal={showAudienceModal}
                closeModal={closeAudienceModal}
                applySelection={applyAudienceSelection}
                allUsers={allUsers}
                tempSelectedUsers={tempSelectedUsers}
                selectAll={selectAll}
                toggleSelectAll={() => setSelectAll(!selectAll)}
                toggleUserSelection={(userId) =>
                    setTempSelectedUsers((prev) =>
                        prev.some(user => user.id === userId)
                            ? prev.filter(user => user.id !== userId)
                            : [...prev, allUsers.find(user => user.id === userId)!]
                    )
                }
                isUserSelected={(userId) => tempSelectedUsers.some(user => user.id === userId)}
            />
        </div>
    );
};

export default SendNotification;
