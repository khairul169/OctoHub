import restApi from '../services/restApi';

export const getUserInfo = async () => restApi.get('/user');

export const getUserById = async (id) => restApi.get(`/users/${id}`);

export default { getUserInfo, getUserById };
