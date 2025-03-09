import { API_ENDPOINTS } from '../apiConfig';
import { apiCall } from '../cutomApiCall';

export const updateRankPrice = async (formdata: RankPriceUpdateData, token: string) => {
  return await apiCall({url: API_ENDPOINTS.rank.updateRankPrice , method: 'POST', data:formdata ,token : token});
};

interface RankPriceUpdateData {
  winners: { rank: number; amount: number }[];
}