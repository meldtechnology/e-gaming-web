import Container from "../../mui/components/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";
import Grid from "@mui/material/Grid";

export const ReviewForm = ({ onClick, fileData }) => {
  const data = fileData[0];
  console.log(data);
  return (
    <Container>
      <Box>
        <Box display={'block'}
             overflow={'hidden'}>
          <button type="button"
                  onClick={onClick}
                  className="w-[10%] rounded-xl px-3 py-2 text-sm font-semibold bg-red-600 text-white-a700 hover:text-white-a700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-400 sm:mt-0 sm:w-auto float-right">
            <span className="min-w-full text-center">X</span>
          </button>
        </Box>
        <Box>
          <Typography
            variant="h4"
            align={'center'}
            data-aos={'fade-up'}
            gutterBottom
            sx={{
              fontWeight: 700,
            }}
          >
            {data?.fileName} ({data?.code})
          </Typography>
          <Typography
            variant="h6"
            align={'center'}
            data-aos={'fade-up'}
            gutterBottom
            sx={{
              fontWeight: 700,
            }}
          >
            Document Approval Screen
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box paddingX={'5%'}>
              <Typography
                variant="p"
                align={'justify'}
                data-aos={'fade-up'}
                gutterBottom
                sx={{
                  color: '#636363',
                }}
              >
                Review the submitted document below. If you need to still evaluate this document
                further, you can use the <strong>"Reviewing"</strong> button to to place it on hold
                till the evaluation/investigation process is completed. Please note
                that you can keep updating your reviewal comment upto 1000 letters.
              </Typography>
              <div>
                ESG-5462399749088317
                {data?.reference}
              </div>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}