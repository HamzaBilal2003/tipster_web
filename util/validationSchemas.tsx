import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Invalid email address'
    )
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export const signupSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Invalid email address'
    )
    .required('Email is required'),

  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

// Forgot Password Schema

export const forgetPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('New password is required'),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm password is required'),
});
export const corporateSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  rcNumber: Yup.string().required('RCN number is required'),
  companyName: Yup.string().required('Company name is required'),
  bvn: Yup.string()
    .matches(/^\d{11}$/)
    .required('BVN is required'),
  dob: Yup.string().required('Incorporation Date is required'),
  phone: Yup.string()
    .matches(/^\d{10}$/)
    .required('Phone number is required'),
});

export const individualSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  phone: Yup.string()
    .matches(/^\d{10}$/)
    .required('Phone number is required'),
});

export const emailValidation = Yup.string()
  .matches(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    'Invalid email address'
  )
  .required('Email is required');
