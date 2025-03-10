
const API_DOMAIN = 'https://tipster.hmstech.org/api/';
const API_DOMAIN_images = 'https://tipster.hmstech.org/storage/';

const API_ENDPOINTS = {
  AUTH: {
    Login: API_DOMAIN + 'auth/login',
  },
  Dashboard: {
    data: API_DOMAIN + "admin/get-dashboard-data",
  },
  UserManagement: {
    getUsersData: API_DOMAIN + "admin/get-user-management-data",
    SingleUserData: API_DOMAIN + "admin/user/",
  },
  tips: {
    UpdateTip: API_DOMAIN + "admin/tip/update/",
    getAlltips: API_DOMAIN + "admin/tip/get-all"
  },
  post: {
    getAllPostData: API_DOMAIN + "admin/get-post-management-data",
    deletePost: API_DOMAIN + "posts/delete-post/",
    approvePost: API_DOMAIN + "posts/approvePost/",
    createPost: API_DOMAIN + "posts/create",
  },
  rank: {
    getRankPrice: API_DOMAIN + "admin/rank/get-winners-amount",
    updateRankPrice: API_DOMAIN + 'admin/rank/update-winner-amount',
    getUsersRank: API_DOMAIN + 'admin/rank/get-top-10-rankings',
  },
  Notifcation: {
    create: API_DOMAIN + "admin/notifications/create"
  },

  BettingCompany: {
    craete: API_DOMAIN + "betting-company/create",
    get: API_DOMAIN + 'betting-company/get-all',
    updateCompany : API_DOMAIN + 'betting-company/get-all/'
  },
  faqs :{
    update : API_DOMAIN + 'Faq/update/',
    create : API_DOMAIN + 'Faq/create',
    getAll : API_DOMAIN + 'Faq/get'
  },
  Support: {
    chat: API_DOMAIN + "admin/get-chats-for-admin",
    messages: API_DOMAIN + "admin/get-messages-for-admin"
  }
};

export { API_DOMAIN, API_ENDPOINTS, API_DOMAIN_images };
