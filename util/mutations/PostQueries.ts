import { API_ENDPOINTS } from '../apiConfig';
import { apiCall } from '../cutomApiCall';

export const AddPost = async (formdata: FormData, token: string) => {
  return await apiCall({url: API_ENDPOINTS.post.createPost , method: 'POST', data:formdata ,token : token});
};
