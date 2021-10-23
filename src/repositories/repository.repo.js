import axios from 'axios';
import restApi from '../services/restApi';

export const getUserRepositories = async () => restApi.get('/user/repos?per_page=12&page=1');

export const getRepositoriesById = async (id) => restApi.get(`/users/${id}/repos?per_page=12&page=1`);

export const getRepository = async (name) => restApi.get(`/repos/${name}`);

export const getRepositoryReadme = async (repo) => {
  const url = `https://raw.githubusercontent.com/${repo}/master/README.md`;
  return axios.get(url);
};

export const createRepository = async (data) => restApi.post('/user/repos', data);

export const updateRepository = async (name, data) => restApi.patch(`/repos/${name}`, data);

export default {
  getUserRepositories,
  getRepositoriesById,
  getRepository,
};
