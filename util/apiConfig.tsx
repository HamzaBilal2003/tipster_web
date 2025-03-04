const API_DOMAIN = 'https://tipster.hmstech.org/api/';
const API_DOMAIN_images = 'https://tipster.hmstech.org/storage/';

const API_ENDPOINTS = {
  AUTH: {
    Login: API_DOMAIN + '/auth/login',
  },
  UserManagement:{
    getUsersData: API_DOMAIN + "admin/get-user-management-data",
    SingleUserData: API_DOMAIN + "admin/user/",
  },
  tips : {
    UpdateTip: API_DOMAIN + "admin/tip/update/",
  }
};

export { API_DOMAIN, API_ENDPOINTS ,API_DOMAIN_images};
