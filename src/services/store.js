import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import auth from '../pages/auth/authSlice';
import restApi from './rest_api';

// Reducer lists
const reducer = combineReducers({
  auth,
});

// Configure redux-persist
const persistConfig = { key: 'octohub_states', version: 1, storage };
const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

// Make persistor
export const persistor = persistStore(store);

// Intercept request with authorization credential
restApi.interceptors.request.use((req) => {
  const { token } = store.getState().auth;
  req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default store;
