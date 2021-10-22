import axios from 'axios';
import { Config } from '../app/Config';

// Create HTTP client
const restApi = axios.create({
  baseURL: Config.GITHUB_API_BASEURL,
});

// Set default headers
restApi.defaults.headers.common.Accept = 'application/vnd.github.v3+json';

export default restApi;
