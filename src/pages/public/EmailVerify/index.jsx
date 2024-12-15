import { useTheme } from "@mui/material/styles";
import Main from "../../../mui/layouts/Main";
import Box from "@mui/material/Box";
import { Form } from "../EmailVerify/components";

export const EmailVerify = () => {
  const theme = useTheme();
  // const isMd = useMediaQuery(theme.breakpoints.up('md'), {
  //   defaultMatches: true,
  // });

  return (
    <Main>
      <Box
        position={'relative'}
        minHeight={'calc(100vh - 247px)'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        height={1}
        width={1}
      >
        <Box component={'img'}
             src={
               'https://res.cloudinary.com/dyvxnpvxa/image/upload/v1731948390/h6n0cce2dtcacy4dn0h7.svg'
             }
             width={0.6}
             height={0.6}
             sx={{
               filter:
                 theme.palette.mode === 'dark'
                   ? 'brightness(0.8)'
                   : 'none',
             }}
             className="mx-[auto]" />
        <Box
              display={'block'}
              alignItems={'center'}
             justifyContent={'center'}
             height={1}
             width={1} >
          <Form />
        </Box>
      </Box>
    </Main>
  );
}