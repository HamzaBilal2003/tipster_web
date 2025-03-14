import { API_ENDPOINTS } from '../apiConfig';
import { apiCall } from '../cutomApiCall';


export const createCompany = async (formdata: FormData, token: string) => {
    return await apiCall({ url: API_ENDPOINTS.BettingCompany.craete , method: 'POST', data: formdata, token: token });
};


export const UpdateCompany = async (formdata: FormData,companyId : number, token: string) => {
    return await apiCall({ url: API_ENDPOINTS.BettingCompany.updateCompany + companyId , method: 'POST', data: formdata, token: token });
};

