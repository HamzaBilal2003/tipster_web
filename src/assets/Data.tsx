import images from "./images";


const sidebarIcon = images.sidebarIcons;
export const Sidebar_links = [
  {
    name: "Dashboard",
    link: "/dashboard",
    icon: sidebarIcon.dashboard,
    sublinks: [],
  },
  {
    name: "Users",
    link: "/users",
    icon: sidebarIcon.user,
    sublinks: [],
  },
  {
    name: "Transactions",
    link: "/transactions",
    icon: sidebarIcon.transactions,
    sublinks: [],
  },
  {
    name: "Predictions",
    link: "/predications",
    icon: sidebarIcon.predication,
    sublinks: [],
  },
  {
    name: "Rank Management",
    link: "/rank/managment",
    icon: sidebarIcon.rank,
    sublinks: [],
  },
  {
    name: "Socials",
    link: "/socials",
    icon: sidebarIcon.socials,
    sublinks: [],
  },
  {
    name: "Subscriptions",
    link: "/subscriptions",
    icon: sidebarIcon.subscription,
    sublinks: [],
  },
  {
    name: "Betting Companies",
    link: "/betting/companies",
    icon: sidebarIcon.bettingIcon,
    sublinks: [],
  },
  {
    name: "Faqs",
    link: "/faqs",
    icon: sidebarIcon.faqs,
    sublinks: [],
  },
  {
    name: "Notfications",
    link: "/notfications",
    icon: sidebarIcon.notification,
    sublinks: [],
  },
  {
    name: "Settings",
    link: "/settings",
    icon: sidebarIcon.setting,
    sublinks: [],
  },
  {
    name: "Support",
    link: "/support",
    icon: sidebarIcon.support,
    sublinks: [],
  },
];





// __________________users josn
export const users = [
  {
    "isOnline": false,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+1 234 567 890",
    "dob": "1990-05-15",
    "last_login": "2024-02-10 14:30:00",
    "reg_date": "2023-01-20",
    "status": true,
    "subscription": true,
    "other": "VIP Customer"
  },
  {
    "isOnline": true,
    "name": "Jane Smith",
    "email": "jane.smith@example.com",
    "phone": "+1 987 654 321",
    "dob": "1985-10-25",
    "last_login": "2024-02-08 09:15:00",
    "reg_date": "2022-11-05",
    "status": false,
    "subscription": true,
    "other": "Pending Verification"
  },
  {
    "isOnline": false,
    "name": "Alice Johnson",
    "email": "alice.johnson@example.com",
    "phone": "+44 7890 123456",
    "dob": "1995-03-12",
    "last_login": "2024-02-09 12:45:00",
    "reg_date": "2023-06-14",
    "status": true,
    "subscription":true,
    "other": "Special Discount"
  },
  {
    "isOnline": true,
    "name": "Bob Williams",
    "email": "bob.williams@example.com",
    "phone": "+33 678 456 123",
    "dob": "1988-07-21",
    "last_login": "2024-02-07 16:00:00",
    "reg_date": "2023-08-02",
    "status": false,
    "subscription":true,
    "other": "Trial User"
  },
  {
    "isOnline": false,
    "name": "Emma Brown",
    "email": "emma.brown@example.com",
    "phone": "+49 170 9876543",
    "dob": "1992-11-30",
    "last_login": "2024-02-11 18:20:00",
    "reg_date": "2023-03-10",
    "status": true,
    "subscription": true,
    "other": "Loyalty Member"
  },
  {
    "isOnline": true,
    "name": "Michael Davis",
    "email": "michael.davis@example.com",
    "phone": "+1 555 234 678",
    "dob": "1983-06-15",
    "last_login": "2024-02-06 10:05:00",
    "reg_date": "2023-09-18",
    "status": false,
    "subscription": true,
    "other": "Renewal Due"
  },
  {
    "isOnline": false,
    "name": "Sophia Miller",
    "email": "sophia.miller@example.com",
    "phone": "+61 412 345 678",
    "dob": "1998-02-05",
    "last_login": "2024-02-12 14:50:00",
    "reg_date": "2023-05-25",
    "status": true,
    "subscription": true,
    "other": "Frequent User"
  },
  {
    "isOnline": true,
    "name": "William Garcia",
    "email": "william.garcia@example.com",
    "phone": "+52 55 6789 1234",
    "dob": "1979-12-01",
    "last_login": "2024-02-05 08:30:00",
    "reg_date": "2022-12-12",
    "status": false,
    "subscription": true,
    "other": "Limited Access"
  },
  {
    "isOnline": false,
    "name": "Olivia Wilson",
    "email": "olivia.wilson@example.com",
    "phone": "+91 98765 43210",
    "dob": "1993-09-09",
    "last_login": "2024-02-10 22:10:00",
    "reg_date": "2023-07-04",
    "status": true,
    "subscription":true,
    "other": "New Referral"
  },
  {
    "isOnline": true,
    "name": "James Martinez",
    "email": "james.martinez@example.com",
    "phone": "+81 90 1234 5678",
    "dob": "1986-04-18",
    "last_login": "2024-02-03 15:20:00",
    "reg_date": "2023-01-30",
    "status": false,
    "subscription": true,
    "other": "Pending KYC"
  }
]


