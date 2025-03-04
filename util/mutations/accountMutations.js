import { apiCall } from "../cutomApiCall";
import {API_ENDPOINTS} from "../../apiConfig";

export const createIndividualAccount = async ({ data, token }) => {
  try {
    return await apiCall(
      API_ENDPOINTS.ACCOUNT_MANAGEMENT.CreateIndividualAccount,
      'POST',
      data,
      token
    );
  } catch (error) {
    throw new Error(error.message || 'Failed to create individual account');
  }
};

// export const createCorporateAccount = async ({ data, token }) => {
//     return await apiCall(
//       API_ENDPOINTS.ACCOUNT_MANAGEMENT.CreateCoorporateAccount,
//       'POST',
//       data,
//       token
//     );
//   };
  

export const updatePassword = async ({ data, token }) => {
  try {
    return await apiCall(
      API_ENDPOINTS.ACCOUNT_MANAGEMENT.UpdatePassword,
      'POST',
      data,
      token
    );
  } catch (error) {
    throw new Error(error.message || 'Failed to update password');
  }
};

export const updateProfile = async ({ data, token }) => {
  try {
    return await apiCall(
      API_ENDPOINTS.ACCOUNT_MANAGEMENT.UpdateProfile,
      'POST',
      data,
      token
    );
  } catch (error) {
    throw new Error(error.message || 'Failed to update profile');
  }
};

export const validateCustomer = async ({ data, token }) => {
  try {
    return await apiCall(
      API_ENDPOINTS.BILL_MANAGEMENT.ValidateCustomer,
      'POST',
      data,
      token
    );
  } catch (error) {
    throw new Error(error.message || 'Failed to validate customer');
  }
};

export const payBillFn = async ({ data, token }) => {
  try {
    return await apiCall(
      API_ENDPOINTS.BILL_MANAGEMENT.PayBills,
      'POST',
      data,
      token
    );
  } catch (error) {
    throw new Error(error.message || 'Failed to pay bill');
  }
};
