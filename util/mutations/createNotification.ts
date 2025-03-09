import { API_ENDPOINTS } from "../apiConfig";
import { apiCall } from "../customApiCall";

export const createNotification = async (formData: NotificationCreateData, token: string) => {
  return await apiCall({
    url: API_ENDPOINTS.notifications.create, // Define this in `apiConfig`
    method: "POST",
    data: formData,
    token: token,
  });
};

// Define the interface for Notification Create Request
interface NotificationCreateData {
  user_id: number;
  triggered_by_username: string;
  type: string;
  post_id?: number | null;
  message: string;
  attachment?: string | null;
}
