import { API_ENDPOINTS } from "../apiConfig";
import { apiCall } from "../cutomApiCall";

export const fetchChats = async (
    token: string
): Promise<ChatItem[]> => {
    try {
        const response = await apiCall({
            url: API_ENDPOINTS.Support.chat,
            method: 'GET',
            data: undefined,
            token: token,
        });
        return response;
    } catch (error: any) {
        throw new Error(error?.message || 'Failed to fetch users');
    }
};
// export const fetchMessages=
export const fetchMessages = async (
    token: string,
    chatId: string
): Promise<ChatItem[]> => {
    try {
        const response = await apiCall({
            url: `${API_ENDPOINTS.Support.messages}/${chatId}`,
            method: 'GET',
            data: undefined,
            token: token,
        });
        return response;
    } catch (error: any) {
        throw new Error(error?.message || 'Failed to fetch users');
    }
};
export interface chatResponse {

}
export interface ChatItem {
    id: number;
    name: string;
    lastMessage: string;
    lastMessageTime: string;
    lastMessageCount: number;
    UserImage: string;
}
