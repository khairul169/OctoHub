import { AccountCircle, Logout } from '@mui/icons-material';
import {
  AppBar, Avatar, Button, Container, Hidden, ListItemIcon, Menu, MenuItem, Toolbar, Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Config } from '../app/Config';
import octo from '../assets/images/Professortocat_v2.png';
import SearchBar from './SearchBar';

const Header = () => {
  const user = useSelector((state) => state.auth.user);

  const [accountMenu, setAccountMenu] = useState(null);

  const onAccountMenuOpen = (event) => {
    setAccountMenu(event.currentTarget);
  };

  const onAccountMenuClose = () => {
    setAccountMenu(null);
  };

  return (
    <AppBar
      component="header"
      position="absolute"
      sx={{
        position: 'relative',
        borderBottom: (t) => `1px solid ${t.palette.divider}`,
      }}
    >
      <Container>
        <Toolbar disableGutters>
          <Link to="/" style={{ display: 'flex', color: '#fff', textDecoration: 'none' }}>
            <img src={octo} width={32} />
            <Typography variant="h6" noWrap sx={{ ml: 2 }}>
              OctoHub
            </Typography>
          </Link>
          <form action={`${Config.APP_BASE_URL}/search`} method="GET">
            <SearchBar />
          </form>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'end' }}>
            <Button
              color="inherit"
              onClick={onAccountMenuOpen}
            >
              <Avatar sx={{ width: 32, height: 32 }} src={user.avatar_url} />
              <Hidden mdDown>
                <Box component="span" sx={{ ml: 2 }}>
                  {user.name}
                </Box>
              </Hidden>
            </Button>
            <Menu
              anchorEl={accountMenu}
              open={Boolean(accountMenu)}
              onClose={onAccountMenuClose}
              onClick={onAccountMenuClose}
            >
              <MenuItem component={Link} to="/">
                <ListItemIcon>
                  <AccountCircle fontSize="small" />
                </ListItemIcon>
                Akun saya
              </MenuItem>
              <MenuItem component={Link} to="/auth/logout">
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Keluar
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
