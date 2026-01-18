import React, { useEffect, useState } from "react";
import { useFormik } from 'formik';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from "@mui/material/MenuItem";
import { ProgressButton } from "../../../../../../ui-components/Form/component/ProgressButton";
import { useNavigate } from "react-router-dom";
import {
  UserVerificationService as verifyEntity
} from "../../../../../../services/user/UserVerificationService";
import { storeItem } from "../../../../../../services";
import { Textarea } from "@headlessui/react";

const validationSchema = yup.object({
  regNumber: yup
    .string()
    .trim()
    .required('Government Issued Number is required.'),
  firstname: yup
    .string()
    .required('Please specify matching your First Name'),
  lastname: yup
    .string()
    .required('Please specify your matching Last Name')
});

const OPERATOR_TYPE = {
  Proprietor: 'CAC',
  Agent: 'NIN'
}

const VERIFICATION_URL = process.env.REACT_APP_VERIFY_IDENTITY_URL;
export const Form = () => {
  const [type, setType] = useState('');
  const [bizType, setBizType] = useState('RC');
  const [regLabel, setRegLabel] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [verifying, setVerifying] = useState(false);
  const navigate = useNavigate();
  const { verify } = verifyEntity(`${VERIFICATION_URL}?type=${OPERATOR_TYPE[type]}`);

  const initialValues = {
    regNumber: '',
    firstname: '',
    lastname: '',
    address: ''
  };

  const onSubmit = async (values) => {
    setVerifying(true);
    const result = await verify(configRegNumber(values));
    if(result?.error !== undefined){
      setIsError(true);
      setErrorMsg(result?.error?.data?.userMessage);
    }
    else {
      storeItem('operator', JSON.stringify(result?.data?.data));
      navigate('/apply/operator/form', { replace: true});
    }
    setVerifying(false);
  };

  const configRegNumber = (values) => {
    if(type === 'Proprietor')
      values['regNumber'] = bizType + values['regNumber'].replace(/[A-Z]|[a-z]/g, '');
    else
      values['regNumber'] = values['regNumber'].replace(/[A-Z]|[a-z]/g, '');
    return values;
  }

  const onChangeOperator = (e) => {
    setType(e.target.value);
    if(e.target.value === 'Proprietor') {
      formik.setFieldValue('firstname', '.');
      formik.setFieldValue('lastname', '.');
    }else {
      formik.setFieldValue('firstname', '');
      formik.setFieldValue('lastname', '');
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit,
  });

  useEffect(() => {
    if(type === 'Proprietor') setRegLabel('Business Registration Number')
    else if(type === 'Agent') setRegLabel('Agent NIN')
    else setRegLabel('');
  }, [type]);

  return (
    <Box>
      <Box marginBottom={4}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
          }}
        >
          Operator Verification
        </Typography>
        <Typography color="text.secondary">
          Verify your identity (<span style={{ fontWeight: 700 }}>Proprietor or Agent</span>).
           to submit your application
        </Typography>
        <Typography color={`white`}
                    bgcolor={'red'}
                    borderColor={'darkred'}
                    borderRadius={'10px'}
                    className={`block w-[100%] text-center p-4 !mt-4 ${isError?'':'hidden'}`} >
          {errorMsg}
        </Typography>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
              Select your operator category
            </Typography>
            <Select
              label="Operator *"
              variant="outlined"
              defaultValue=""
              name={'type'}
              fullWidth
              value={type}
              onChange={onChangeOperator}
            >
              {['Proprietor', 'Agent'].map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} className={`${type? '' : 'hidden'}`}>
            <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
              {regLabel}
            </Typography>
            <div className={`!w-[100%] !p-0 !m-0 !rounded-lg`}>
              <span className={`!w-[40%] ${type === 'Proprietor'? '' : 'hidden'}`}>
                <Select
                  label=""
                  variant="outlined"
                  defaultValue=""
                  name={'bizType'}
                  value={bizType}
                  onChange={e => setBizType(e.target.value)}
                >
                {[{name: "Registered Corporation",
                  value: "RC"}, {name: "Business Name", value: "BN"}]
                  .map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.name}
                    </MenuItem>
                  ))}
              </Select>
              </span>
              <span className={`![60%]`}>
                <TextField
                  label={`${regLabel} *`}
                  variant="outlined"
                  name={'regNumber'}
                  value={formik.values.regNumber}
                  onChange={formik.handleChange}
                  error={formik.touched.regNumber && Boolean(formik.errors.regNumber)}
                  helperText={formik.touched.regNumber && formik.errors.regNumber}
                  className={`${type === 'Proprietor'? '!w-[59%]' : '!w-[99%]'} !ml-2.5 !rounded-lg`}
                />
              </span>
            </div>
            {/*<TextField*/}
            {/*  label={`${regLabel} *`}*/}
            {/*  variant="outlined"*/}
            {/*  name={'regNumber'}*/}
            {/*  fullWidth*/}
            {/*  value={formik.values.regNumber}*/}
            {/*  onChange={formik.handleChange}*/}
            {/*  error={formik.touched.regNumber && Boolean(formik.errors.regNumber)}*/}
            {/*  helperText={formik.touched.regNumber && formik.errors.regNumber}*/}
            {/*/>*/}
          </Grid>
          <Grid item xs={12} className={`${type === 'Agent'? '' : 'hidden'}`}>
            <TextField
              label="First Name *"
              variant="outlined"
              name={'firstname'}
              fullWidth
              value={formik.values.firstname}
              onChange={formik.handleChange}
              error={formik.touched.firstname && Boolean(formik.errors.firstname)}
              helperText={formik.touched.firstname && formik.errors.firstname}
            />
          </Grid>
          <Grid item xs={12} className={`${type === 'Agent'? '' : 'hidden'}`}>
            <TextField
              label="Last Name *"
              variant="outlined"
              name={'lastname'}
              fullWidth
              value={formik.values.lastname}
              onChange={formik.handleChange}
              error={formik.touched.lastname && Boolean(formik.errors.lastname)}
              helperText={formik.touched.lastname && formik.errors.lastname}
            />
          </Grid>
          <Grid item xs={12} className={`${type === 'Agent'? '' : 'hidden'} `}>
            <Textarea
              label="Operating Address Line *"
              variant="outlined"
              rows={4}
              placeholder="Operating Address Line *"
              className={`!w-[100%] !rounded-lg`}
              name={'address'}
              fullWidth
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
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
                <Button size={'large'}
                        fullWidth
                        variant={'contained'}
                        type={'submit'}
                        className={`!w-[100%] !bg-gray-950 !text-white-a700 !p-4 !rounded-lg ${verifying? '!hidden':''}`}
                >
                  Verify
                </Button>
              <ProgressButton saving={verifying} width={'w-[100%]'} position={'justify-center'} text={'Verifying...'} />
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}