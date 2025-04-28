import * as yup from 'yup';

export const registerValidationSchema = yup.object().shape({
    first_name: yup.string().required('First name is required'),
    last_name: yup.string().required('Last name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[!@#$%^&*()_+{}\[\]:;"\'<>,.?~`|-]/, 'Password must contain at least one special character')
    .required('This field is required'),
    phone: yup.string().nullable(),
    dob: yup.date().nullable(),
    gender: yup.mixed().oneOf(['m', 'f', 'o']).nullable(),
    address: yup.string().nullable(),
    role: yup.mixed().oneOf(['super_admin', 'artist_manager', 'artist']).required('Role is required'),
});