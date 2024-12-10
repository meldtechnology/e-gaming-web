import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";
import { DocumentForm } from "../DocumentForm";

export const DocumentApplication = ({document}) => {
  const application = document[0];

  const highlightStatus = (status) => {
    return status === 'PAID'? 'bg-[#309630]' : 'bg-[#963030]'
  }

  const highlightAppStatus = (status) => {
    return status === 'PENDING'? 'bg-orange-600' :
      (status === 'REVIEW') ? 'bg-purple-600' :
      (status === 'APPROVE') ? 'bg-purple-600' : 'bg-red-600';
  }

  return (
    <Box>
      <Box margin={0}
           width={1}
           bgcolor={'#CECECE'}
           paddingY={'3%'}
           paddingLeft={'2%'}
           borderRadius={'10px'} >
        <Typography
          variant="p"
          data-aos={'fade-up'}
          gutterBottom
          sx={{
            fontWeight: 400,
          }}
        >
          <strong>Ref:</strong> {application?.reference} <br />
          <strong>Type:</strong> {application?.typeName} <br />
          <strong>Valid For:</strong> {application?.validity} days <br />
          <p className='overflow-hidden pr-4 pb-2 mt-2'>
          <span className={`${highlightAppStatus(application?.status)} text-white-a700 p-2 rounded-full float-left`}>
            {application?.status}
          </span>
            <span
              className={`${highlightStatus(application?.paymentStatus)} text-white-a700 p-2 rounded-full float-right`}>
          {application?.paymentStatus? application?.paymentStatus:'NOT PAID'}
        </span>
          </p>
        </Typography>
      </Box>
      <Box marginTop={'2%'}
           width={1}
           bgcolor={'#CECECE'}
           paddingY={'3%'}
           paddingX={'5%'}
           borderRadius={'10px'} >
        <Typography
          variant="p"
          data-aos={'fade-up'}
          gutterBottom
          sx={{
            fontWeight: 400,
          }}
        >
          <strong>Applicant:</strong> {application?.applicant?.name} <br />
          <strong>Registration Number:</strong> {application?.applicant?.id} <br />
          <strong>Registration Type:</strong> {application?.applicant?.type} <br />
        </Typography>
      </Box>
      <Box marginTop={'2%'}
           width={1}
           bgcolor={'#FEFEFE'}
           paddingY={'3%'}
           paddingX={'5%'}
           borderRadius={'10px'} >
        <Typography
          variant="p"
          data-aos={'fade-up'}
          gutterBottom
          sx={{
            fontWeight: 700,
          }}
        >
          Form Details
        </Typography>
        <DocumentForm form={application?.formData?.formTemplate} />
      </Box>
    </Box>
  );
}