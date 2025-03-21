import Container from "../../mui/components/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import { DocumentHistory } from "../DocumentHistory";
import { DocumentApplication } from "../DocumentApplication";
import { DocumentReviewForm } from "../DocumentReviewForm";
import { useNavigate } from "react-router-dom";
import { checkPermission } from "../../services/autorization";

export const ReviewForm = ({ onClick, fileData }) => {
  const data = fileData[0];
  const navigate = useNavigate();

  useEffect(() => {
    if(fileData[0] === null) {
      navigate('/app/applications', { replace: true});
    }
  }, [navigate, fileData]);

  if(fileData[0] === null) return ;

  return (checkPermission('CAN_REVIEW_APPLICATION') === '' ||
  checkPermission('CAN_APPROVE_APPLICATION') === '') ? (
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
  ) : (
    <>
      <div className="mr-11 mt-[26px] block justify-items-center gap-5 md:mr-0 md:flex-col">
        <div className={'mt-8 p-4 text-center text-[2.1rem] text-red-600 font-bold'}>
          Access Denied! - You do not have sufficient access to view the screen
        </div>
        <div className={'w-[70%] h-[]70%'}>
          <img src={'/images/enugu_logo2.png'} alt={'Enugu_logo'} className={'w-full h-full'} />
        </div>
      </div>
    </>
  );
}