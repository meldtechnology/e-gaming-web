import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { formatAmount, getItem } from "../../../../../../services";
import * as yup from "yup";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { CustomerInvoiceInfo } from "../../../../../../ui-components/CustomerInvoiceInfo";
import { ProgressButton } from "../../../../../../ui-components/Form/component/ProgressButton";
import { CreatePublicPayment  as generateInvoice } from "../../../../../../services/payments";
import { MeldAlert } from "../../../../../../ui-components/Alerts";
import { AlertType } from "../../../../../../ui-components/Alerts/AlertType";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Invalid Email")
    .required('Please provide email.'),
  confirmEmail: yup
      .string()
      .email("Invalid Confirm Email")
    .oneOf([yup.ref('email'), null], 'Email must match')
      .required('Please provide confirm email.'),

});

const GET_INVOICE_URL = process.env.REACT_APP_CREATE_PAYMENTS_BASE_URL;
export const PaymentInvoice = () => {
  const [form, setForm] = useState({});
  const [reference, setReference] = useState('');
  const [showReference, setShowReference] = useState(false);
  const [show, setShow] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { addPayment, invoices } = generateInvoice(GET_INVOICE_URL);

  const initialValues = {
    email: '',
    confirmEmail: ''
  }

  const onSubmit =  async (values) => {
    console.log(values);
    alert(form);
    setShow(true);
    const paymentData = {
      amountPayable: form?.amountPayable,
      description: `Payment for ${form?.code} was requested by ${form?.applicant?.name}`,
      itemCode: form?.serviceTypeCode,
      payerEmail: values.email,
      payerName: form?.applicant?.name,
      payerPhone: "08031154652",
      reference: form?.reference,
      requester: form?.applicant?.name
    }
    const result = await  addPayment(paymentData);
    if(result?.error !== undefined){
      setIsError(true);
      setErrorMsg(result?.error?.data?.userMessage);
    }
    else {
      setShowReference(true);
    }
    setShow(false);
  }

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit,
  });

  useEffect(() => {
    const appForm = getItem('applicationForm');
    if(appForm !== undefined) setForm(JSON.parse(appForm));
    if(invoices) setReference(invoices?.data?.externalReference);
  }, [invoices]);

  return (
      <Box border={'gray'}
           boxShadow={'inherit'}
           display={'flex'}
           alignItems={'center'}
           justifyContent={'center'}
           sx={{ flexGrow: 1 }} >
        <Grid container spacing={2}  >
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            data-aos={'fade-up'}
            data-aos-offset={100}
            data-aos-duration={600}
          >
            <Box width={'100%'}
                 borderRadius={'10px'}
                 padding={'1rem'}
                 bgcolor={'#f2f2f2'}
            >
              <Typography component={'h1'}
                          marginY={'0.5rem'}
                          sx={{
                            fontWeight: 700,
                            fontSize: '1.2rem'
                          }}
              >
                Get Customer Retrieval Reference
              </Typography>
              <Typography component={'h4'}
                          marginY={'0.5rem'}
                          sx={{
                            fontWeight: 700,
                            fontSize: '1rem',
                            color: 'red'
                          }}
              >
                Application Amount (NGN)
              </Typography>
              <Typography width={1}
                          bgcolor={'#DEDEDE'}
                          paddingY={'2%'}
                          textAlign={'center'}
                          sx={{
                            fontWeight: 700,
                            fontSize: '1.5rem',
                            color: '#636363'
                          }}
              >
                ₦ {formatAmount(form?.amountPayable)}
              </Typography>
              <Typography component={'h1'}
                          marginY={'0.5rem'}
                          sx={{
                            fontWeight: 700,
                            fontSize: '1.2rem'
                          }}
              >
                Your Information
              </Typography>
              <form onSubmit={formik.handleSubmit} className={`${showReference?'hidden':''}`}>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
                      Enter your Payment alert email
                    </Typography>
                    <TextField
                      label={`Email *`}
                      variant="outlined"
                      name={'email'}
                      fullWidth
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={formik.touched.email && Boolean(formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label={`Confirm Email *`}
                      variant="outlined"
                      name={'confirmEmail'}
                      fullWidth
                      value={formik.values.confirmEmail}
                      onChange={formik.handleChange}
                      error={formik.touched.confirmEmail && Boolean(formik.errors.confirmEmail)}
                      helperText={formik.touched.confirmEmail && formik.errors.confirmEmail}
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
                              className={`${form?.amountPayable === 0 || form?.amountPayable === undefined? '!hidden':''} !w-[100%] !bg-gray-950 !text-white-a700 !p-4 !mb-4 !rounded-lg ${show?'!hidden':''}`}
                      >
                        Get Customer Invoice
                      </Button>
                      <ProgressButton saving={show} width={'w-[100%]'} position={'justify-center'}
                                      text={'Generating...'} />
                    </Box>
                  </Grid>
                </Grid>
              </form>
              <MeldAlert alertType={AlertType.ERROR} message={errorMsg} show={isError} />
              <CustomerInvoiceInfo invoiceNumber={reference} show={showReference} />
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            md={8}
            data-aos={'fade-up'}
            data-aos-offset={100}
            data-aos-duration={600}
          >
            <Box width={'100%'}
            borderRadius={'10px'}
            padding={'1rem'}
            >
              <Typography component={'h1'}
                          marginY={'0.5rem'}
                          sx={{
                            fontWeight: 700,
                            fontSize: '1.2rem'
                          }}
                          borderBottom={'solid thin #CECECE'}
                          paddingBottom={'1.4rem'}
              >
                Application Summary
              </Typography>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Typography component={'span'}
                              sx={{
                                fontWeight: 700,
                                fontSize: '1rem',
                                color: '#0000F6'
                              }}
                              paddingRight={'1rem'}
                  >
                    {form?.reference}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography component={'span'}
                              sx={{
                                fontWeight: 700,
                                fontSize: '1rem'
                              }}
                              paddingRight={'1rem'}
                  >
                    Permit Name:
                  </Typography>
                  <Typography component={'span'}
                              sx={{
                                fontWeight: 300,
                                fontSize: '1rem'
                              }}
                  >
                    {form?.fileName}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography component={'span'}
                              sx={{
                                fontWeight: 700,
                                fontSize: '1rem'
                              }}
                              paddingRight={'1rem'}
                  >
                    Permit Type:
                  </Typography>
                  <Typography component={'span'}
                              sx={{
                                fontWeight: 300,
                                fontSize: '1rem'
                              }}
                  >
                    {form?.typeName}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography component={'span'}
                              sx={{
                                fontWeight: 700,
                                fontSize: '1rem'
                              }}
                              paddingRight={'1rem'}
                  >
                    Validity Period:
                  </Typography>
                  <Typography component={'span'}
                              sx={{
                                fontWeight: 300,
                                fontSize: '1rem'
                              }}
                  >
                    {form?.validity} days
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography component={'span'}
                              sx={{
                                fontWeight: 700,
                                fontSize: '1rem'
                              }}
                              paddingRight={'1rem'}
                  >
                    Application Date:
                  </Typography>
                  <Typography component={'span'}
                              sx={{
                                fontWeight: 300,
                                fontSize: '1rem'
                              }}
                  >
                    {Date(form?.submittedOn)}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>

        </Grid>
      </Box>
  );
}
