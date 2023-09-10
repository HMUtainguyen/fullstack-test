import apiService from 'services/api-services';
import URL_PATHS from 'services/url-path';

export const LoginAccount = async (data: any) => {
    try {
        const res = await apiService.post(URL_PATHS.LOGIN_ADMIN, data);
        return res;
    } catch (error) {
        throw error;
    }
};
export const LogOutAccount = async (data: any) => {
    try {
        localStorage.clear()
        window.location.reload();

        // const res = await apiService.post(URL_PATHS.LOG_OUT);
        // data();
        // return res;
    } catch (error) {
        throw error;
    }
};
export const GetCurrentUser = async () => {
    try {
        const res = await apiService.get(URL_PATHS.GET_CURRENT);
        return res;
    } catch (error) {
        throw error;
    }
};
export const ChangePassWord = async (data: any) => {
    try {
        const res = await apiService.post(URL_PATHS.ChangePassWord, data);
        return res;
    } catch (error) {
        throw error;
    }
};
export const UpdateProfile = async (data: any, id: string) => {
    try {
        const res = await apiService.put(URL_PATHS.UPDATE_USER, data);
        return res;
    } catch (error) {
        throw error;
    }
};

export const GetListAccount = async (data: any, filter?: any) => {
    try {
        const res = await apiService.getFilter(URL_PATHS.GET_LIST_ACCOUNT, data, filter);
        return res;
    } catch (error) {
        throw error;
    }
};
// export const GetNotificationCount = async () => {
//     const params = {
//         platform: 'Web'
//     };
//     try {
//         const res: any = await apiService.getFilter(URL_PATHS.GET_NOTIFICATION_UNSEEN, params);
//         return res;
//     } catch (error: any) {
//         throw error;
//     }
// };
// export const GetRoleById = async (roleId: number) => {
//     try {
//         const res: any = await apiService.get(`${URL_PATHS.GET_LIST_ROLE}/${roleId}`);
//         return res;
//     } catch (error: any) {
//         throw error;
//     }
// };

export const RefreshToken = async (accessToken: string, refreshToken: string) => {
    try {
        const params = {
            accessToken: accessToken,
            refreshToken: refreshToken
        };
        const res: any = await apiService.post(URL_PATHS.REFRESH_TOKEN, params);
        return res;
    } catch (error: any) {
        throw error;
    }
};

export const handleGetListStore = async () => {
    const params = {
        Sorts: 'name',
        Page: 1,
        PageSize: 100
    };
    try {
        const res: any = await apiService.getFilter(URL_PATHS.GET_LOOK_UP_BRANCHS, params);
        return res;
    } catch (error: any) {
        throw error;
    }
};
