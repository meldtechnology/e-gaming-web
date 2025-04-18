import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
// import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";

const NavItem = ({ title, id, items, colorInvert = false }) => {
  // const theme = useTheme();
  const navigate = useNavigate();

  const [ setAnchorEl] = useState(null);
  const [openedPopoverId, setOpenedPopoverId] = useState(null);

  const handleClick = (event, popoverId) => {
    setAnchorEl(event.target);
    setOpenedPopoverId(popoverId);
    navigate(items[0].href);
  };

  // const handleClose = () => {
  //   setAnchorEl(null);
  //   setOpenedPopoverId(null);
  // };

  const [activeLink, setActiveLink] = useState('');
  useEffect(() => {
    setActiveLink(window && window.location ? window.location.pathname : '');
  }, []);

  const hasActiveLink = () => items.find((i) => i.href === activeLink);
  const linkColor = colorInvert ? 'common.white' : 'text.primary';

  return (
    <Box>
      <Box
        display={'flex'}
        alignItems={'center'}
        aria-describedby={id}
        sx={{ cursor: 'pointer' }}
        onClick={(e) => handleClick(e, id)}
      >
        <Typography
          fontWeight={openedPopoverId === id || hasActiveLink() ? 100 : 50}
          color={linkColor}
          sx={{ fontSize: '1.2rem' }}
        >
          {title}
        </Typography>
        {/*<ExpandMoreIcon*/}
        {/*  sx={{*/}
        {/*    marginLeft: theme.spacing(1 / 4),*/}
        {/*    width: 16,*/}
        {/*    height: 16,*/}
        {/*    transform: openedPopoverId === id ? 'rotate(180deg)' : 'none',*/}
        {/*    color: linkColor,*/}
        {/*    display: items.length <= 1 ? 'none' : 'inline'*/}
        {/*  }}*/}
        {/*/>*/}
      </Box>
      {/*<Popover*/}
      {/*  elevation={3}*/}
      {/*  id={id}*/}
      {/*  open={openedPopoverId === id}*/}
      {/*  anchorEl={anchorEl}*/}
      {/*  onClose={handleClose}*/}
      {/*  anchorOrigin={{*/}
      {/*    vertical: 'bottom',*/}
      {/*    horizontal: 'center'*/}
      {/*  }}*/}
      {/*  transformOrigin={{*/}
      {/*    vertical: 'top',*/}
      {/*    horizontal: 'center'*/}
      {/*  }}*/}
      {/*  sx={{*/}
      {/*    '.MuiPaper-root': {*/}
      {/*      maxWidth: items.length > 12 ? 350 : 250,*/}
      {/*      padding: 2,*/}
      {/*      marginTop: 2,*/}
      {/*      borderTopRightRadius: 0,*/}
      {/*      borderTopLeftRadius: 0,*/}
      {/*      borderBottomRightRadius: 8,*/}
      {/*      borderBottomLeftRadius: 8,*/}
      {/*      borderTop: `3px solid ${theme.palette.primary.main}`,*/}
      {/*      display: items.length <= 1 ? 'none' : 'inline'*/}
      {/*    }*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <Grid container spacing={0.5}>*/}
      {/*    {items.map((p, i) => (*/}
      {/*      <Grid item key={i} xs={items.length > 12 ? 6 : 12}>*/}
      {/*        <Button*/}
      {/*          component={'a'}*/}
      {/*          href={p.href}*/}
      {/*          fullWidth*/}
      {/*          sx={{*/}
      {/*            justifyContent: 'flex-start',*/}
      {/*            color: activeLink === p.href ? theme.palette.primary.main : theme.palette.text.primary,*/}
      {/*            backgroundColor: activeLink === p.href ? alpha(theme.palette.primary.main, 0.1) : 'transparent',*/}
      {/*            fontWeight: activeLink === p.href ? 600 : 400*/}
      {/*          }}*/}
      {/*        >*/}
      {/*          {p.title}*/}
      {/*          {p.isNew && (*/}
      {/*            <Box padding={0.5} display={'inline-flex'} borderRadius={1} bgcolor={'primary.main'} marginLeft={2}>*/}
      {/*              <Typography variant={'caption'} sx={{ color: 'common.white', lineHeight: 1 }}>*/}
      {/*                new*/}
      {/*              </Typography>*/}
      {/*            </Box>*/}
      {/*          )}*/}
      {/*        </Button>*/}
      {/*      </Grid>*/}
      {/*    ))}*/}
      {/*  </Grid>*/}
      {/*</Popover>*/}
    </Box>
  );
};

NavItem.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  colorInvert: PropTypes.bool,
};

export default NavItem;
