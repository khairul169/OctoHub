import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getRepositoriesById, getUserRepositories } from '../../repositories/repository.repo';
import { getUserById } from '../../repositories/user.repo';

/**
 * Auth states
 */
const initialState = {
  user: null,
  repositories: [],
};

/**
 * Async actions
 */
export const fetchUserData = createAsyncThunk(
  'auth/fetchUserData', async (userId, { getState }) => {
    let user; let
      repositories;

    if (userId) {
      user = (await getUserById(userId)).data;
      repositories = (await getRepositoriesById(userId)).data;
    } else {
      user = getState().auth.user;
      repositories = (await getUserRepositories()).data;
    }

    return { user, repositories };
  },
);

/**
 * Reducer & actions
 */
export const homeSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearUserState: (state) => {
      state.user = null;
      state.repositories = [];
    },
  },
  extraReducers: (builder) => builder
    .addCase(fetchUserData.fulfilled, (state, action) => {
      // Set user data
      state.user = action.payload.user;
      state.repositories = action.payload.repositories || [];
    }),
});

export const { clearUserState } = homeSlice.actions;

export default homeSlice.reducer;
