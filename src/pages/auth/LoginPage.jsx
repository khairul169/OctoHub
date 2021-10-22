import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { GitHub } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import styles from './LoginPage.module.css';
import octo from '../../assets/images/Professortocat_v2.png';
import { loginUrl } from '../../repositories/auth.repo';
import { tryAuthenticate } from './authSlice';

const LoginPage = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const params = new URLSearchParams(useLocation().search);

  useEffect(() => {
    const oauthCode = params.get('code');

    // Authenticate user
    dispatch(tryAuthenticate(oauthCode));
  }, [token]);

  // Redirect to github oauth sign in page
  const onBtnLoginTap = () => {
    window.location.href = loginUrl();
  };

  return (
    <Grid container component="main" className={styles.container}>
      <Grid item xs={false} sm={4} md={7} className={styles.logoGrid}>
        <img src={octo} alt="Octoprofessor" />
      </Grid>
      <Grid item xs={12} sm={8} md={5} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Box sx={{ p: 2 }}>
          <Typography component="h1" variant="h2" color="#fff">OctoHub</Typography>
          <Typography variant="h5" color="#fff" sx={{ mt: 1 }}>Just a simple GitHub API client</Typography>

          <Button variant="contained" sx={{ mt: 12 }} startIcon={<GitHub />} type="button" onClick={onBtnLoginTap}>
            Log in with GitHub
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
