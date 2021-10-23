import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { findUserByQuery } from '../../repositories/user.repo';

/**
 * Auth states
 */
const initialState = {
  users: null,
  query: null,
};

/**
 * Async actions
 */
export const fetchUsersByQuery = createAsyncThunk(
  'auth/fetchUsersByQuery', async (query) => {
    const { data } = await findUserByQuery(query);
    return { data, query };
  },
);

/**
 * Reducer & actions
 */
export const searchSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => builder
    .addCase(fetchUsersByQuery.fulfilled, (state, action) => {
      // Set search result
      state.users = action.payload.data;
      state.query = action.payload.query;
    }),
});

export default searchSlice.reducer;
