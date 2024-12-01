import React, { useEffect, useState } from "react";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { getItem } from "../../../../../../services";
import { useNavigate } from "react-router-dom";
const Hero = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  const [operator, setOperator] = useState({});
  const navigate = useNavigate();

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
      <Box
        component={'img'}
        loading="lazy"
        src={'https://res.cloudinary.com/dyvxnpvxa/image/upload/v1731948390/h6n0cce2dtcacy4dn0h7.svg'}
        height={0.1}
        width={0.1}
      />
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