import React, { useEffect, useState } from "react";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { getItem, GetPublicFileService as generateReference } from "../../../../../../services";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../../../../../ui-components/Loader";

const APPLICATION_REFERENCE_URL = process.env.REACT_APP_GENERATE_DOCUMENT_REFERENCE_URL;
const Hero = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  const [operator, setOperator] = useState({});
  const navigate = useNavigate();
  const { documents, isLoading} = generateReference(APPLICATION_REFERENCE_URL);

  useEffect(() => {
    const verified = getItem('operator');
    verified? setOperator(JSON.parse(verified)) : navigate('/apply');
  }, [navigate]);

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
        }} className={`${isLoading? 'hidden':''}`}>
          <span style={{ fontWeight: 4700 }}> Application #:</span>
          <span style={{ color: 'darkblue'}}>{documents?.data}</span>
        </Typography>
        <span className={`${isLoading? '':'hidden'}`}>
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
          {operator?.name}
        </Typography>
        <Typography component={'h4'} sx={{
          fontWeight: 400,
          color: "#616161",
          fontSize: "1rem"
        }}>
          {operator?.type}{` `}{operator?.idNumber}
        </Typography>
        <Typography component={'h4'} sx={{
          fontWeight: 400,
          color: "#FFFFFF",
          fontSize: "1rem",
          backgroundColor: (operator?.details?.status?.status === 'verified')? 'green' : 'red',
          borderRadius: '10px',
          textAlign: 'center'
        }}>
          {operator?.details?.status?.status}
        </Typography>
        <Typography component={'h4'} sx={{
          fontWeight: 400,
          color: "#616161",
          fontSize: "1rem"
        }}>
          {operator?.address}
        </Typography>
      </Box>
    </Box>
  );
};

export default Hero;