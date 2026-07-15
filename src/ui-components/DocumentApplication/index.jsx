import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";
import { DocumentForm } from "../DocumentForm";

export const DocumentApplication = ({document}) => {
  const application = document[0];

  const highlightStatus = (status) => {
    return status === 'PAID' ? 'bg-success text-text-inverse' : 'bg-danger text-text-inverse'
  }

  const highlightAppStatus = (status) => {
    return status === 'PENDING' ? 'bg-warning text-text-inverse' :
      (status === 'REVIEW') ? 'bg-brand text-on-brand' :
      (status === 'APPROVE') ? 'bg-success text-text-inverse' :
      (status === 'ISSUED') ? 'bg-info text-text-inverse' : 'bg-danger text-text-inverse';
  }

  return (
    <Box>
      <Box margin={0}
           width={1}
           bgcolor={'background.level2'}
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
          <span className={`${highlightAppStatus(application?.status)} p-2 rounded-full float-left`}>
            {application?.status}
          </span>
            <span
              className={`${highlightStatus(application?.paymentStatus)} p-2 rounded-full float-right`}>
          {application?.paymentStatus? application?.paymentStatus:'NOT PAID'}
        </span>
          </p>
        </Typography>
      </Box>
      <Box marginTop={'2%'}
           width={1}
           bgcolor={'background.level2'}
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
           bgcolor={'background.paper'}
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
      <Box marginTop={'2%'}
           width={1}
           bgcolor={'background.paper'}
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
          Attachments submitted
        </Typography>
        {
          application?.attachments?.map((item, idx) => (
            <div key={idx} className={'w-full p-4 text-brand'}>
              <a href={item?.url} target='_blank' rel="noreferrer">
                {item?.name}.pdf
              </a>
            </div>
          ))
        }
      </Box>
    </Box>
  );
}
