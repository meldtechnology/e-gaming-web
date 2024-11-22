import { GetAuthService as logout } from "../../../services";
import { useEffect } from "react";
import { Main } from "../../../mui/layouts";
import Box from "@mui/material/Box";
import { Loader } from "../../../ui-components/Loader";

const LOG_OUT_URL =  process.env.REACT_APP_LOGOUT_URL
export const SignOut = () => {
  const { auth, isLoading} = logout(LOG_OUT_URL);

  useEffect(() => {
    if(!isLoading) {
      window.location.replace(auth?auth: '/');
    }
  }, [auth, isLoading]);

  console.log(auth);

  return (
    <Main showFooter={false}>
      <Box width={1} height={1}>
        <Box width={0.5}
             className={`my-[25%] mx-auto ${isLoading? '' : 'hidden'}`}>
          <Loader h={'h-16'} w={'w-16'}/>
          <p className="text-orange-400 text-center text-[16px]">
            Signing you out from the platform...
          </p>
        </Box>
      </Box>
    </Main>
  );
}