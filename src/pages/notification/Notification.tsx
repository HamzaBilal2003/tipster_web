import React, { useState } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import SendNotification from './components/SendNotification';
import TableFiltersCan from '../../components/TableFiltersCan';
import Dropdown from '../../components/DropDown';
import ItemGap from '../../components/ItemGap';
import SearchFilter from '../../components/SearchFilter';
import TableCan from '../../components/TableCan';
import NotificationRow from './components/NotificationRow';
import NotifcationCan from './components/NotifcationCan';
import { fetchNotifications, fetchAppActivities, Notification, AppActivity } from '../../../util/mutations/notification';
import { toast } from 'react-toastify';

const Notifications = () => {
  const [currentDateFilter, setCurrentDateFilter] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [editNotification, setEditNotification] = useState<Notification | null>(null);
  const queryClient = useQueryClient();

  // Fetch notifications
  const { data: notifications, isLoading: isLoadingNotifications } = useQuery({
    queryKey: ['notifications'],
    queryFn: fetchNotifications
  });

  // Fetch app activities
  const { data: activities, isLoading: isLoadingActivities } = useQuery({
    queryKey: ['activities'],
    queryFn: fetchAppActivities
  });


  const DateDropOptions = [
    { name: "Today", value: "today" },
    { name: "Yesterday", value: "yesterday" },
    { name: "Last 7 Days", value: "last-7-days" },
    { name: "Last 30 Days", value: "last-30-days" },
    { name: "Last 60 Days", value: "last-60-days" },
  ];

  const BulkAction = [
    { name: "Export CSV", value: "csv" },
    { name: "Export PDF", value: "pdf" },
    { name: "Delete All", value: "delete", danger: true },
  ];

  const filterNotifications = (data: Notification[]) => {
    if (!data) return [];

    let filtered = [...data];

    // Apply date filter
    if (currentDateFilter) {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      switch (currentDateFilter) {
        case 'today':
          filtered = filtered.filter(item => {
            const itemDate = new Date(item.created_at);
            return itemDate >= today;
          });
          break;
        case 'yesterday':
          const yesterday = new Date(today);
          yesterday.setDate(yesterday.getDate() - 1);
          filtered = filtered.filter(item => {
            const itemDate = new Date(item.created_at);
            return itemDate >= yesterday && itemDate < today;
          });
          break;
        case 'last-7-days':
          const sevenDaysAgo = new Date(today);
          sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
          filtered = filtered.filter(item => {
            const itemDate = new Date(item.created_at);
            return itemDate >= sevenDaysAgo;
          });
          break;
        case 'last-30-days':
          const thirtyDaysAgo = new Date(today);
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
          filtered = filtered.filter(item => {
            const itemDate = new Date(item.created_at);
            return itemDate >= thirtyDaysAgo;
          });
          break;
        case 'last-60-days':
          const sixtyDaysAgo = new Date(today);
          sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);
          filtered = filtered.filter(item => {
            const itemDate = new Date(item.created_at);
            return itemDate >= sixtyDaysAgo;
          });
          break;
      }
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.triggered_by_username.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const handleFilter = (value: string) => {
    if (DateDropOptions.some(option => option.value === value)) {
      setCurrentDateFilter(value);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleEdit = (notification: Notification) => {
    setEditNotification(notification);
  };

  const handleDelete = async (id: number) => {
    // if (window.confirm('Are you sure you want to delete this notification?')) {
    //   await deleteMutation.mutateAsync(id);
    // }
    toast.success('Deleted successfullY')
  };

  const handleSubmit = async (notification: number) => {
    // if (notification.id) {
    //   await updateMutation.mutateAsync({
    //     id: notification.id,
    //     notification
    //   });
    // }
    // setEditNotification(null);
    toast.success('Deleted successfully')
  };

  const filteredNotifications = notifications?.data ? filterNotifications(notifications.data) : [];
  const formattedActivities = activities?.data?.map((activity: AppActivity) => ({
    id: activity.id.toString(),
    user: activity.user.username,
    action: activity.activity,
    timestamp: new Date(activity.created_at).toLocaleTimeString()
  })) || [];

  return (
    <div className='flex flex-col gap-8'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <SendNotification
          onSubmit={handleSubmit}
          editNotification={editNotification}
          resetEditMode={() => setEditNotification(null)}
        />
        <NotifcationCan notifications={formattedActivities} />
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
          handleFunction={handleSearch}
        />
      </TableFiltersCan>

      {isLoadingNotifications ? (
        <div>Loading...</div>
      ) : (
        <TableCan
          headerTr={["Notification", "Date", "Attachment"]}
          dataTr={filteredNotifications}
          headerAlign='left'
          TrName={NotificationRow}
          trNameProps={{
            onEdit: handleEdit,
            onDelete: handleDelete
          }}
        />
      )}
    </div>
  );
};

export default Notifications;