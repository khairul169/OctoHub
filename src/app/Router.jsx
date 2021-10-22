import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Switch, Route, Redirect, useLocation, useHistory,
} from 'react-router-dom';
import { fetchAccessToken, fetchUserInfo } from '../pages/auth/authSlice';
import LoginPage from '../pages/auth/LoginPage';
import HomePage from '../pages/home/HomePage';

const Router = () => {
  const { token, isLoggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const params = new URLSearchParams(useLocation().search);
  const history = useHistory();

  useEffect(() => {
    const oauthCode = params.get('code');

    // Authenticate user
    if (oauthCode) {
      dispatch(fetchAccessToken(oauthCode));
    } else if (token && isLoggedIn) {
      dispatch(fetchUserInfo());
    }
  }, [token]);

  useEffect(() => {
    // Redirect to home after authenticated
    if (isLoggedIn) {
      history.push('/');
    }
  }, [isLoggedIn]);

  return (
    <Switch>
      {!isLoggedIn && !user ? (
        <>
          <Route path="/auth/login" component={LoginPage} />
          <Redirect to="/auth/login" />
        </>
      ) : (
        <>
          <Route path={['/', '/home']} component={HomePage} />
        </>
      )}
      <div>404 Not Found!</div>
    </Switch>
  );
};

export default Router;
