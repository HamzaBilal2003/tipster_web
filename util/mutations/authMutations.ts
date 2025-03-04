import { API_ENDPOINTS } from '../apiConfig';
import { apiCall } from '../cutomApiCall';

export const loginUser = async (data: LoginData): Promise<LoginResponse> => {
  try {
    const response = await apiCall({ url: API_ENDPOINTS.AUTH.Login, method: 'POST', data });
    return response;
  } catch (error: any) {
    throw new Error(error?.message || 'Login failed due to unknown error');
  }
};

interface LoginData {
  email: string;
  password: string;
}
export interface loginDataResponse {
  user: {
    id: number;
    username: string;
    email: string;
    emailVerifiedAt: string | null;
    phone: string;
    dob: string;
    nationality: string;
    profilePicture: string;
    otp: string | null;
    otpVerified: '0' | '1';
    isActive: 0 | 1;
    createdAt: string;
    updatedAt: string;
    vipStatus: 'active' | 'inactive';
    bio: string;
  };
  token: string;
};

export interface LoginResponse {
  status: string;
  data: {
    user: {
      id: number;
      username: string;
      email: string;
      email_verified_at: string | null;
      phone: string;
      dob: string;
      nationality: string;
      profile_picture: string;
      otp: string | null;
      otp_verified: '0' | '1';
      is_active: 0 | 1;
      created_at: string;
      updated_at: string;
      vip_status: string;
      bio: string;
    };
    token: string;
  };
  message: string;
}