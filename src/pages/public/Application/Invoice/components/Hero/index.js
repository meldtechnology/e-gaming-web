import React, { useEffect, useState } from "react";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { getItem } from "../../../../../../services";
import { Loader } from "../../../../../../ui-components/Loader";

const Index = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  const [form, setForm] = useState(null);

  console.log("form ", form);

  useEffect(() => {
    const appForm = getItem('applicationForm');
    if(appForm !== undefined) setForm(JSON.parse(appForm));
  }, []);

  return (
    <Box data-aos={isMd ? 'fade-right' : 'fade-up'}
         display="flex"
         flexDirection={{ xs: 'column', sm: 'row' }}
         alignItems={{ xs: 'stretched', sm: 'center' }}
         justifyContent={'space-between'}
         width={1}
        >
      <Box>
        <Box
          component={'img'}
          loading="lazy"
          src={'https://res.cloudinary.com/dyvxnpvxa/image/upload/v1731948390/h6n0cce2dtcacy4dn0h7.svg'}
          height={0.3}
          width={0.3}
        />
        <Typography component={'h4'} sx={{
          fontWeight: 400,
          color: "black",
          textAlign: "center",
          fontSize: "0.9rem"
        }} className={`${form === null? 'hidden':''}`}>
          <span style={{ fontWeight: 4700 }}> Application #:</span>
          <span style={{ color: 'darkblue'}}>{form?.reference}</span>
        </Typography>
        <span className={`${form === null? '':'hidden'}`}>
          <Loader />
        </span>
      </Box>
      <Typography component={'h4'} sx={{
        fontWeight: 400,
        color: "#616161",
        textAlign: "center",
        fontSize: "2.4rem"
      }}>
        Operator Application
      </Typography>
      <Box>
        <Typography component={'h4'} sx={{
          fontWeight: 400,
          color: "#616161",
          fontSize: "1rem"
        }}>
          {form?.applicant?.name}
        </Typography>
        <Typography component={'h4'} sx={{
          fontWeight: 400,
          color: "#616161",
          fontSize: "1rem"
        }}>
          {form?.applicant?.type}{` `}{form?.applicant?.id}
        </Typography>
      </Box>
    </Box>
  );
};

export default Index;