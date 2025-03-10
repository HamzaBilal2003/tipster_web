import { API_ENDPOINTS } from '../apiConfig';
import { apiCall } from '../cutomApiCall';

export const createFaq = async (
    data: { question: string, answer: string,type: string,},
    token: string
) => {
    try {
        const response = await apiCall({
            url: API_ENDPOINTS.faqs.create,
            method: 'POST',
            data: data,
            token: token,
        });
        return response;
    } catch (error: any) {
        throw new Error(error?.message || 'Failed to fetch users');
    }
};
export const UpdateFaqs = async (
    data: { question: string, answer: string,type: string,},
    editingId : number,
    token: string,
) => {
    try {
        const response = await apiCall({
            url: API_ENDPOINTS.faqs.update + editingId ,
            method: 'PUT',
            data: data,
            token: token,
        });
        return response;
    } catch (error: any) {
        throw new Error(error?.message || 'Failed to fetch users');
    }
};