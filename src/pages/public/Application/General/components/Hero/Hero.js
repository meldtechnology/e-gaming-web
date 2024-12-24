import React from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Link } from "react-router-dom";
const Hero = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <Box data-aos={isMd ? 'fade-right' : 'fade-up'}>
          <Box marginBottom={2}>
            <Typography
              variant="h3"
              color="text.primary"
              sx={{ fontWeight: 700 }}
            >
              <Typography
                color={'primary'}
                component={'span'}
                variant={'inherit'}
                sx={{
                  background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Experience a seamless{' '}
              </Typography>
              application for your gaming activities.
            </Typography>
          </Box>
          <Box marginBottom={3}>
            <Typography variant="h6" component="p" color="text.secondary">
              Apply for Casino, lottery, sport betting, pools betting and raffles:
            </Typography>
            <Box
              component={Button}
              variant="contained"
              color="primary"
              size="large"
              height={54}
              marginTop={2}
              className={`!bg-[#18801d] hover:bg-[#0f6b14]`}
            >
              <Link to={`/apply/operator/Proprietor`}>
                See gaming Permits
              </Link>
            </Box>
          </Box>
          <Box
            paddingX={2}
            paddingY={1}
            bgcolor={'alternate.dark'}
            borderRadius={2}
          >
            <Typography variant="body1" component="p">
              Apply for your license, pay and get it reviewed and delivered speedily.*
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        container
        alignItems={'center'}
        justifyContent={'center'}
        xs={12}
        md={6}
      >
        <Box
          component={'img'}
          loading="lazy"
          height={1}
          width={1}
          borderRadius={'5px'}
          src={'https://res.cloudinary.com/dh1mgjbev/image/upload/v1734086648/Shutterstock_online_betting-smaller-size_s5wyt8.png'}
          alt="..."
          maxWidth={600}
        />
      </Grid>
    </Grid>
  );
};

export default Hero;