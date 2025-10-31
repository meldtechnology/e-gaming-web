import { GetAuthService as getAuth, removeAll } from "../../../../services";
import { Main } from "../../../../mui/layouts";
import Box from "@mui/material/Box";
import { Loader } from "../../../../ui-components/Loader";
import { useEffect } from "react";

const AUTHORIZE_URL = process.env.REACT_APP_AUTHORIZE_URL;
const APP_ID = process.env.REACT_APP_APPLICATION_ID;
export const LoginRedirect = () => {
  const { auth, isLoading } = getAuth(`${AUTHORIZE_URL}/${APP_ID}`);

  useEffect(() => {
    removeAll();
    if(auth) window.location.replace(auth);
  }, [auth]);

  return (
    <Main showFooter={false}>
      <Box width={1} height={1}>
        <Box width={0.5}
              className={`my-[25%] mx-auto ${isLoading? '' : 'hidden'}`}>
          <Loader h={'h-16'} w={'w-16'}/>
        </Box>
      </Box>
    </Main>
  );
}