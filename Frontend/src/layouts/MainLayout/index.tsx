import React, { useEffect, useState } from 'react';
import Header from '../Header';
import { makeStyles } from '@mui/styles';
import LoadingScreen from 'components/LoadingScreen';
import { useLoadingScreen } from 'hooks/useLoadingScreen';
import { Box, Hidden, Paper } from '@mui/material';
import Sidebar from 'layouts/Sidebar';
import NavMobile from 'layouts/SidebarNav';

const useStyles = makeStyles({
    mainContainer: {
        marginTop: 64,
        marginLeft: 300,
        left: 0,
        position: 'relative',
        transition: 'all 0.3s ease-in-out',
        padding: 24
    },
    mainContainerNav: {
        marginTop: 88,
        left: 0,
        position: 'relative',
        transition: 'all 0.2s ease-in-out',
        padding: 24
    },
    paperContainer: {
        height: '95%',
        borderRadius: 'unset !important',
        boxShadow: 'unset !important'
    }
});

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
    const classes = useStyles();
    const { isLoadingScreen } = useLoadingScreen();
    const [windowHeight, setWindowHeight] = useState(window.innerHeight - 142);
    const [windowHeightNav, setWindowHeightNav] = useState(window.innerHeight - 177);
    const updateHeight = () => {
        setWindowHeight(window.innerHeight - 142);
        setWindowHeightNav(window.innerHeight - 177);
    };

    useEffect(() => {
        window.addEventListener('resize', updateHeight);
        return () => window.removeEventListener('resize', updateHeight);
    });
    return (
        <>
            <Hidden mdDown>
                <Header />
                <div className={'page-wrapper ' + classes.mainContainer} style={{ minHeight: windowHeight }}>
                    <Box className={classes.paperContainer} component={Paper}>
                        {children}
                    </Box>
                </div>
                <Sidebar />
            </Hidden>

            <Hidden mdUp>
                <Header />
                <div className={'page-wrapper ' + classes.mainContainerNav} style={{ minHeight: windowHeightNav }}>
                    <Box className={classes.paperContainer} component={Paper}>
                        {children}
                    </Box>
                </div>
                <NavMobile />
            </Hidden>

            {isLoadingScreen && <LoadingScreen />}
        </>
    );
};

export default MainLayout;
