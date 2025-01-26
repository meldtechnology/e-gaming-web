import QRCode from 'react-qr-code';
import { useEffect, useState } from "react";
import { getItem } from "../../services";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "../../mui/components/Container";
import { useNavigate } from "react-router-dom";

const GET_LICENCE_BY_NUMBER_URL = process.env.REACT_APP_VALIDATE_URL;
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
                    className="w-[10%] rounded-xl px-3 py-2 text-sm font-semibold bg-red-600 text-white-a700 hover:text-white-a700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-400 sm:mt-0 sm:w-auto float-right">
              <span className="min-w-full text-center">X</span>
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