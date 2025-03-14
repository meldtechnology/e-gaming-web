import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Checkbox, FormControlLabel, FormGroup, TextareaAutosize } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import { ProgressButton } from "../Form/component/ProgressButton";
import React, { useEffect, useState } from "react";
import { getItem, UpdateDocumentService as reviewApplication } from "../../services";
import { Loader } from "../Loader";
import { checkPermission } from "../../services/autorization";

const validationSchema = yup.object({
  comment: yup
    .string()
    .trim()
    .required('Review Comment is required.'),
});

const APPLICATION_URL = process.env.REACT_APP_DOCUMENTS_BASE_URL;
export const DocumentReviewForm = ({application}) => {
  const app = application[0];
  const [review, setReview] = useState(false);
  const [type, setType] = useState('REVIEW');
  const [user, setUser] = useState({});
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [disabled, setDisabled] = useState(app?.reviewedOn === undefined);
  const [showCheck, setShowCheck] = useState(app?.reviewedOn !== undefined);
  const [showLoader, setShowLoader] = useState(false);
  const [show, setShow] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { modifyDocument, }
    = reviewApplication(`${APPLICATION_URL}/${type}`);

  const initialValues = {
    comment: app?.comment,
  };

  const onSubmit = async (values) => {
    setShow(true);
    const reviewComment = {
      comment: values.comment,
      reference: app?.reference,
      requester: user?.username,
      requesterId: user?.publicId
    }
    const result = await modifyDocument(reviewComment);
    if(result?.error !== undefined){
        setIsError(true);
        setErrorMsg(result?.error?.data?.userMessage);
    }
    else {
      setIsSuccess(true);
      setDisabled(type === 'APPROVE' || type === 'DECLINE');
    }
    setShow(false);
  };

  const onReviewChange = async () => {
    setReview(true);
    setType('REVIEW');
    setShowLoader(true);
    if(formik.values.comment) {
      formik.submitForm();
      setShowCheck(true);
    }
    else {
      setReview(false);
      setIsError(true);
      setErrorMsg('Review Comment is required.')
    }
    setShowLoader(false);
  }

  const approveDecline = (selectedType) => {
    setType(selectedType);
    if(formik.values.comment) {
      formik.submitForm();
    }else {
      setIsError(true);
      setErrorMsg('Review Comment is required.')
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit,
  });

  useEffect(() => {
    const profile = getItem('profile')
    if(profile !== undefined) setUser(JSON.parse(profile));
  }, []);

  return (
    <Box className='!m-0'>
      <Box display={'flex'}>
        <Typography>
          <svg xmlns="http://www.w3.org/2000/svg"
               className={'w-[36px] h-[36px]'}
               viewBox="0 0 640 512">
            <path
              d="M88.2 309.1c9.8-18.3 6.8-40.8-7.5-55.8C59.4 230.9 48 204 48 176c0-63.5 63.8-128 160-128s160 64.5 160 128s-63.8 128-160 128c-13.1 0-25.8-1.3-37.8-3.6c-10.4-2-21.2-.6-30.7 4.2c-4.1 2.1-8.3 4.1-12.6 6c-16 7.2-32.9 13.5-49.9 18c2.8-4.6 5.4-9.1 7.9-13.6c1.1-1.9 2.2-3.9 3.2-5.9zM208 352c114.9 0 208-78.8 208-176S322.9 0 208 0S0 78.8 0 176c0 41.8 17.2 80.1 45.9 110.3c-.9 1.7-1.9 3.5-2.8 5.1c-10.3 18.4-22.3 36.5-36.6 52.1c-6.6 7-8.3 17.2-4.6 25.9C5.8 378.3 14.4 384 24 384c43 0 86.5-13.3 122.7-29.7c4.8-2.2 9.6-4.5 14.2-6.8c15.1 3 30.9 4.5 47.1 4.5zM432 480c16.2 0 31.9-1.6 47.1-4.5c4.6 2.3 9.4 4.6 14.2 6.8C529.5 498.7 573 512 616 512c9.6 0 18.2-5.7 22-14.5c3.8-8.8 2-19-4.6-25.9c-14.2-15.6-26.2-33.7-36.6-52.1c-.9-1.7-1.9-3.4-2.8-5.1C622.8 384.1 640 345.8 640 304c0-94.4-87.9-171.5-198.2-175.8c4.1 15.2 6.2 31.2 6.2 47.8l0 .6c87.2 6.7 144 67.5 144 127.4c0 28-11.4 54.9-32.7 77.2c-14.3 15-17.3 37.6-7.5 55.8c1.1 2 2.2 4 3.2 5.9c2.5 4.5 5.2 9 7.9 13.6c-17-4.5-33.9-10.7-49.9-18c-4.3-1.9-8.5-3.9-12.6-6c-9.5-4.8-20.3-6.2-30.7-4.2c-12.1 2.4-24.8 3.6-37.8 3.6c-61.7 0-110-26.5-136.8-62.3c-16 5.4-32.8 9.4-50 11.8C279 439.8 350 480 432 480z" />
          </svg>
        </Typography>
        <Typography align={'center'}
                    marginLeft={'5%'}
                    sx={{
                      fontWeight: 700
                    }}>
          Review Comment Below
        </Typography>
      </Box>
      <Box>
        <form onSubmit={formik.handleSubmit}>
          <TextareaAutosize
            maxRows={"10"}
            minRows={"5"}
            placeholder={'A maximum of 2,000 letters'}
            name={'comment'}
            value={formik.values.comment}
            onChange={formik.handleChange}
            className={`w-[100%]`}
          />
          <div className={`overflow-hidden block ${checkPermission('CAN_REVIEW_APPLICATION')} ${(showCheck)? 'hidden' : ''} ${showLoader?'hidden':''}`}>
            <FormGroup>
                <FormControlLabel name={'review'}
                                  onChange={onReviewChange}
                                  checked={review}
                                  required={true}
                                  control={<Checkbox  />} label={"Reviewed"} />
            </FormGroup>
          </div>
          <div className={`${showLoader?'':'hidden'}`}>
            <Loader />
          </div>
          <Box
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            alignItems={{ xs: 'stretched', sm: 'center' }}
            justifyContent={'right'}
            gap={'15px'}
            width={1}
            maxWidth={600}
            margin={'0 auto'}
            className={`!${checkPermission('CAN_APPROVE_APPLICATION')}`}
          >
            <Button size={"large"}
                    variant={"contained"}
                    type={"button"}
                    onClick={()=> approveDecline('DECLINE')}
                    className={`${show?'!hidden':''} ${(app?.declinedOn || app?.approvedOn)? '!hidden' : ''} !bg-red-600 !text-white-a700 !p-2 !rounded-lg`}
                    disabled={disabled}
            >
              <svg xmlns="http://www.w3.org/2000/svg"
                   className={"w-[24px] h-[24px]"}
                   fill="#FFFFFF"
                   viewBox="0 0 512 512">
                <path
                  d="M323.8 477.2c-38.2 10.9-78.1-11.2-89-49.4l-5.7-20c-3.7-13-10.4-25-19.5-35l-51.3-56.4c-8.9-9.8-8.2-25 1.6-33.9s25-8.2 33.9 1.6l51.3 56.4c14.1 15.5 24.4 34 30.1 54.1l5.7 20c3.6 12.7 16.9 20.1 29.7 16.5s20.1-16.9 16.5-29.7l-5.7-20c-5.7-19.9-14.7-38.7-26.6-55.5c-5.2-7.3-5.8-16.9-1.7-24.9s12.3-13 21.3-13L448 288c8.8 0 16-7.2 16-16c0-6.8-4.3-12.7-10.4-15c-7.4-2.8-13-9-14.9-16.7s.1-15.8 5.3-21.7c2.5-2.8 4-6.5 4-10.6c0-7.8-5.6-14.3-13-15.7c-8.2-1.6-15.1-7.3-18-15.2s-1.6-16.7 3.6-23.3c2.1-2.7 3.4-6.1 3.4-9.9c0-6.7-4.2-12.6-10.2-14.9c-11.5-4.5-17.7-16.9-14.4-28.8c.4-1.3 .6-2.8 .6-4.3c0-8.8-7.2-16-16-16l-97.5 0c-12.6 0-25 3.7-35.5 10.7l-61.7 41.1c-11 7.4-25.9 4.4-33.3-6.7s-4.4-25.9 6.7-33.3l61.7-41.1c18.4-12.3 40-18.8 62.1-18.8L384 32c34.7 0 62.9 27.6 64 62c14.6 11.7 24 29.7 24 50c0 4.5-.5 8.8-1.3 13c15.4 11.7 25.3 30.2 25.3 51c0 6.5-1 12.8-2.8 18.7C504.8 238.3 512 254.3 512 272c0 35.3-28.6 64-64 64l-92.3 0c4.7 10.4 8.7 21.2 11.8 32.2l5.7 20c10.9 38.2-11.2 78.1-49.4 89zM32 384c-17.7 0-32-14.3-32-32L0 128c0-17.7 14.3-32 32-32l64 0c17.7 0 32 14.3 32 32l0 224c0 17.7-14.3 32-32 32l-64 0z" />
              </svg>
            </Button>
            <Button size={"large"}
                    variant={"contained"}
                    type={"button"}
                    onClick={()=> approveDecline('APPROVE')}
                    className={`${show?'!hidden':''} ${app?.approvedOn? '!hidden' : ''} !bg-green-600 !text-white-a700 !p-2 !rounded-lg`}
                    disabled={disabled}
            >
              <svg xmlns="http://www.w3.org/2000/svg"
                   className={"w-[24px] h-[24px]"}
                   fill="#FFFFFF"
                   viewBox="0 0 512 512">
                <path
                  d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.2s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16l-97.5 0c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8l97.5 0c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32L0 448c0 17.7 14.3 32 32 32l64 0c17.7 0 32-14.3 32-32l0-224c0-17.7-14.3-32-32-32l-64 0z"/></svg>
            </Button>
            <ProgressButton saving={show} width={'w-[100%]'} position={'justify-center'} text={'Saving Review...'} />
          </Box>
          <div className={`w-[100%] ${isError?'':'hidden'} mt-4 p-4 bg-red-300 border-solid border-2 border-red-600 rounded-[10px] text-red-800 overflow-hidden`}>
            {errorMsg}
            <span onClick={() => setIsError(false)}
              className={'float-right text-[16px] cursor-pointer'}>
              X
            </span>
          </div>
          <div className={`w-[100%] ${isSuccess?'':'hidden'} mt-4 p-4 bg-green-300 border-solid border-2 border-green-600 rounded-[10px] text-green-700 overflow-hidden`}>
            The Review was successfully submitted!
          </div>
        </form>
      </Box>
    </Box>
  );
}