import { Box, Button, styled } from '@mui/material';
import Background from 'assets/icons/image-login.svg';
import NotFound from 'assets/images/404_notfound.png';
import { useNavigate } from 'react-router-dom';

const NotFoundView = () => {
    const navigate = useNavigate();
    return (
        <NotFoundBox sx={{}}>
            <img src={NotFound} alt="not found" />
            <Message>Not Found page!</Message>
            <Button
                onClick={() => {
                    navigate(-1);
                }}
            >
                <Message sx={{ fontWeight: 700, textTransform: 'none' }}>Back</Message>
            </Button>
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
    color: '#FFFFFF',
    marginBottom: 10,
    fontFamily: 'Montserrat'
});

export default NotFoundView;
