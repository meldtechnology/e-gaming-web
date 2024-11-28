import React from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
const Hero = ({ operatorType }) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <Box data-aos={isMd ? 'fade-right' : 'fade-up'}>
      <Box
        component={'img'}
        loading="lazy"
        src={'https://res.cloudinary.com/dyvxnpvxa/image/upload/v1731948390/h6n0cce2dtcacy4dn0h7.svg'}
        height={0.1}
        width={0.1}
        marginX={'auto'}
      />
      <Typography component={'h4'} sx={{
        fontWeight: 400,
        color: "#616161",
        textAlign: "center",
        fontSize: "2.4rem"
      }}>
        Operator Application
      </Typography>
    </Box>
  );
};

export default Hero;