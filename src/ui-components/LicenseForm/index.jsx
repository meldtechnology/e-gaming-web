import Box from "@mui/material/Box";
import { LicenseTemplate } from "../LicenseTemplate";
import Container from "../../mui/components/Container";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getItem, UpdateDocumentService as reviewApplication } from "../../services";
import Typography from "@mui/material/Typography";
import { ProgressButton } from "../Form/component/ProgressButton";
import { checkPermission } from "../../services/autorization";

const APPLICATION_URL = process.env.REACT_APP_DOCUMENTS_BASE_URL;
export const LicenseForm = () => {
  const [license, setLicense] = useState({});
  const [user, setUser] = useState({});
  const [show, setShow] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const { modifyDocument, }
    = reviewApplication(`${APPLICATION_URL}/ISSUE`);

  const close = () => {
    navigate('/app/licenses', { replace: true});
  }

  const generatePDf = async () => {
    const html2pdf = await require('html2pdf.js');
    // html2pdf(document.getElementById('license-id'));
    html2pdf().set({filename: 'license.pdf'})
      .from(document.getElementById('license-id'))
      .save();
  }

  const issueLicense = async () => {
    setShow(true);
    const reviewComment = {
      comment: license?.comment,
      reference: license?.reference,
      requester: user?.username,
      requesterId: user?.publicId
    }
    const result = await modifyDocument(reviewComment);
    if(result?.error !== undefined){
      setIsError(true);
      setErrorMsg(result?.error?.data?.userMessage);
    }
    else {
      console.log(result?.data?.data);
      setLicense(result?.data?.data);
    }
    setShow(false);
  }

  useEffect(() => {
    const document = getItem('ld'); // License document ld
    const app = getItem('profile');
    if(document !== undefined) setLicense(JSON.parse(document));
    if(app !== undefined) setUser(JSON.parse(app));
  }, []);

  return checkPermission('CAN_ISSUE_LICENSE') === '' ? (
    <Container>
      <Box>
        <Box display={'block'}
             overflow={'hidden'}>
          <Typography variant={'h4'} align={'center'}>
            License Certificate
          </Typography>
          <button type="button"
                  onClick={close}
                  className="w-[10%] rounded-xl px-3 py-2 text-sm font-semibold bg-red-600 text-white-a700 hover:text-white-a700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-400 sm:mt-0 sm:w-auto float-right">
            <span className="min-w-full text-center">X</span>
          </button>
        </Box>
        <Box>
          <button type={'button'}
                  onClick={generatePDf}
                  className={`w-[20%] ${license.issuedOn?'':'hidden'} ${show?'hidden':''} rounded-xl p-2 bg-gray-950 text-white-a700 hover:bg-gray-600`} >
            Download License (PDF)</button>
          <button type={'button'}
                  onClick={issueLicense}
                  className={`w-[20%]  ${license.issuedOn?'hidden':''} ${show?'hidden':''} rounded-xl p-2 bg-gray-950 text-white-a700 hover:bg-gray-600`} >
            Issue License</button>
          <ProgressButton saving={show} text={'Issuing Licence'} />
        </Box>
        <Box className={`${isError?'':'!hidden'} !mt-4 !w-full`} >
          <Typography variant={'p'}
                      bgcolor={'#FF9999'}
                      borderRadius={'10px'}
                      border={'solid 2px #963333'}
                      padding={'6px'}
                      marginTop={'3%'}
                      sx={{
                        color: '#F93333'
          }}>
            {errorMsg}
          </Typography>
        </Box>
        <Box marginTop={'2%'}
             className={`${license.issuedOn?'':'hidden'}`}>
          <LicenseTemplate license={license}/>
        </Box><Box marginTop={'2%'}
             className={`${license.issuedOn?'hidden':''}`}>
          <div className={'w-full bg-amber-100 font-bold text-blue-600 text-center p-40 rounded-[10px]'}>
            NO LICENSE ISSUED
          </div>
        </Box>
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