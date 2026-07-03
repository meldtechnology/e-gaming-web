import { env } from "../../../../config/env";
import { GetUsersService as getProfile, storeItem } from "../../../../services";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Main } from "../../../../mui/layouts";
import Box from "@mui/material/Box";
import { Loader } from "../../../../ui-components/Loader";

const USER_PROFILE = env.USER_PROFILE_URL;
export const ProfileAccount = () => {
  const {users, isLoading }
    = getProfile(USER_PROFILE);
  const navigate = useNavigate();


  useEffect(() => {
    if(users) {
      storeItem('profile', JSON.stringify(users?.data));
      navigate('/app', {replace: true});
    }
  }, [users, navigate]);

  return (
    <Main showFooter={false}>
      <Box width={1} height={1}>
        <Box width={0.5}
             className={`my-[25%] mx-auto ${isLoading ? '' : 'hidden'}`}>
          <Loader h={'h-16'} w={'w-16'} />
          <p className="text-brand text-center text-[16px]">
            retrieving user profile settings...
          </p>
        </Box>
      </Box>
    </Main>
  );
}