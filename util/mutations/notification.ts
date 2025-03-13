import axios from 'axios';
import { API_DOMAIN } from '../apiConfig';
import Cookies from 'js-cookie';
import { skipToken } from '@tanstack/react-query';

const API_BASE_URL = API_DOMAIN; // Replace with your actual API base URL
const token = Cookies.get("authToken"); // Retrieve token from cookies

export const fetchNotifications = async () => {
  const response = await axios.get(`${API_BASE_URL}admin/notifications/get`, {
    headers: {
      Authorization: `Bearer ${token}`, // Attach Token
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
export const fetchUser = async () => {
  const response = await axios.get(`${API_BASE_URL}admin/user/getAllUsers`, {
    headers: {
      Authorization: `Bearer ${token}`, // Attach Token
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const fetchAppActivities = async () => {
  const response = await axios.get(`${API_BASE_URL}admin/get-app-actiity`, {
    headers: {
      Authorization: `Bearer ${token}`, // Attach Token
      "Content-Type": "application/json",
    },
  });
  return response.data;
};


export interface User {
  id: number;
  username: string;
  email: string;
  phone: string;
  dob: string;
  nationality: string;
  profile_picture: string | null;
  vip_status: string;
  bio: string | null;
}

export interface AppActivity {
  id: number;
  user_id: number;
  activity: string;
  created_at: string;
  updated_at: string;
  user: User;
}

export interface Notification {
  id: number;
  user_id: number;
  triggered_by_username: string;
  type: string;
  post_id: number | null;
  message: string;
  is_read: number;
  created_at: string;
  updated_at: string;
  attachment: string | null;
}