import * as yup from 'yup';

const passwordRules = yup
  .string()
  .min(8, 'Password must be at least 8 characters')
  .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
  .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .matches(/[0-9]/, 'Password must contain at least one number')
  .matches(/[!@#$%^&*()_+{}\[\]:;"'<>?,.~`|\\-]/, 'Password must contain at least one special character')
  .required('This field is required');

export const loginValidationSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: passwordRules,
});



export const userValidationSchema = yup.object({
  first_name: yup.string().required('First name is required'),
  last_name: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup
  .string()
  .nullable()
  .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
  dob: yup.date()
  .typeError('Please provide a valid date of birth')
  .nullable(),
  gender: yup.mixed().oneOf(['m', 'f', 'o']).required("Gender is Required"),
  address: yup.string().nullable(),
  role: yup.mixed().oneOf(['super_admin', 'artist_manager', 'artist'],"Role is Required").required('Role is required'),
});


export const registerValidationSchema = userValidationSchema.shape({
  password: passwordRules,
});


export const artistValidationSchema =yup.object().shape({
  name: yup.string().required('Name is required'),
  genre: yup.string().optional(),
  dob: yup.date()
  .typeError('Please provide a valid date of birth')
  .nullable(),
  gender: yup.mixed().oneOf(['m', 'f', 'o']).required("Gender is Required"),
  first_release_year: yup
  .number()
  .typeError('First release year must be a number')
  .integer('First release year must be an integer')
  .min(1900, 'First release Year must be 1900 or later')
  .max(new Date().getFullYear(), `First release Year cannot be in the future`)
  .required('First release year is required'),
  address: yup.string().nullable(),
  no_of_albums_released: yup
  .number()
  .typeError('Number of albums must be a number')
  .integer('Number of albums must be an integer')
  .min(0, 'Number of albums cannot be negative')
  .required('Number of albums is required'),

})

export const artistRegisterValidationSchema = artistValidationSchema.shape({
  user_id: yup.string().required('Artist is required'),
});

export const artistCsvValidationSchema =  artistValidationSchema.shape({
  email: yup.string().email().required('Email is required') 
});