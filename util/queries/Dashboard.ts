import { API_ENDPOINTS } from '../apiConfig';
import { apiCall } from '../cutomApiCall';

export const fetchDashboardData = async (
    token: string
): Promise<DashboardData> => {
    try {
        const response = await apiCall({
            url: API_ENDPOINTS.Dashboard.data,
            method: 'GET',
            data: undefined,
            token: token,
        });
        return response;
    } catch (error: any) {
        throw new Error(error?.message || 'Failed to fetch users');
    }
};

// Interface for Stats
interface Stat {
    title: string;
    value: number | string;
    change: number | string;
    icon: string;
    color: string;
}

// Interface for User
interface User {
    id: number;
    username: string;
    email: string;
    profile_picture: string | null;
    is_active: number;
    vip_status: string;
    phone: string;
    created_at: string;
}

// Interface for Bank Account
interface BankAccount {
    id: number;
    user_id: number;
    bank_name: string;
    account_number: string;
    account_name: string;
    created_at: string;
    updated_at: string;
}

// Interface for Tip User
interface TipUser {
    id: number;
    username: string;
    profile_picture: string;
}

// Interface for Comment
interface Comment {
    id: number;
    user: TipUser;
    content: string;
}

// Interface for Tips
interface Tip {
    id: number;
    user: TipUser;
    timestamp: string;
    content: string;
    type: string;
    likes_count: number;
    comments_count: number;
    share_count: number;
    view_count: number;
    recent_comments: Comment[];
    image_1?: string;
}

// Interface for API Response
interface DashboardData {
    stats: Stat[];
    users: User[];
    tips: Tip[];
}
