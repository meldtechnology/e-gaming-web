/* eslint-disable react/no-unescaped-entities */
import { useFormik } from 'formik';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
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

const APP_ID = process.env.REACT_APP_APPLICATION_ID;
// const LOGIN_URL = 'http://localhost:9011/login?appId=${APP_ID}&error';
// const LOGIN_URL = 'http://academy.meld-tech.com/login?appId=${APP_ID}&error';
const LOGIN_URL = `https://auth.meld-tech.com/login?appId=${APP_ID}&error`;
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
        <div className={`${searchParams.get('error') !== null? '':'hidden'} mt-3 p-2 text-white-a700 bg-red-600 rounded-[10px] text-[1.2rem] text-center`}>
          <span className={'block text-amber-100-400'}> Username/Password is incorrect.</span>
          <span className={'text-[0.9rem]'}><strong>Note:</strong> Make sure your account is also  active.</span>
        </div>
      </Box>
      <form onSubmit={formik.submitForm} action={LOGIN_URL} method="POST">
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
              Enter your username
            </Typography>
            <TextField
              label="Username *"
              variant="outlined"
              name={'username'}
              fullWidth
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
          </Grid>
          <Grid item xs={12}>
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
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
          <Grid item container xs={12}>
            <Box
              display="flex"
              flexDirection={{ xs: 'column', sm: 'row' }}
              alignItems={{ xs: 'stretched', sm: 'center' }}
              justifyContent={'space-between'}
              width={1}
              maxWidth={600}
              margin={'0 auto'}
            >
              <Box marginBottom={{ xs: 1, sm: 0 }}>
              </Box>
              <Button size={'large'}
                      variant={'contained'}
                      type={'submit'}
                      disabled={!(formik.dirty && formik.isValid)} >
                Login
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Form;
