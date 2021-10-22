import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAccessToken } from '../../repositories/auth.repo';
import { getUserInfo } from '../../repositories/user.repo';

/**
 * Auth states
 */
const initialState = {
  token: null,
  user: null,
  isLoggedIn: false,
};

/**
 * Async actions
 */
export const fetchAccessToken = createAsyncThunk(
  'auth/fetchAccessToken', async (code) => {
    const response = await getAccessToken(code);
    const { token } = response.data;
    return token;
  },
);

export const fetchUserInfo = createAsyncThunk(
  'auth/fetchUserInfo', async () => (await getUserInfo()).data,
);

export const tryAuthenticate = createAsyncThunk(
  'auth/fetchAccessToken', async (code, { getState, dispatch }) => {
    const { token } = getState().auth;

    // Authenticate user
    if (code) {
      dispatch(fetchAccessToken(code));
    } else if (token) {
      dispatch(fetchUserInfo());
    }
  },
);

/**
 * Reducer & actions
 */
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => builder
    .addCase(fetchAccessToken.fulfilled, (state, action) => {
      if (!action.payload) return;

      // Set authorization token
      state.token = action.payload;
      state.user = null;
      state.isLoggedIn = false;
    })
    .addCase(fetchUserInfo.rejected, (state) => {
      // Set login status
      state.isLoggedIn = false;
    })
    .addCase(fetchUserInfo.fulfilled, (state, action) => {
      // Set user data
      state.user = action.payload;
      state.isLoggedIn = state.user != null;
    }),
});

export default authSlice.reducer;
