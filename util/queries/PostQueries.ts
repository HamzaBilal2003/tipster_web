import { number } from 'yup';
import { API_ENDPOINTS } from '../apiConfig';
import { apiCall } from '../cutomApiCall';

export const fetchPostData = async (
  token: string
): Promise<GetallPostDataResponse> => {
  try {
    const response = await apiCall({
      url: API_ENDPOINTS.post.getAllPostData,
      method: 'GET',
      data: undefined,
      token: token,
    });
    return response;
  } catch (error: any) {
    throw new Error(error?.message || 'Failed to fetch users');
  }
};
export const approvePost = async (
  token: string,
  PostId: number
) => {
  try {
    const response = await apiCall({
      url: API_ENDPOINTS.post.approvePost + PostId,
      method: 'GET',
      data: undefined,
      token: token,
    });
    return response;
  } catch (error: any) {
    throw new Error(error?.message || 'Failed to fetch users');
  }
};


export const DeletePost = async (
  token: string,
  PostId: number
) => {
  try {
    const response = await apiCall({
      url: API_ENDPOINTS.post.deletePost + PostId,
      method: 'GET',
      data: undefined,
      token: token,
    });
    return response;
  } catch (error: any) {
    throw new Error(error?.message || 'Failed to fetch users');
  }
};
export const PinPost = async (
  token: string,
  PostId: number
) => {
  try {
    const response = await apiCall({
      url: API_ENDPOINTS.post.pinPost + PostId,
      method: 'GET',
      data: undefined,
      token: token,
    });
    return response;
  } catch (error: any) {
    throw new Error(error?.message || 'Failed to fetch users');
  }
};
export const ApproveComment = async (
  token: string,
  commentId: number
) => {
  try {
    const response = await apiCall({
      url: API_ENDPOINTS.post.approveComment + commentId,
      method: 'POST',
      data: undefined,
      token: token,
    });
    return response;
  } catch (error: any) {
    throw new Error(error?.message || 'Failed to fetch users');
  }
};
export const DeleteComment = async (
  token: string,
  commentId: number
) => {
  try {
    const response = await apiCall({
      url: API_ENDPOINTS.post.deleteComment + commentId,
      method: 'POST',
      data: undefined,
      token: token,
    });
    return response;
  } catch (error: any) {
    throw new Error(error?.message || 'Failed to fetch users');
  }
};

interface GetallPostDataResponse {
  status: string;
  data: {
    stats: {
      [key: string]: {
        label: string;
        value: string;
        change: number;
        icon: string;
        color: string;
      };
      pendingPosts: {
        id: number;
        user: {
          id: number;
          username: string;
          profile_picture: string | null;
        };
        timestamp: string;
        content: string;
        type: string;
        likes_count: number;
        comments_count: number;
        share_count: number;
        view_count: number;
        recent_comments: any[];
        image_1?: string;
        image_2?: string;
        image_3?: string;
        image_4?: string;
        image_5?: string;
        image_6?: string;
        image_7?: string;
        image_8?: string;
        image_9?: string;
        image_10?: string;
      }[];
      approvedPost: {
        id: number;
        user: {
          id: number;
          username: string;
          profile_picture: string | null;
        };
        timestamp: string;
        content: string;
        type: string;
        likes_count: number;
        comments_count: number;
        share_count: number;
        view_count: number;
        recent_comments: any[];
        image_1?: string;
        image_2?: string;
        image_3?: string;
        image_4?: string;
        image_5?: string;
        image_6?: string;
        image_7?: string;
        image_8?: string;
        image_9?: string;
        image_10?: string;
      }[];
    };
  };
  message: string;
}