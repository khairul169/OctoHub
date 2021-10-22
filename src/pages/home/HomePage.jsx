import React from 'react';
import { useSelector } from 'react-redux';

const HomePage = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <div>
      {user.login}
      <br />
      {user.name}
      <br />
    </div>
  );
};

export default HomePage;
