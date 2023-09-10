import { Box, Button, Stack, styled } from '@mui/material';
import Background from 'assets/icons/image-login.svg';
import NotFound from 'assets/images/401_unauthorized.jpg';
import COLORS from 'consts/colors';
import ROUTERS_PATHS from 'consts/router-paths';
import useAuth from 'hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { LogOutAccount } from 'redux/store/account';

const AuthorizationView = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    return (
        <NotFoundBox sx={{}}>
            <img src={NotFound} alt="not found" />
            <Message>You can not access this page!</Message>
            <Stack direction={'row'}>
                <Button
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    <Message sx={{ fontWeight: 700, textTransform: 'none' }}>Back</Message>
                </Button>
                <Button
                    onClick={() => {
                        LogOutAccount(logout);
                        navigate(ROUTERS_PATHS.LOGIN)
                    }}
                >
                    <Message sx={{ fontWeight: 700, textTransform: 'none' }}>Log out</Message>
                </Button>
            </Stack>
        </NotFoundBox>
    );
};

const NotFoundBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: `url(${Background})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    height: '100vh'
});

const Message = styled('div')({
    fontWeight: 500,
    fontSize: '20px',
    lineHeight: '20px',
    color: COLORS.WHITE,
    marginBottom: 10,
    fontFamily: 'Montserrat'
});

export default AuthorizationView;
