import React from "react";

interface Notification {
  id: string;
  user: string;
  action: string;
  timestamp: string;
}

interface NotificationActivityProps {
  notifications: Notification[];
}

const NotifcationCan: React.FC<NotificationActivityProps> = ({ notifications }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md shadow-gray-400 w-full">
      <h2 className="text-2xl font-medium mb-6">App Activity</h2>
      <div className="max-h-[600px] overflow-y-auto specific-scroll px-2">
        {notifications.map((notification) => (
          <div key={notification.id} className="bg-gray-100 p-3 rounded-lg mb-2">
            <h3>
              <span className="font-semibold text-red-600">{notification.user}</span>{" "}
              {notification.action}
            </h3>
            <p className="text-gray-500 text-sm flex justify-end">{notification.timestamp}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotifcationCan;
