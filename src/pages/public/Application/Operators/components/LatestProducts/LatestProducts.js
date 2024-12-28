import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { useTheme } from '@mui/material/styles';
import { formatAmount, GetPublicFileService as getFiles, removeAll, storeItem } from "../../../../../../services";
import { useNavigate } from "react-router-dom";

const mock = [
  {
    media: 'https://assets.maccarianagency.com/backgrounds/img38.png',
    title: 'Headphones',
    price: '$450',
  },
  {
    media: 'https://assets.maccarianagency.com/backgrounds/img39.png',
    title: 'Wireless headpohones',
    price: '$280',
  },
  {
    media: 'https://assets.maccarianagency.com/backgrounds/img40.png',
    title: 'Bluetooth headphones',
    price: '$300',
  },
  {
    media: 'https://assets.maccarianagency.com/backgrounds/img41.png',
    title: 'Headphones',
    price: '$280',
  },
];

const FILTER_FILES_URL = process.env.REACT_APP_DOCUMENT_FILTER_FILE_PUBLIC_URL;
const LatestProducts = ({operatorType}) => {
  const theme = useTheme();
  const [products, setProduct] = useState([]);
  const [page, ] = useState(1);
  const navigate = useNavigate();
  const { documents } = getFiles(`${FILTER_FILES_URL}?page=${page}&size=10&categoryFilter=${operatorType}`);

  const selectPermit = (selectedPermit) => {
    storeItem('permit', JSON.stringify(selectedPermit));
    navigate('/apply/operator/verification');
  }

  useEffect(() => {
    if(documents !== null) setProduct(documents?.data?.results);
    removeAll();
  }, [documents]);

  return (
    <Box>
      <Box marginBottom={4}>
        <Typography
          variant="h4"
          align={'center'}
          data-aos={'fade-up'}
          gutterBottom
          sx={{
            fontWeight: 700,
          }}
        >
          The {operatorType} application types
        </Typography>
        <Typography
          variant="h6"
          align={'center'}
          color={'text.secondary'}
          data-aos={'fade-up'}
        >
          Pick your desired proprietor permit/license type from the available list.
        </Typography>
      </Box>
      <Grid container spacing={4}>
        {products?.map((item, i) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            key={i}
            data-aos={'fade-up'}
            data-aos-delay={i * 100}
            data-aos-offset={100}
            data-aos-duration={600}
          >
            <Box display={'block'} width={1} height={1}>
              <Box
                component={Card}
                width={1}
                height={1}
                display={'flex'}
                flexDirection={'column'}
              >
                <CardMedia
                  sx={{
                    position: 'relative',
                    height: { xs: 240, sm: 340, md: 280 },
                    overflow: 'hidden',
                    padding: 3,
                    paddingBottom: 0,
                    background: theme.palette.alternate?.main,
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                  }}
                >
                  <Box
                    component={'img'}
                    loading="lazy"
                    src={item?.logo? item?.logo : mock[i].media}
                    sx={{
                      '& img': {
                        objectFit: 'contain',
                      },
                    }}
                  />
                  <Box
                    display={'flex'}
                    justifyContent={'flex-end'}
                    position={'absolute'}
                    top={0}
                    left={0}
                    right={0}
                    padding={2}
                    width={1}
                  >
                    <Box
                      component={IconButton}
                      color="secondary"
                      bgcolor={'background.paper'}
                      size={'large'}
                    >
                      <Box
                        component={'svg'}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        width={20}
                        height={20}
                        color={'secondary.main'}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </Box>
                    </Box>
                  </Box>
                </CardMedia>
                <CardContent>
                  <Typography
                    variant={'h6'}
                    align={'left'}
                    sx={{ fontWeight: 700 }}
                  >
                    {item?.name}
                  </Typography>
                  <Box
                    display={'flex'}
                    justifyContent={'flex-start'}
                    marginY={1}
                  >
                    <Box display={'flex'} justifyContent={'center'}>
                      <Typography color={'#AEAEAE'} sx={{ fontWeight: 400 }} >
                        valid for {item?.renewalDuration} days
                      </Typography>
                    </Box>
                  </Box>
                  <CardActions sx={{ justifyContent: 'space-between' }}>
{/*                     <Typography sx={{ fontWeight: 700 }} color={'primary'}>
                      ₦ {`${formatAmount(item?.value)} ${item?.feeType?.includes('FLAT')? '' : '% of Revenue'}`}
                    </Typography> */}
                    <Button
                      variant={'contained'}
                      className={`!bg-[#18801d]`}
                      startIcon={
                        <Box
                          component={'svg'}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          width={20}
                          height={20}
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                            clipRule="evenodd"
                          />
                          <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                        </Box>
                      }
                      onClick={(e) => selectPermit(item)}
                    >
                      Apply
                    </Button>
                  </CardActions>
                </CardContent>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default LatestProducts;
