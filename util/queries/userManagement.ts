import { API_ENDPOINTS } from '../apiConfig';
import { apiCall } from '../cutomApiCall';

export const fetchUsers = async (
  token: string
) : Promise<userData> => {
  try {
    const response = await apiCall({
      url: API_ENDPOINTS.UserManagement.getUsersData,
      method: 'GET',
      data: undefined,
      token : token,
    });
    return response;
  } catch (error: any) {
    throw new Error(error?.message || 'Failed to fetch users');
  }
};
export const fetchSingleUsers = async (
  token: string,
  userId: number,
) : Promise<SingleUserData> => {
  try {
    const response = await apiCall({
      url: API_ENDPOINTS.UserManagement.SingleUserData + userId,
      method: 'GET',
      data: undefined,
      token : token,
    });
    return response;
  } catch (error: any) {
    throw new Error(error?.message || 'Failed to fetch users');
  }
};

interface userData {
  status: "success";
  data: {
    stats: Array<{
      title: string;
      value: string;
      change: number;
      icon: string;
      color: string;
    }>;
    users: Array<{
      id: number;
      username: string;
      email: string;
      profile_picture: string | null;
      is_active: number;
      vip_status: "active" | "not_active";
      created_at: string;
      phone:string
    }>;
  };
  message: string;
}


export interface SingleUserData {
  status:string;
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
      otp_verified: string;
      is_active: number;
      created_at: string;
      updated_at: string;
      vip_status: string;
      bio: string;
      subscription: Array<{
        id: number;
        user_id: number;
        status: string;
        package_id: number;
        renewal_date: string;
        created_at: string;
        updated_at: string;
      }>;
    };
    tips: Array<{
      id: number;
      user_id: number;
      betting_company_id: number;
      codes: string;
      ods: string;
      status: string;
      result: string;
      match_date: string;
      betting_category: string;
      created_at: string;
      updated_at: string;
      betting_company: {
        id: number;
        title: string;
        logo: string;
        status: string;
        created_at: string;
        updated_at: string;
      };
      user: {
        id: number;
        username: string;
        profile_picture: string;
        win_rate: string;
        last_five: Array<string>;
      };
    }>;
    posts: Array<{
      id: number;
      title: string | null;
      content: string | null;
      user_id: number;
      has_image: number;
      status: string;
      created_at: string;
      updated_at: string;
      images: string;
      share_count: number;
      view_count: number;
      type: string;
    }>;
    statistics: {
      user_id: number;
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
        otp_verified: string;
        is_active: number;
        created_at: string;
        updated_at: string;
        vip_status: string;
        bio: string;
      };
      win_rate: string;
      total_wins: number;
      last_five: Array<string>;
      average_odds: number;
      total_predictions: number;
      tips: Array<{
        id: number;
        user_id: number;
        betting_company_id: number;
        codes: string;
        ods: string;
        status: string;
        result: string;
        match_date: string;
        betting_category: string;
        created_at: string;
        updated_at: string;
        betting_company: {
          id: number;
          title: string;
          logo: string;
          status: string;
          created_at: string;
          updated_at: string;
        };
        user: {
          id: number;
          username: string;
          profile_picture: string;
          win_rate: string;
          last_five: Array<string>;
        };
      }>;
      graphicalData: Array<{
        month: string;
        win_rate: number;
      }>;
      isFollowing: boolean;
      follower_count: number;
      subscriber: boolean;
    };
    userActivity: Array<{
      id: number;
      user_id: number;
      activity: string;
      created_at: string;
      updated_at: string;
    }>;
  };
  message: string;
}