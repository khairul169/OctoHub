import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { fetchUserInfo } from '../pages/auth/authSlice';
import LoginPage from '../pages/auth/LoginPage';
import HomePage from '../pages/home/HomePage';
import CreateRepoPage from '../pages/repo/CreateRepoPage';
import RepoPage from '../pages/repo/RepoPage';
import UpdateRepoPage from '../pages/repo/UpdateRepoPage';

const Router = () => {
  const { isLoggedIn, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchUserInfo());
      console.log(token);
    }
  }, [token]);

  return (
    <Switch>
      {!isLoggedIn ? (
        <>
          <Route path="/auth/login" component={LoginPage} />
          <Redirect to="/auth/login" />
        </>
      ) : (
        <>
          <Route path={['/', '/home', '/user/:userName']} exact component={HomePage} />
          <Route path="/repo/create" exact component={CreateRepoPage} />
          <Route path="/repo/update" exact component={UpdateRepoPage} />
          <Route path="/repo/:userName/:repoName" exact component={RepoPage} />
          <Route path="/auth/login" component={Redirect} to="/" />
        </>
      )}
      <div>404 Not Found!</div>
    </Switch>
  );
};

export default Router;
