import { useNavigate } from "react-router-dom";
import { GetUsersService as getPermissions, storeItem } from "../../../../services";
import { useEffect } from "react";
import { Main } from "../../../../mui/layouts";
import Box from "@mui/material/Box";
import { Loader } from "../../../../ui-components/Loader";

const USER_PERMISSION = process.env.REACT_APP_USER_PERMISSION_URL;
export const LoadAuthorities = () => {
  const { users: perm, isLoading } = getPermissions(USER_PERMISSION);
  const navigate = useNavigate();
  useEffect(() => {
    if(perm) {
        console.log("permissions ",perm);
        storeItem('perm', JSON.stringify(perm?.data));
        navigate('/complete/login', {replace: true});
    }
  }, [perm, navigate]);

  return (
    <Main showFooter={false}>
      <Box width={1} height={1}>
        <Box width={0.5}
             className={`my-[25%] mx-auto ${isLoading ? '' : 'hidden'}`}>
          <Loader h={'h-16'} w={'w-16'} />
          <p className="text-blue-600 text-center text-[16px]">
            loading user privilege settings...
          </p>
        </Box>
      </Box>
    </Main>
  );
}