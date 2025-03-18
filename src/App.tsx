import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { PersistGate } from 'redux-persist/integration/react';

import './App.css';

import { AppRoutes, routeConfig } from './lib/config/routeConfig.tsx';
import { persistor, store } from './store/store.ts';

const theme = createTheme();

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Routes>
              {Object.values(AppRoutes).map((route) => (
                <Route
                  key={route}
                  path={routeConfig[route].path}
                  element={routeConfig[route].element}
                />
              ))}
            </Routes>
          </Router>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
