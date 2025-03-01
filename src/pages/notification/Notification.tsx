import React, { useState, useEffect } from 'react';
import SendNotification from './components/SendNotification';
import TableFiltersCan from '../../components/TableFiltersCan';
import Dropdown from '../../components/DropDown';
import ItemGap from '../../components/ItemGap';
import SearchFilter from '../../components/SearchFilter';
import TableCan from '../../components/TableCan';
import NotificationRow from './components/NotificationRow';
import NotifcationCan from './components/NotifcationCan';

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
const Notification = () => {
  // State for notifications
  const [notifications, setNotifications] = useState<NotificationData[]>([
    {
      id: '1',
      heading: 'Welcome to the platform',
      content: 'User 1 logged in',
      timestamp: '26-2-2025 / 12:30 PM',
      attachment: [],
      audience: []
    },
    {
      id: '2',
      heading: 'Session ended',
      content: 'User 2 logged out',
      timestamp: '26-2-2025 / 11:45 PM',
      attachment: [],
      audience: []
    }
  ]);
  const notificationHistory = [
    { id: "1", user: "Alucard", action: "just created a post", timestamp: "11:22 AM" },
    { id: "2", user: "Alucard", action: "just created a post", timestamp: "11:22 AM" },
    { id: "3", user: "Alucard", action: "just created a post", timestamp: "11:22 AM" },
    { id: "4", user: "Alucard", action: "just created a post", timestamp: "11:22 AM" },
    { id: "5", user: "Alucard", action: "just created a post", timestamp: "11:22 AM" },
    { id: "4", user: "Alucard", action: "just created a post", timestamp: "11:22 AM" },
    { id: "5", user: "Alucard", action: "just created a post", timestamp: "11:22 AM" },
    { id: "4", user: "Alucard", action: "just created a post", timestamp: "11:22 AM" },
    { id: "5", user: "Alucard", action: "just created a post", timestamp: "11:22 AM" },
    { id: "4", user: "Alucard", action: "just created a post", timestamp: "11:22 AM" },
    { id: "5", user: "Alucard", action: "just created a post", timestamp: "11:22 AM" },
    { id: "4", user: "Alucard", action: "just created a post", timestamp: "11:22 AM" },
    { id: "5", user: "Alucard", action: "just created a post", timestamp: "11:22 AM" },
  ];

  // State for filtering and searching
  const [filteredNotifications, setFilteredNotifications] = useState<NotificationData[]>(notifications);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  // State for editing
  const [editNotification, setEditNotification] = useState<NotificationData | null>(null);

  // Filter options
  const BulkAction = [
    { name: "Export CSV", value: "csv", },
    { name: "Export PDF", value: "pdf", },
    { name: "Delete All", value: "delete", danger: true },
  ];

  const DateDropOptions = [
    { name: "Today", value: "today" },
    { name: "Yesterday", value: "yesterday" },
    { name: "Last 7 Days", value: "last-7-days" },
    { name: "Last 30 Days", value: "last-30-days" },
    { name: "Last 60 Days", value: "last-60-days" },
  ];

  // Apply filters when dependencies change
  useEffect(() => {
    let result = [...notifications];
    if (searchTerm) {
      result = result.filter(
        notification =>
          notification.heading.toLowerCase().includes(searchTerm.toLowerCase()) ||
          notification.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredNotifications(result);
  }, [notifications, searchTerm, dateFilter]);

  // Handle filter changes
  const handleFilter = (value: any) => {
    console.log(value);
  };


  // CRUD Operations
  const handleAddNotification = (notification: NotificationData) => {
    const newNotification = {
      ...notification,
      id: notification.id || Date.now().toString(),
    };

    setNotifications(prev => [newNotification, ...prev]);
  };

  const handleEditNotification = (notification: NotificationData) => {
    setEditNotification(notification);
  };

  const handleUpdateNotification = (updatedNotification: NotificationData) => {
    setNotifications(prev =>
      prev.map(item =>
        item.id === updatedNotification.id ? updatedNotification : item
      )
    );
  };

  const handleDeleteNotification = (id: string) => {
    if (confirm('Are you sure you want to delete this notification?')) {
      setNotifications(prev => prev.filter(item => item.id !== id));
    }
  };

  const resetEditMode = () => {
    setEditNotification(null);
  };

  // Handle form submission (create or update)
  const handleSubmit = (notification: NotificationData) => {
    if (notification.id) {
      handleUpdateNotification(notification);
    } else {
      handleAddNotification(notification);
    }
  };

  return (
    <div className='flex flex-col gap-8'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <SendNotification
          onSubmit={handleSubmit}
          editNotification={editNotification}
          resetEditMode={resetEditMode}
        />
        <NotifcationCan notifications={notificationHistory}/>
      </div>

      <TableFiltersCan>
        <ItemGap>
          <Dropdown
            options={DateDropOptions}
            onChange={handleFilter}
            placeholder="Date"
            position='left-0'
          />
          <Dropdown
            options={BulkAction}
            onChange={handleFilter}
            placeholder="Bulk Action"
            position='left-0'
          />
        </ItemGap>
        <SearchFilter
          Placeholder='Search Notification'
          handleFunction={handleFilter}
        />
      </TableFiltersCan>

      <TableCan
        headerTr={["Notification", "Date", "Attachment", "Action"]}
        dataTr={filteredNotifications}
        headerAlign='left'
        TrName={NotificationRow}
        trNameProps={{
          onEdit: handleEditNotification,
          onDelete: handleDeleteNotification
        }}
      />
    </div>
  );
};

export default Notification;