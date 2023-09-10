import { Box, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ImageLogin from 'assets/icons/image-login.svg';
import LogoSrc from 'assets/images/logoLogin.png';
import useAuth from 'hooks/useAuth';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import LoginJWT from './components/LoginJWT/LoginJWT';
import Styles from './login.module.scss';
import { LoginAccount } from 'redux/store/account';
import { useSetToastInformationState } from 'redux/store/ToastMessage';
import { STATUS_TOAST } from 'consts/statusCode';
import { MessageErrorsAPI } from 'consts/messageError';
import { getErrorToastMessage } from 'utils/errors';

const useStyles = makeStyles(() => ({
    root: {},
    textBox: {
        '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            backgroundColor: '#ffffff !important',

            '& .MuiOutlinedInput-notchedOutline': {
                borderWidth: '1px !important',
                borderColor: '#fff !important'
            }
        },
        '& .Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
                border: '1px solid red !important'
            }
        },
        '& .Mui-disabled': {
            backgroundColor: '#ffffff !important'
        },
        '& .MuiTypography-root': {
            color: '#2E2E2E !important',
            fontWeight: '700 !important',
            fontSize: '16px !important',
            lineHeight: '15px !important'
        },
        '& input': {
            height: '33px'
        }
    },
    textBoxSendCode: {
        '& .MuiOutlinedInput-root': {
            // borderBottomRightRadius: '12px',
            // borderTopRightRadius: '12px',
            borderRadius: '12px',
            paddingLeft: '6px',
            backgroundColor: '#ffffff !important',

            '& .MuiOutlinedInput-notchedOutline': {
                borderWidth: '1px !important',
                borderColor: '#fff !important'
            }
        },
        '& input': {
            borderBottomLeftRadius: '0px !important',
            borderTopLeftRadius: '0px !important'
        },
        '& .Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
                border: '1px solid red !important'
            }
        },
        '& .Mui-disabled': {
            backgroundColor: '#ffffff !important'
        },
        '& .MuiTypography-root': {
            color: '#2E2E2E !important',
            fontWeight: '700 !important',
            fontSize: '16px !important',
            lineHeight: '15px !important'
        }
    },
    buttonLogin: {
        '& .MuiLoadingButton-loadingIndicator': {
            color: '#FFD392'
        }
    }
}));

const Login = () => {
    const { login } = useAuth();
    const { setToastInformation } = useSetToastInformationState();
    const {
        formState: { errors },
        handleSubmit,
        control,
        reset,
        setValue,
        setError,
        setFocus
    } = useForm({ defaultValues: { userName: '', password: '' }, mode: 'onChange', reValidateMode: 'onBlur' });
    const classes = useStyles();
    const [loginByOTP, setLoginByOTP] = useState(false);
    const [codeOTP, setCodeOTP] = useState(false);
    const [messageErrorOTP, setMessageErrorOTP] = useState('');
    const [messageErrorLogin, setMessageErrorLogin] = useState('');
    const [codeOTPValue, setCodeOTPValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [tokenFcm, setTokenFcm] = useState<any>('');
    const handleLogin = async (data: any) => {
        let param = {
            username: data.userName,
            password: data.password
            // platform: 'Web',
            // ...(tokenFcm && { deviceToken: tokenFcm })
        };
        setIsLoading(true);
        try {
            const res: any = await LoginAccount(param);
            if (!res.status) {
                const submitData = {
                    token: res.data.accessToken,
                    refreshToken: res.data.refreshToken,
                    responseUserInfo: {
                        statusCode: 200
                    }
                };
                login(submitData);
            }
        } catch (error: any) {
            if (error.status === 400) {
                if (error.errors) {
                    const errorMessage = getErrorToastMessage(error);
                    setToastInformation({ status: STATUS_TOAST.ERROR, message: errorMessage });
                } else {
                    setMessageErrorLogin(MessageErrorsAPI.UsernameOrPasswordIncorrect);
                }
            } else {
                console.log(error);
                setToastInformation({ status: STATUS_TOAST.ERROR, message: MessageErrorsAPI.UnhandleException });
            }
        } finally {
            setIsLoading(false);
        }
    };
    const handleErrorLogin = () => {
        const error: any = Object.keys(errors)[0];
        setFocus(error, { shouldSelect: true });
    };
    const CodeOTP = () => {
        setCodeOTP(true);
        setMessageErrorOTP('');
    };
    useEffect(() => {
        reset({});
    }, [loginByOTP]);
    return (
        <div>
            <Grid className={Styles.background} container>
                <Grid item md={9} xs={12} className={Styles.layoutLeft}>
                    <img className={Styles.imageBackground} src={ImageLogin} loading="lazy" />
                </Grid>
                <Grid item md={3} xs={12}>
                    <img style={{ display: 'block', margin: 'auto' }} src={LogoSrc} alt="logo" width="200px" />
                    <Box className={Styles.login}>
                        <form>
                            <LoginJWT
                                Styles={Styles}
                                classes={classes}
                                control={control}
                                errors={errors}
                                handleSubmit={handleSubmit}
                                handleLogin={handleLogin}
                                handleErrorLogin={handleErrorLogin}
                                codeOTP={codeOTP}
                                setCodeOTP={setCodeOTP}
                                isLoading={isLoading}
                                reset={reset}
                                messageErrorLogin={messageErrorLogin}
                                setMessageErrorLogin={setMessageErrorLogin}
                                setValue={setValue}
                                setError={setError}
                            />
                        </form>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
};

export default Login;
