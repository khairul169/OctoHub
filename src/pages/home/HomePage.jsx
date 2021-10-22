import React from 'react';
import { useSelector } from 'react-redux';

const HomePage = () => {
  const user = useSelector((state) => state.auth.user);
  if (!user) {
    return null;
  }
  return (
    <div>
      <img src={user.avatar_url} width={48} />
      <br />
      {user.login}
      <br />
      {user.name}
      <br />
    </div>
  );
};

export default HomePage;
