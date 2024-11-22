import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

const Footer = () => {
  const theme = useTheme();
  const { mode } = theme.palette;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          width={1}
          flexDirection={{ xs: 'column', sm: 'row' }}
        >
          <Box
            display={'flex'}
            component="a"
            href="/"
            title="theFront"
            width={80}
          >
            <Box
              component={'img'}
              src={
                mode === 'light'
                  ? 'https://res.cloudinary.com/dyvxnpvxa/image/upload/v1731912680/ogs5jo79c75b1usdcc90.svg'
                  : 'https://res.cloudinary.com/dyvxnpvxa/image/upload/v1731912680/ogs5jo79c75b1usdcc90.svg'
              }
              height={0.5}
              width={0.5}
            />
          </Box>
          <Box display="flex" flexWrap={'wrap'} alignItems={'center'}>
            <Box marginTop={1} marginRight={2}>
              <Link
                underline="none"
                component="a"
                href="/"
                color="text.primary"
                variant={'subtitle2'}
                className="hover:text-[#1976d2]"
              >
                Home
              </Link>
            </Box>
            <Box marginTop={1}>
              <Button
                variant="outlined"
                color="primary"
                component="a"
                target="_self"
                href="/apply"
                size="small"
                className="hover:!bg-[#1976d2] hover:!text-white-a700"
              >
                Apply Now
              </Button>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography
          align={'center'}
          variant={'subtitle2'}
          color="text.secondary"
          gutterBottom
        >
          &copy; Meld-Tech. 2024. All rights reserved.
        </Typography>
        <Typography
          align={'center'}
          variant={'caption'}
          color="text.secondary"
          component={'p'}
        >
          When you visit or interact with our web application, we or
          our authorised service providers may use cookies for storing
          information to help provide you with a better, faster and safer
          experience.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Footer;
