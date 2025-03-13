import { API_ENDPOINTS } from '../apiConfig';
import { apiCall } from '../cutomApiCall';

export  const UpdateTipFetch = async (data: {
    status:string;
    result:string;
    rejection_reason:string
    odds:string
},tipId: number,token: string): Promise<UpdateTipResponse> => {
  try {
    const response = await apiCall({ url: API_ENDPOINTS.tips.UpdateTip  + tipId, method: 'POST', data:data ,token : token });
    return response;
  } catch (error: any) {
    throw new Error(error?.message || 'Login failed due to unknown error');
  }
};

interface UpdateTipResponse {
  status:string;
  data: {
    id: number;
    userId: number;
    bettingCompanyId: number;
    codes: string;
    odds: string;
    status: string;
    result: string;
    matchDate: string;
    bettingCategory: string;
    createdAt: string;
    updatedAt: string;
  };
  message: string;
}