// ___________________ Subscription json

export const subscriptions = [
  {
    "select": false,
    "name": "John Doe",
    "duration": "12 Months",
    "reference":"asdkaj291212kdsad",
    "email":"example@gmail.com",
    "amount": "N 120.00",
    "sub_date": "2023-01-15",
    "exp_date": "2024-01-15",
    "status": true
  },
  {
    "select": false,
    "name": "Jane Smith",
    "duration": "6 Months",
    "reference":"asdkaj291212kdsad",
    "email":"example@gmail.com",
    "amount": "N 60.00",
    "sub_date": "2023-06-10",
    "exp_date": "2023-12-10",
    "status": false
  },
  {
    "select": false,
    "name": "Alice Johnson",
    "duration": "3 Months",
    "reference":"asdkaj291212kdsad",
    "email":"example@gmail.com",
    "amount": "N 30.00",
    "sub_date": "2023-10-01",
    "exp_date": "2024-01-01",
    "status": true
  },
  {
    "select": false,
    "name": "Bob Williams",
    "duration": "1 Year",
    "reference":"asdkaj291212kdsad",
    "email":"example@gmail.com",
    "amount": "N 150.00",
    "sub_date": "2022-12-20",
    "exp_date": "2023-12-20",
    "status": "Expired"
  },
  {
    "select": false,
    "name": "Emma Brown",
    "duration": "9 Months",
    "reference":"asdkaj291212kdsad",
    "email":"example@gmail.com",
    "amount": "N 90.00",
    "sub_date": "2023-03-05",
    "exp_date": "2023-12-05",
    "status": true
  },
  {
    "select": false,
    "name": "Michael Davis",
    "duration": "6 Months",
    "reference":"asdkaj291212kdsad",
    "email":"example@gmail.com",
    "amount": "N 75.00",
    "sub_date": "2023-07-15",
    "exp_date": "2024-01-15",
    "status": "Pending"
  },
  {
    "select": false,
    "name": "Sophia Miller",
    "duration": "1 Month",
    "reference":"asdkaj291212kdsad",
    "email":"example@gmail.com",
    "amount": "N 10.00",
    "sub_date": "2024-02-01",
    "exp_date": "2024-03-01",
    "status": true
  },
  {
    "select": false,
    "name": "William Garcia",
    "duration": "3 Months",
    "reference":"asdkaj291212kdsad",
    "email":"example@gmail.com",
    "amount": "N 40.00",
    "sub_date": "2023-11-10",
    "exp_date": "2024-02-10",
    "status": false
  },
  {
    "select": false,
    "name": "Olivia Wilson",
    "duration": "12 Months",
    "reference":"asdkaj291212kdsad",
    "email":"example@gmail.com",
    "amount": "N 100.00",
    "sub_date": "2022-09-20",
    "exp_date": "2023-09-20",
    "status": "Expired"
  },
  {
    "select": false,
    "name": "James Martinez",
    "duration": "6 Months",
    "reference":"asdkaj291212kdsad",
    "email":"example@gmail.com",
    "amount": "N 80.00",
    "sub_date": "2023-08-25",
    "exp_date": "2024-02-25",
    "status": true
  }
]



