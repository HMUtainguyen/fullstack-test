import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';

import { AuthProvider } from './contexts/JWTAuthContext';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { toast, ToastContainer } from 'react-toastify';
import routes, { renderRoutes } from 'routers/routes';
//--- Redux
import { Provider } from 'react-redux';
import store from 'redux/index';
import ConfirmModal from 'components/ConfirmModal';
import 'assets/css/styles.scss';
import 'react-toastify/dist/ReactToastify.css';
import viLocale from 'date-fns/locale/vi';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { viVN } from '@mui/material/locale';
import LoadingScreen from 'components/LoadingScreen';
import React from 'react';

const theme = createTheme(viVN);

function App() {

    return (
        <Provider store={store}>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={viLocale}>
                <ThemeProvider theme={theme}>
                    <Router>
                        <AuthProvider>{renderRoutes(routes)}</AuthProvider>
                        <ToastContainer />
                    </Router>
                </ThemeProvider>
            </LocalizationProvider>
            <ConfirmModal />
            <LoadingScreen />
        </Provider>
    );
}

export default App;
