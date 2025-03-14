import { useParams } from "react-router-dom";
import Main from "../../../../mui/layouts/Main";
import { GetLicenseService } from "../../../../services/document";
import Container from "../../../../mui/components/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React from "react";

const GET_LICENCE_URL = process.env.REACT_APP_DOCUMENTS_LICENSE_NUMBER_URL;
export const LicenseDetails = () => {
  const { number } = useParams();
  const { license } = GetLicenseService(`${GET_LICENCE_URL}${number}`);
  console.log(license);
  const isValid = (expiresDate, type) => {
    const daysLeft = new Date(expiresDate).getTime() - new Date();
    const days
      = Math.round(daysLeft / (1000 * 3600 * 24));
    console.log(days);
    return (type === 1) ?
      days > 0 ? 'VALID' : 'EXPIRED' :
      days > 0;
  }
  return (
    <Main>
      <Container>
        <Box>
          <Box marginBottom={4}>
            <Typography
              variant="h4"
              align={'center'}
              data-aos={'fade-up'}
              gutterBottom
              sx={{
                fontWeight: 700,
              }}
            >
              Enugu State Gaming Commission License Validation
            </Typography>
            <Typography
              variant="h6"
              align={'center'}
              color={'text.secondary'}
              data-aos={'fade-up'}
            >
              Please see below the status of your license.
            </Typography>
          </Box>
          <Grid container spacing={6}>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              className={'w-full'}
              data-aos={'fade-up'}
              data-aos-offset={100}
              data-aos-duration={600}
            >
              <Box display={'block'} width={1} height={1}>
                <Box
                  component={Card}
                  width={1}
                  height={1}
                  display={'block'}
                >
                  <CardContent>
                    <Typography
                      variant={'h6'}
                      align={'left'}
                      bgcolor={'#CECECE'}
                      padding={'0.4rem'}
                      paddingLeft={'0.8rem'}
                      sx={{ fontWeight: 700 }}
                    >
                      LICENSE NAME
                    </Typography>
                    <Typography
                      variant={'h4'}
                      align={'center'}
                      sx={{ fontWeight: 700 }}
                    >
                       {license?.data?.fileName}
                    </Typography>
                    <Typography
                      variant={'h6'}
                      align={'left'}
                      bgcolor={'#CECECE'}
                      padding={'0.4rem'}
                      paddingLeft={'0.8rem'}
                      sx={{ fontWeight: 700 }}
                    >
                      LICENCE FOR
                    </Typography>
                    <Typography
                      variant={'h4'}
                      align={'center'}
                      sx={{ fontWeight: 700 }}
                    >
                       {license?.data?.applicant?.name}
                    </Typography>
                    <Typography
                      variant={'p'}
                      align={'center'}
                      sx={{  fontSize: '1.6rem' }}
                      className={'!justify-items-center'}
                    >
                      This license is valid for <strong>{license?.data?.validity}</strong> days only.
                      <br />
                      <span className={`${isValid(license?.data?.expiresOn, 0)?'':'hidden'} text-green-700 text-[2.8rem] text-center font-bold`}>
                      {isValid(license?.data?.expiresOn, 1)}
                    </span>
                      <span className={`${isValid(license?.data?.expiresOn, 0)?'hidden':''} text-red-700 text-[2.8rem] text-center font-bold`}>
                      {isValid(license?.data?.expiresOn, 1)}
                    </span>
                      <br />
                      The License was issued on {' '}
                      <strong>{new Date(license?.data?.issuedOn).toDateString()}</strong>
                      { ' and expires ' }
                      <strong>{new Date(license?.data?.expiresOn).toDateString()}</strong>
                    </Typography>
                  </CardContent>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Main>
  );
}