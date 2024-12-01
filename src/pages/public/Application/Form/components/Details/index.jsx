import { formatAmount, getItem } from "../../../../../../services";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { createInitialValues } from "../../../../../../services/createInitialValues";
import { FormBuilder } from "../../../../../../ui-components/Form/VitalForm/FormBuilder";
import { createSchema } from "../../../../../../services/createSchema";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";

const defaultImg = [
  {
    casino: 'https://images.unsplash.com/photo-1517232115160-ff93364542dd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FzaW5vfGVufDB8fDB8fHww'
  },
]

export const Details = () => {
  const [file, setFile] = useState({});
  const [initialValue, setInitialValue] = useState({});
  const [schema, setSchema] = useState({});
  const navigate = useNavigate();

  const onSubmit = (values, { setSubmitting }) => {
    // Handle form submission (e.g., send data to the server)
    console.log("Form submitted with values:", values);
    setSubmitting(false);
  }

  useEffect(() => {
    const permit = getItem('permit');
    if(!getItem('operator')) navigate('/apply') ;
    if(permit !== undefined) setFile(JSON.parse(getItem('permit')));
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
                {file?.formTemplate? (
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
          </Grid>
        </Grid>
    </Box>
  );
}