import { apiCall } from '../cutomApiCall';
import { API_ENDPOINTS } from '../../apiConfig';

export const getBillerCategories = async ({ token }) => {
  return await apiCall(
    API_ENDPOINTS.BILL_MANAGEMENT.GetBillerCategories,
    'GET',
    undefined,
    token
  );
};

export const getBillerProviders = async (categoryId, token) => {
  return await apiCall(
    `${API_ENDPOINTS.BILL_MANAGEMENT.GetBillerProviders}/${categoryId}`,
    'GET',
    undefined,
    token
  );
};

export const getBillerItems = async ({ categoryId, providerId, token }) => {
  return await apiCall(
    `${API_ENDPOINTS.BILL_MANAGEMENT.GetBillerItems}/${categoryId}/${providerId}`,
    'GET',
    undefined,
    token
  );
};

export const getBillerItemDetails = async ({ itemId, token }) => {
  return await apiCall(
    `${API_ENDPOINTS.BILL_MANAGEMENT.GetBillerItemDetails}/${itemId}`,
    'GET',
    undefined,
    token
  );
};

export const getTrsansactionDetails = async ({ id, token }) => {
  return await apiCall(
    `${API_ENDPOINTS.BILL_MANAGEMENT.TransactionDetails}/${id}`,
    'GET',
    undefined,
    token
  );
};

export const getBanks = async (token) => {
  return await apiCall(
    API_ENDPOINTS.MONEY_TRANSFER.GetBanks,
    'GET',
    undefined,
    token
  );
};

export const getTransactionStatus = async ({ transactionId, token }) => {
  return await apiCall(
    API_ENDPOINTS.MONEY_TRANSFER.GetTransactionStatus,
    'GET',
    transactionId,
    token
  );
};

export const getSocialMediaLinks = async () => {
  console.log("Social media API called");
  return await apiCall(
    API_ENDPOINTS.ACCOUNT_MANAGEMENT.GetSocialMediaLinks,
    'GET',
    undefined
  );
};

export const getFaqs = async () => {
  console.log("FAQ API called");
  return await apiCall(
    API_ENDPOINTS.ACCOUNT_MANAGEMENT.GetFaqs,
    'GET',
    undefined
  );
};

export const getSlide = async () => {
  console.log("Slides API called");
  return await apiCall(
    API_ENDPOINTS.ACCOUNT_MANAGEMENT.GetSlides,
    'GET',
    undefined
  );
};

