import React, { useEffect, useReducer, useState } from 'react';

import SplashScreen from 'components/SplashScreen/index';
import Toast from 'components/Toast';
import { useSetUserInformationState } from 'redux/store/userInfo';
import { GetCurrentUser, } from 'redux/store/account';
import { useSetToastInformationState } from 'redux/store/ToastMessage';
import { STATUS_TOAST } from 'consts/statusCode';
import { useLocation } from 'react-router-dom';
import { useSetCheckingChangesState } from 'redux/store/checkingChanges';

const ACTION_TYPE = {
    INITIALISE: 'INITIALISE',
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT'
};

interface InitialAuthStateProps {
    isAuthenticated: boolean;
    isInitialised: boolean;
}

const initialAuthState: InitialAuthStateProps = {
    isAuthenticated: false,
    isInitialised: false
};

const reducer = (state: any, action: { type: string; payload?: any }) => {
    switch (action.type) {
        case ACTION_TYPE.INITIALISE: {
            const { isAuthenticated, user } = action.payload;
            return {
                ...state,
                isAuthenticated,
                isInitialised: true,
                user
            };
        }
        case ACTION_TYPE.LOGIN: {
            const { user } = action.payload;
            return {
                ...state,
                isAuthenticated: true,
                user
            };
        }
        case ACTION_TYPE.LOGOUT: {
            return {
                ...state,
                isAuthenticated: false,
                user: null
            };
        }
        default: {
            return state;
        }
    }
};

const AuthContext = React.createContext({
    ...initialAuthState,
    login: (data: any) => Promise,
    logout: () => Promise
});

interface IAuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider = ({ children }: IAuthProviderProps) => {
    const [state, dispatch] = useReducer(reducer, initialAuthState);
    const { setUserInformation } = useSetUserInformationState();
    const { setToastInformation } = useSetToastInformationState();
    const { setCheckingChanges } = useSetCheckingChangesState();
    const location = useLocation();

    const login = async (data: any) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('refreshToken', data.refreshToken);
        let userInfo = null;
        dispatch({
            type: ACTION_TYPE.LOGIN,
            payload: {
                user: userInfo
            }
        });

        return true;
    };

    const logout = () => {
        localStorage.clear();
        dispatch({ type: ACTION_TYPE.LOGOUT });
    };

    const initData = async () => {
        let token = localStorage.getItem('token');
        let userInfo: any = null;
        try {
            if (token) {
                const responseUserInfo: any = await GetCurrentUser();
                if (responseUserInfo) {
                    userInfo = responseUserInfo;
                    if (userInfo) {
                        setUserInformation(userInfo);
                    }
                }
            }
        } catch (error) {
            localStorage.clear();
            setToastInformation({ status: STATUS_TOAST.ERROR, message: 'system error' });
        } finally {
            setTimeout(() => {
                dispatch({
                    type: ACTION_TYPE.INITIALISE,
                    payload: {
                        isAuthenticated: Boolean(token && userInfo),
                        // isAuthenticated: true,
                        user: userInfo
                    }
                });
            }, 200);
        }
    };
 
    useEffect(() => {
        initData();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        setCheckingChanges({ isChange: false });
    }, [location.pathname]);

    if (!state.isInitialised) {
        return <SplashScreen />;
    }

    return (
        <>
            <AuthContext.Provider
                value={{
                    ...state,
                    logout,
                    login
                }}
            >
                {children}
            </AuthContext.Provider>
            <Toast />
        </>
    );
};

export default AuthContext;
