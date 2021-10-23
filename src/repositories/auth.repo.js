import axios from 'axios';
import { Config } from '../app/Config';

// Generate oauth login url
export const loginUrl = () => {
  const clientId = Config.GITHUB_API_CLIENT;
  const redir = `${Config.APP_BASE_URL}/auth/login`;
  const scopes = 'repo,notifications,user,delete_repo';
  return `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redir}&scope=${scopes}`;
};

// Fetch access token from temporary code w/ cors proxy
export const getAccessToken = async (code) => axios.get(`https://khairul.my.id/github_proxy/authenticate/${code}`);

export default { loginUrl };
