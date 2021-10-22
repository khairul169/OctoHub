import restApi from '../services/rest_api';

export const getUserInfo = async () => restApi.get('/user');

export default { getUserInfo };
