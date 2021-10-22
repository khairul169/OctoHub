import restApi from '../services/restApi';

export const getUserRepositories = async () => restApi.get('/user/repos?per_page=12&page=1');

export const getRepositoriesById = async (id) => restApi.get(`/users/${id}/repos?per_page=12&page=1`);

export default { getUserRepositories, getRepositoriesById };
