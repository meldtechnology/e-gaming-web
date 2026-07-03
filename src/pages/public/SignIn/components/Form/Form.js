import { env } from "../../../../../config/env";
 
import { useFormik } from 'formik';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSearchParams } from "react-router-dom";

const validationSchema = yup.object({
  username: yup
    .string()
    .trim()
    // .email('Please enter a valid email address')
    .required('Email is required.'),
  password: yup
    .string()
    .required('Please specify your password')
    // .min(8, 'The password should have at minimum length of 8'),
});


const LOGIN_URL = env.LOGIN_URL;
const pillFieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '9999px',
    '&.Mui-focused fieldset': {
      borderColor: 'primary.main',
    },
  },
};

const Form = () => {
  const [searchParams] = useSearchParams();
  const initialValues = {
    username: '',
    password: '',
  };

  const onSubmit = (values) => {
    return values;
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit
  });

  return (
    <Box>
      <Box marginBottom={4}>
        <Typography
          sx={{
            textTransform: 'uppercase',
            fontWeight: 'medium',
          }}
          gutterBottom
          color={'text.secondary'}
        >
          Login
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
          }}
        >
          Welcome back
        </Typography>
        <Typography color="text.secondary">
          Login to manage your account.
        </Typography>
        <div className={`${searchParams.get('error') !== null? '':'hidden'} mt-4 rounded-xl border border-danger/30 bg-danger-soft p-3 text-danger`}>
          <span className={'block font-semibold'}>Username or password is incorrect.</span>
          <span className={'text-sm'}><strong>Note:</strong> Make sure your account is also active.</span>
        </div>
      </Box>
      <form onSubmit={formik.submitForm} action={LOGIN_URL} method="POST">
        <Box display="flex" flexDirection="column" gap={4}>
          <Box>
            <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
              Enter your username
            </Typography>
            <TextField
              label="Username *"
              variant="outlined"
              name={'username'}
              fullWidth
              sx={pillFieldSx}
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
          </Box>
          <Box>
            <Box
              display="flex"
              flexDirection={{ xs: 'column', sm: 'row' }}
              alignItems={{ xs: 'stretched', sm: 'center' }}
              justifyContent={'space-between'}
              width={1}
              marginBottom={2}
            >
              <Box marginBottom={{ xs: 1, sm: 0 }}>
                <Typography variant={'subtitle2'}>
                  Enter your password
                </Typography>
              </Box>
            </Box>
            <TextField
              label="Password *"
              variant="outlined"
              name={'password'}
              type={'password'}
              fullWidth
              sx={pillFieldSx}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Box>
          <Box>
            <Button size={'large'}
                    variant={'contained'}
                    type={'submit'}
                    fullWidth
                    sx={{ borderRadius: '9999px', textTransform: 'none', py: 1.25 }}
                    disabled={!(formik.dirty && formik.isValid)} >
              Login
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default Form;
