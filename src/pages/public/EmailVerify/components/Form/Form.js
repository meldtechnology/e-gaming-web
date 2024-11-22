/* eslint-disable react/no-unescaped-entities */
import { useFormik } from 'formik';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState } from "react";
import { UpdateUserService as verifyOtp } from "../../../../../services";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../../../../ui-components/Loader";
import { MeldAlert } from "../../../../../ui-components/Alerts";
import { AlertType } from "../../../../../ui-components/Alerts/AlertType";

const validationSchema = yup.object({
  email: yup
    .string()
    .required('Email is required.'),
  password: yup
    .string()
    .required('Please specify your password')
    // .min(8, 'The password should have at minimum length of 8'),
});


const VERIFY_OTP_URL = process.env.REACT_APP_VERIFY_OTP_URL;
const Form = () => {
  const [otp, setOtp] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('Invalid Otp');
  const navigate = useNavigate();
  const { modifyPost, } = verifyOtp(`${VERIFY_OTP_URL}/${otp}`);

  const initialValues = {
    code1: '',
    code2: '',
    code3: '',
    code4: '',
    code5: '',
    code6: '',
  };

  const onSubmit = async (values) => {
    const userEntry = "".concat(values.code1, values.code2, values.code3, values.code4, values.code5, values.code6);
    if (userEntry.length === 6) {
      setOtp(userEntry);
      setVerifying(true);
      const result = await modifyPost(otp);
      if(result?.error !== undefined){
        setIsError(true);
        setErrorMsg(result?.error?.data?.userMessage);
      }
      else {
        navigate('/', { replace: true});
        resetForm(values);
      }
      setVerifying(false);
      closeAlert();
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
  });

  const resetForm = (values) => {
    values.code1 = '';
    values.code2 = '';
    values.code3 = '';
    values.code4 = '';
    values.code5 = '';
    values.code6 = '';
  }

  const closeAlert = () => {
    setTimeout(()=> setIsError(false), 5000);
  }

  // use this simple function to automatically focus on the next input
  function focusNextInput(el, prevId, nextId) {
    if (el.value.length === 0) {
      if (prevId) {
        document.getElementById(prevId).focus();
      }
    } else {
      if (nextId) {
        document.getElementById(nextId).focus();
      }
    }
  }

  document.querySelectorAll('[data-focus-input-init]').forEach(function(element) {
    element.addEventListener('keyup', function() {
      const prevId = this.getAttribute('data-focus-input-prev');
      const nextId = this.getAttribute('data-focus-input-next');
      focusNextInput(this, prevId, nextId);
    });

// Handle paste event to split the pasted code into each input
    element.addEventListener('paste', function(event) {
      event.preventDefault();
      const pasteData = (event.clipboardData || window.clipboardData).getData('text');
      const digits = pasteData.replace(/\D/g, ''); // Only take numbers from the pasted data

      // Get all input fields
      const inputs = document.querySelectorAll('[data-focus-input-init]');

      // Iterate over the inputs and assign values from the pasted string
      inputs.forEach((input, index) => {
        if (digits[index]) {
          input.value = digits[index];
          // Focus the next input after filling the current one
          const nextId = input.getAttribute('data-focus-input-next');
          if (nextId) {
            document.getElementById(nextId).focus();
          }
        }
      });
    });
  });

  return (
    <Box width={0.7} marginX={'auto'}>
      <Box marginBottom={4} >
        <Typography
          variant="h4"
          sx={{
            textTransform: 'uppercase',
            fontWeight: 700,
          }}
          gutterBottom
          color={'text.secondary'}
          textAlign={'center'}
        >
          Verify & Activate Your Account
        </Typography>
      </Box>
      <Box alignItems={'center'}
           justifyItems={'center'}
           padding={'1rem'}
      >
        <div className={`${verifying ? "" : "hidden"} block mb-2 space-x-2 rtl:space-x-reverse`}>
          <Loader />
          <p className="text-blue-600 text-center text-[16px]">
            Verifying the provided OTP...
          </p>
        </div>
        <form onSubmit={formik.handleSubmit} className={`${verifying ? "hidden" : ""}`}>
          <div className="flex mb-2 space-x-2 rtl:space-x-reverse">
            <div>
              <label className="sr-only">First code</label>
              <input type="text" maxLength="1"
                     data-focus-input-init=""
                     data-focus-input-next="code-2"
                     id="code-1"
                     name={'code1'}
                     value={formik.values.code1}
                     onChange={formik.handleChange}
                     className="block w-14 h-14 text-[1.4rem] py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                     required />
            </div>
            <div>
              <label className="sr-only">Second code</label>
              <input type="text" maxLength="1"
                     data-focus-input-init=""
                     data-focus-input-prev="code-1"
                     data-focus-input-next="code-3"
                     id="code-2"
                     name={'code2'}
                     value={formik.values.code2}
                     onChange={formik.handleChange}
                     className="block w-14 h-14 text-[1.4rem] py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                     required />
            </div>
            <div>
              <label className="sr-only">Third code</label>
              <input type="text" maxLength="1"
                     data-focus-input-init=""
                     data-focus-input-prev="code-2"
                     data-focus-input-next="code-4" id="code-3"
                     name={'code3'}
                     value={formik.values.code3}
                     onChange={formik.handleChange}
                     className="block w-14 h-14 text-[1.4rem] py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                     required />
            </div>
            <div>
              <label className="sr-only">Fourth code</label>
              <input type="text" maxLength="1"
                     data-focus-input-init=""
                     data-focus-input-prev="code-3"
                     data-focus-input-next="code-5" id="code-4"
                     name={'code4'}
                     value={formik.values.code4}
                     onChange={formik.handleChange}
                     className="block w-14 h-14 text-[1.4rem] py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                     required />
            </div>
            <div>
              <label className="sr-only">Fifth code</label>
              <input type="text" maxLength="1" data-focus-input-init=""
                     data-focus-input-prev="code-4"
                     data-focus-input-next="code-6"
                     id="code-5"
                     name={'code5'}
                     value={formik.values.code5}
                     onChange={formik.handleChange}
                     className="block w-14 h-14 text-[1.4rem] py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                     required />
            </div>
            <div>
              <label className="sr-only">Sixth code</label>
              <input type="text" maxLength="1"
                     data-focus-input-init=""
                     data-focus-input-prev="code-5" id="code-6"
                     name={'code6'}
                     value={formik.values.code6}
                     onChange={formik.handleChange}
                     className="block w-14 h-14 text-[1.4rem] py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-600 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                     required
                     onBlur={(e) => onSubmit(formik.values)}
                     onKeyUp={(e) => onSubmit(formik.values)}
              />
            </div>
          </div>
          <p id="helper-text-explanation" className="mt-2 text-sm text-center text-gray-900 dark:text-gray-400 mb-4">
            Please enter the 6 digit code we sent via email.</p>
            <MeldAlert alertType={AlertType.ERROR} message={errorMsg} show={isError} />
        </form>
      </Box>
    </Box>
  );
};

export default Form;
