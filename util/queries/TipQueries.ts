import { API_ENDPOINTS } from '../apiConfig';
import { apiCall } from '../cutomApiCall';

export const fetchTipsData = async (
    token: string
): Promise<TipGetResponse> => {
    try {
        const response = await apiCall({
            url: API_ENDPOINTS.tips.getAlltips,
            method: 'GET',
            data: undefined,
            token: token,
        });
        return response;
    } catch (error: any) {
        throw new Error(error?.message || 'Failed to fetch users');
    }
};


interface TipGetResponse {
    status: string;
    data: {
        stats: Stat[];
        tips: Tip[];
    };
    message: string;
}

interface Stat {
    title: string;
    value: string;
    change: number;
    icon: string;
    color: string;
}

export interface Tip {
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
    betting_company: BettingCompany;
    user: User;
}

interface BettingCompany {
    id: number;
    title: string;
    logo: string;
    status: string;
    created_at: string;
    updated_at: string;
}

interface User {
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
}