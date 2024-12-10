import Container from "../../mui/components/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";
import Grid from "@mui/material/Grid";
import { DocumentHistory } from "../DocumentHistory";
import { DocumentApplication } from "../DocumentApplication";
import { DocumentReviewForm } from "../DocumentReviewForm";

export const ReviewForm = ({ onClick, fileData }) => {
  const data = fileData[0];

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
            </Box>
          </Grid>
          <Grid item xs={12}>
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
                <Typography
                  variant="h5"
                  align={'center'}
                  data-aos={'fade-up'}
                  gutterBottom
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  Document History
                </Typography>
                <Box padding={'2%'}>
                  <DocumentHistory docHistory={fileData} />
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                data-aos={'fade-up'}
                data-aos-offset={100}
                data-aos-duration={600}
              >
                <Typography
                  variant="h5"
                  align={'center'}
                  data-aos={'fade-up'}
                  gutterBottom
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  Application Details
                </Typography>
                <DocumentApplication document={fileData} />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                data-aos={'fade-up'}
                data-aos-offset={100}
                data-aos-duration={600}
              >
                <Typography
                  variant="h5"
                  align={'center'}
                  data-aos={'fade-up'}
                  gutterBottom
                  sx={{
                    fontWeight: 700,
                    color: '#0000AE'
                  }}
                >
                  Application Review
                </Typography>
                <DocumentReviewForm application={fileData} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}