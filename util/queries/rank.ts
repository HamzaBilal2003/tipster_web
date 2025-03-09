import { API_ENDPOINTS } from '../apiConfig';
import { apiCall } from '../cutomApiCall';

export const fetchrankPrices = async (
    token: string
): Promise<getRankPriceResponse> => {
    try {
        const response = await apiCall({
            url: API_ENDPOINTS.rank.getRankPrice,
            method: 'GET',
            data: undefined,
            token: token,
        });
        return response;
    } catch (error: any) {
        throw new Error(error?.message || 'Failed to fetch users');
    }
};
export const fetchranks = async (
    token: string
): Promise<RankResponse> => {
    try {
        const response = await apiCall({
            url: API_ENDPOINTS.rank.getUsersRank,
            method: 'GET',
            data: undefined,
            token: token,
        });
        return response;
    } catch (error: any) {
        throw new Error(error?.message || 'Failed to fetch users');
    }
};



interface getRankPriceResponse {
    status: string;
    data: RankPrice[];
    message: string;
}

interface RankPrice {
    id: number;
    amount: string;
    currency: string;
    rank: string;
    created_at: string;
    updated_at: string;
}

// Interface for Bank Account Details
interface BankAccount {
    id: number;
    user_id: number;
    bank_name: string;
    account_number: string;
    account_name: string;
    created_at: string;
    updated_at: string;
}

// Interface for Each User's Rank Data
interface RankUser {
    user_id: number;
    username: string;
    profile_picture: string | null;
    rank: number;
    points: number;
    win_rate: string;
    win_amount: string;
    currency: string;
    bank_account: BankAccount | null;
    paid_status: boolean;
}

// Interface for API Response
interface RankResponse {
    status: string;
    data: RankUser[];
    message: string;
}
