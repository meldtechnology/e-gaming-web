/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const Overview = ({operatorType}) => {
  return (
    <Box
      bgcolor={'#18801d'}
      borderRadius={2}
      paddingBottom={{ xs: 2, md: 0 }}
    >
      <Grid container data-aos="fade-up">
        <Grid item container alignItems="flex-start" xs={6} md={4}>

        </Grid>
        <Grid
          item
          container
          alignItems="center"
          xs={6}
          md={4}
          sx={{
            marginY: 2,
            paddingX: 1,
          }}
        >
          <Box marginBottom={2}>
            <Typography
              variant="h5"
              color="text.primary"
              align={'center'}
              sx={{ fontWeight: 700, color: 'common.white' }}
            >
              The {operatorType} application
            </Typography>
            <Typography align={'center'} sx={{ color: 'common.white' }}>
              See available operator permit/license type below:
            </Typography>
          </Box>
        </Grid>
        <Grid item container justifyContent="flex-end" xs={6} md={4}>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Overview;
