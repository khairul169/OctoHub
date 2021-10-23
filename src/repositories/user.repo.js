import restApi from '../services/restApi';

export const getUserInfo = async () => restApi.get('/user');

export const getUserById = async (id) => restApi.get(
  `/users/${id}`,
);

export const findUserByQuery = async (query) => restApi.get(
  `/search/users?q=${encodeURIComponent(query)}`,
);

export default { getUserInfo, getUserById };
