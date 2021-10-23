import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getRepository, getRepositoryReadme,
  createRepository as createRepo,
  updateRepository as updateRepo,
} from '../../repositories/repository.repo';

/**
 * Auth states
 */
const initialState = {
  // Repo data
  data: null,
  readme: null,

  // Repo operation states
  createState: null,
  updateState: null,
};

/**
 * Async actions
 */
export const fetchRepository = createAsyncThunk(
  'auth/fetchRepository', async (name) => {
    const { data } = await getRepository(name);
    let readme;

    try {
      readme = (await getRepositoryReadme(data.full_name)).data;
    } catch (e) {
      // fail to fetch readme file
    }

    return { data, readme };
  },
);

// Initialize new repository with readme template
export const createRepository = createAsyncThunk(
  'auth/createRepository', async (formData) => (await createRepo({
    ...formData,
    auto_init: true,
  })).data.full_name,
);

export const updateRepository = createAsyncThunk(
  'auth/updateRepository', async (formData, { getState, dispatch }) => {
    // eslint-disable-next-line camelcase
    const { full_name } = getState().repo.data;
    const { data } = await updateRepo(full_name, formData);

    // fetch new repository data
    dispatch(fetchRepository(data.full_name));
    return true;
  },
);

/**
 * Reducer & actions
 */
export const homeSlice = createSlice({
  name: 'repo',
  initialState,
  reducers: {
    clearRepoState: (state) => {
      state.data = null;
      state.readme = null;
    },
    clearCreateState: (state) => {
      state.createState = null;
    },
    clearUpdateState: (state) => {
      state.updateState = null;
    },
  },
  extraReducers: (builder) => builder
    .addCase(fetchRepository.fulfilled, (state, action) => {
    // Set repository data
      state.data = action.payload.data;
      state.readme = action.payload.readme;
    })
    // On Create Repo
    .addCase(createRepository.rejected, (state) => {
      state.createState = { status: false, message: 'Gagal membuat repository!' };
    })
    .addCase(createRepository.fulfilled, (state, action) => {
      state.createState = { status: true, message: 'Sukses membuat repository!', repoName: action.payload };
    })
    // On Update Repo
    .addCase(updateRepository.rejected, (state) => {
      state.updateState = { status: false, message: 'Gagal mengupdate repository!' };
    })
    .addCase(updateRepository.fulfilled, (state) => {
      state.updateState = { status: true, message: 'Sukses mengupdate repository!' };
    }),
});

export const { clearRepoState, clearCreateState, clearUpdateState } = homeSlice.actions;

export default homeSlice.reducer;
