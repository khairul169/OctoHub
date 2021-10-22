import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAccessToken } from '../../repositories/auth.repo';
import { getUserInfo } from '../../repositories/user.repo';

const initialState = {
  token: null,
  user: null,
  isLoggedIn: false,
};

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

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => builder
    .addCase(fetchAccessToken.fulfilled, (state, action) => {
      // Set authorization token
      state.token = action.payload;
      state.isLoggedIn = action.payload != null;
    })
    .addCase(fetchUserInfo.rejected, (state) => {
      // Set login status
      state.isLoggedIn = false;
    })
    .addCase(fetchUserInfo.fulfilled, (state, action) => {
      // Set user data
      state.user = action.payload;
    }),
});

export default authSlice.reducer;
