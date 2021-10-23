import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from './authSlice';

const LogoutPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logout());
  }, []);

  return <div />;
};

export default LogoutPage;
