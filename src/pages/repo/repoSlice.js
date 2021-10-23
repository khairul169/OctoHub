import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getRepository, getRepositoryReadme, updateRepository as updateRepo } from '../../repositories/repository.repo';

/**
 * Auth states
 */
const initialState = {
  // Repo data
  data: null,
  readme: null,

  // Repo update states
  updateState: {
    status: false,
    message: null,
  },
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
  extraReducers: (builder) => builder
    .addCase(fetchRepository.fulfilled, (state, action) => {
    // Set repository data
      state.data = action.payload.data;
      state.readme = action.payload.readme;
    })
    .addCase(updateRepository.rejected, (state) => {
    // Set update state
      state.updateState = { status: false, message: 'Gagal mengupdate repository!' };
    })
    .addCase(updateRepository.fulfilled, (state) => {
    // Set update state
      state.updateState = { status: true, message: 'Sukses mengupdate repository!' };
    }),
});

export default homeSlice.reducer;
