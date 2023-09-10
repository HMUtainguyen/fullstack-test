import { Backdrop } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import COLORS from 'consts/colors';
import { useSelector } from 'react-redux';

const LoadingScreen = () => {
    const isLoadingScreen = useSelector((state: any) => state.loadingScreen.isLoading);
    const loadingCalculate = useSelector((state: any) => state.loadingScreen.isLoadingCalculate);
    const isLoading = isLoadingScreen || Object.values(loadingCalculate).some((v) => !!v);

    return (
        <Backdrop
            transitionDuration={0}
            sx={{
                color: '#ffffff',
                zIndex: (theme) => theme.zIndex.drawer + 10000,
                backgroundColor: COLORS.BACKGROUND_LOADING
            }}
            open={isLoading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};

export default LoadingScreen;
