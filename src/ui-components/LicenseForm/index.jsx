import { env } from "../../config/env";
import Box from "@mui/material/Box";
import { LicenseTemplate } from "../LicenseTemplate";
import Container from "../../mui/components/Container";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getItem, storeItem, UpdateDocumentService as reviewApplication } from "../../services";
import Typography from "@mui/material/Typography";
import { ProgressButton } from "../Form/component/ProgressButton";
import { checkPermission } from "../../services/autorization";
import { Button } from "../primitives";
import { AccessDenied } from "../AccessDenied";

const APPLICATION_URL = env.DOCUMENTS_BASE_URL;
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
    const html2pdfModule = await import('html2pdf.js');
    const html2pdf = html2pdfModule.default ?? html2pdfModule;
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
      storeItem('ld', result?.data);
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

  return checkPermission('CAN_ISSUE_LICENSE') ? (
    <Container>
      <Box>
        <Box display={'block'}
             overflow={'hidden'}>
          <Typography variant={'h4'} align={'center'}>
            License Certificate
          </Typography>
          <Button unstyled
                  type="button"
                  onClick={close}
                  aria-label="Close"
                  className="float-right inline-flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-surface-raised hover:text-danger">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
          </Button>
        </Box>
        <Box>
          {license.issuedOn && !show ? (
            <Button unstyled
                    type={'button'}
                    onClick={generatePDf}
                    className="w-[20%] rounded-xl bg-brand p-2.5 font-semibold text-on-brand transition-colors hover:bg-brand-strong sm:w-full" >
              Download License (PDF)</Button>
          ) : null}
          {!license.issuedOn && !show ? (
            <Button unstyled
                    type={'button'}
                    onClick={issueLicense}
                    className="w-[20%] rounded-xl bg-brand p-2.5 font-semibold text-on-brand transition-colors hover:bg-brand-strong sm:w-full" >
              Issue License</Button>
          ) : null}
          <ProgressButton saving={show} text={'Issuing Licence'} />
        </Box>
        {isError ? (
          <Box className="!mt-4 !w-full" >
            <Typography component={'div'}
                        marginTop={'3%'}
                        className="rounded-xl border border-danger/30 bg-danger-soft p-3 text-danger">
              {errorMsg}
            </Typography>
          </Box>
        ) : null}
        {license.issuedOn ? (
          <Box marginTop={'2%'}>
            <LicenseTemplate license={license}/>
          </Box>
        ) : (
          <Box marginTop={'2%'}>
            <div className={'w-full rounded-2xl border border-dashed border-border-strong bg-surface-muted p-40 text-center font-bold text-text-secondary'}>
              NO LICENSE ISSUED
            </div>
          </Box>
        )}
      </Box>
    </Container>
  ) : (
    <AccessDenied />
  );
}
