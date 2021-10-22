import React from 'react';
import { Provider } from 'react-redux';
import { CssBaseline } from '@mui/material';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import store, { persistor } from '../services/store';

const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <CssBaseline />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

export default App;
