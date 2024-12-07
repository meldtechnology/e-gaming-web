import { formatAmount, getItem, removeAll, storeItem, updateForm } from "../../../../../../services";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { createInitialValues } from "../../../../../../services/createInitialValues";
import { FormBuilder } from "../../../../../../ui-components/Form/VitalForm/FormBuilder";
import { createSchema } from "../../../../../../services/createSchema";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import {
  CreatePublicApplicationService as createApp } from "../../../../../../services/document/CreatePublicApplicationService";
import { MeldAlert } from "../../../../../../ui-components/Alerts";
import { AlertType } from "../../../../../../ui-components/Alerts/AlertType";

const defaultImg = [
  {
    casino: 'https://images.unsplash.com/photo-1517232115160-ff93364542dd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FzaW5vfGVufDB8fDB8fHww'
  },
]

const ADD_APPLICATION_URL = process.env.REACT_APP_CREATE_DOCUMENT_URL;
export const Details = ({reference}) => {
  const [file, setFile] = useState({});
  const [initialValue, setInitialValue] = useState({});
  const [schema, setSchema] = useState({});
  const [operator, setOperator] = useState({});
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const { addApplication } = createApp(ADD_APPLICATION_URL);

  const onSubmit = async (values, { setSubmitting }) => {
    // Handle form submission (e.g., send data to the server)
    const result = await addApplication(constructApp(values));
    if(result?.error !== undefined){
      setIsError(true);
      setErrorMsg(result?.error?.data?.userMessage);
    }
    else {
      removeAll();
      storeItem('feeType', file?.feeType);
      storeItem('applicationForm', JSON.stringify(result?.data?.data));
      navigate('/apply/payment/invoice', { replace: true});
    }
    setSubmitting(false);
    closeAlert(5000);
  }

  const constructApp = (values) => {
    return {
      amountPaid: 0,
      amountPayable: file?.value,
      applicant: {
        name: operator?.name,
        id: operator?.idNumber,
        type: operator?.type
      },
      applicantPublicId: operator?.idNumber,
      fileName: file?.name,
      code: file?.code,
      feeType: file?.feeType,
      formData: {
        formTemplate: updateForm(file?.formTemplate, values)
      },
      reference,
      requester: operator?.name,
      typeName: file?.typeName,
      validity: file?.renewalDuration
    }
  }

  const closeAlert = (duration) => {
    setTimeout(()=> {
      setIsError(false);
    }, duration);
  }

  useEffect(() => {
    const permit = getItem('permit');
    const verified = getItem('operator')
    if(permit !== undefined) setFile(JSON.parse(getItem('permit')));
    if(!verified) navigate('/apply') ;
    else setOperator(JSON.parse(verified))
  }, [navigate]);

  useEffect(() => {
    if(file !== undefined) {
      setInitialValue(createInitialValues(file?.formTemplate));
      setSchema(createSchema(file?.formTemplate));
    }
  }, [file]);

  return (
    <Box border={'gray'}
         boxShadow={'inherit'}
         display={'flex'}
         alignItems={'center'}
         justifyContent={'center'}
         sx={{ flexGrow: 1 }}
    >
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
                   height={'34rem'}
                   borderRadius={'10px'}
                   paddingBottom={'1rem'}
                   bgcolor={'#f2f2f2'}
              >
                <Box component={'img'}
                     src={(file?.logo)? file?.logo : defaultImg[0].casino}
                     width={1}
                     height={'12.9rem'}
                     borderRadius={'10px 10px 0 0'}/>
                <Box paddingX={'1rem'} >
                  <Typography component={'h1'}
                              marginY={'0.5rem'}
                              sx={{
                                fontWeight: 700,
                                fontSize: '1.5rem'
                              }}
                  >
                    {file?.name}
                  </Typography>
                  <Typography component={'p'}
                              marginBottom={'0.4rem'}
                              paddingBottom={'1.6rem'}
                  >
                    {file?.description} <br />Valid for <span style={{ fontWeight: 700}}>{file?.renewalDuration}</span> days
                  </Typography>
                  <Typography component={'p'} sx={{ fontSize: 'large'}}
                  >
                    <span style={{ fontWeight: 700, color: '#636363', display: 'block'}}>Amount: </span>
                    <span style={{ fontWeight: 700, fontSize: 'xx-large', color: 'red' }}>
                  ₦ {formatAmount(file?.value)} {file?.feeType?.includes('FLAT')?'':'% of Revenue'}
                </span>
                  </Typography>
                </Box>
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
            <Box width={1}
                 borderRadius={'10px'}
                 padding={'1rem'}
                 bgcolor={'#f2f2f2'}>
              {file?.formTemplate ? (
                <FormBuilder formConfig={file?.formTemplate}
                             initialValues={initialValue}
                             validationSchema={schema}
                             onSubmit={onSubmit} />
              ) : (
                <div className={`py-[25%]`}>
                  <h1 className={`text-red-700 text-center text-[2.4rem]`}>
                    No Document Form is Available!
                  </h1>
                </div>
              )}
            </Box>
            <div style={{ display: ( isError) ? '' : 'none' }}>
              <MeldAlert alertType={AlertType.ERROR} message={errorMsg} show={isError} />
            </div>
          </Grid>
        </Grid>
    </Box>
  );
}