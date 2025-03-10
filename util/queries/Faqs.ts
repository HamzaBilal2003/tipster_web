import { API_ENDPOINTS } from '../apiConfig';
import { apiCall } from '../cutomApiCall';

export const fetchFaqs = async (
    token: string
): Promise<FaqResponse> => {
    try {
        const response = await apiCall({
            url: API_ENDPOINTS.faqs.getAll,
            method: 'GET',
            data: undefined,
            token: token,
        });
        return response;
    } catch (error: any) {
        throw new Error(error?.message || 'Failed to fetch users');
    }
};


interface FaqItem {
    id: number;
    question: string;
    answer: string;
    created_at: string;
    updated_at: string;
    type: "tip" | "subscription" | "ranking"; // Union type for known values
}

interface FaqResponse {
    status: string;
    data: FaqItem[];
    message: string;
}
