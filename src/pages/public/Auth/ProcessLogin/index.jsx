import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CreateAuthService as getAccessToken, storeItem } from "../../../../services";
import { Main } from "../../../../mui/layouts";
import Box from "@mui/material/Box";
import { Loader } from "../../../../ui-components/Loader";

const EXCHANGE_CODE_URL = process.env.REACT_APP_TOKEN_URL;
export const ProcessLogin = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const[isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { getToken } = getAccessToken(`${EXCHANGE_CODE_URL}/${code}`);


  // The function will invoke when the user changes the tab
  useEffect(() => {
    const authenticate = async () => {
      setIsLoading(true);
      const getAccessTokenData = await getToken(null);
      if(getAccessTokenData?.error !== undefined){
        navigate('/');
      }
      else {
          storeItem('at', getAccessTokenData?.data?.data?.access_token);
          storeItem('rt', getAccessTokenData?.data?.data?.refresh_token);
          navigate('/complete/login', {replace: true});
      }
      setIsLoading(false);
    }
    authenticate()
      .finally(() => console.log('Done getting authentication!'));
  }, [getToken, navigate]);

  return (
    <Main showFooter={false}>
      <Box width={1} height={1}>
        <Box width={0.5}
             className={`my-[25%] mx-auto ${isLoading ? '' : 'hidden'}`}>
          <Loader h={'h-16'} w={'w-16'} />
          <p className="text-blue-600 text-center text-[16px]">
            Finalizing sign in...
          </p>
        </Box>
      </Box>
    </Main>
  );
}