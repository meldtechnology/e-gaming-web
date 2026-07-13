import { env } from "../../config/env";
import QRCode from 'react-qr-code';
import { useEffect, useState } from "react";
import { getItem } from "../../services";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "../../mui/components/Container";
import { useNavigate } from "react-router-dom";

const GET_LICENCE_BY_NUMBER_URL = env.VALIDATE_URL;
export const QRCodeMaker = () => {
  const[licenseNumber, setLicenseNumber] = useState('');
  const navigate = useNavigate();

  const close = () => {
    navigate('/app/licenses', { replace: true});
  }

  useEffect(() => {
    const license = getItem('ld');
    if(license !== undefined) {
      setLicenseNumber(JSON.parse(license)?.invoiceNumber);
    }
  }, []);
  return (
    <>
      <Container>
        <Box>
          <Box display={'block'}
               overflow={'hidden'}>
            <Typography variant={'h4'} align={'center'}>
              License QR Code Generator
            </Typography>
            <button type="button"
                    onClick={close}
                    aria-label="Close"
                    className="float-right inline-flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-surface-raised hover:text-danger">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
            </button>
          </Box>
          <Box marginTop={'2%'} className={'!justify-items-center'}>
            <QRCode size={512}
                    value={`${GET_LICENCE_BY_NUMBER_URL}${licenseNumber}`} />
          </Box>
        </Box>
      </Container>
    </>
  );
}