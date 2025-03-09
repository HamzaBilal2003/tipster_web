import { API_ENDPOINTS } from '../apiConfig';
import { apiCall } from '../cutomApiCall';

export const fetchCompanies = async (
    token: string
): Promise<BettingCompaniesResponse> => {
    try {
        const response = await apiCall({
            url: API_ENDPOINTS.BettingCompany.get,
            method: 'GET',
            data: undefined,
            token: token,
        });
        return response;
    } catch (error: any) {
        throw new Error(error?.message || 'Failed to fetch users');
    }
};

interface BettingCompany {
    id: number;
    title: string;
    logo: string;
    status: string;
    created_at: string;
    updated_at: string;
  }
  
  interface BettingCompaniesResponse {
    status: string;
    data: BettingCompany[];
    message: string;
  }
  

