import axios from 'axios';
import { BASE_URL } from 'shared/config';

const isHandlerEnabled = true;
const requestHandler = (request: any, isHandlerEnabled: any) => {
    if (isHandlerEnabled) {
        request.headers.common['Content-Type'] = 'applicaton/json; charset=utf-8';
        request.headers.common['Accept'] = 'application/json, text/javascript, */*; q=0.01';
        request.headers.common['Access-Control-Allow-Origin'] = '*';
    }

    const token = localStorage.getItem('token');
    if (token) {
        request.headers.common['Authorization'] = ` ${token}`;
    }

    return request;
}
const successHandler = (response: any, isHandlerEnabled: boolean) => {
    if (isHandlerEnabled) {
        //TODO: Do Success Handler
    }

    return response;
};

const errorHandler = (error: any, isHandlerEnabled: any) => {
    if (isHandlerEnabled) {
        //TODO: Do Error Handler
    }

    return Promise.reject({
        ...(error.response
            ? error.response.data
            : error?.message === 'ExpiredTime'
                ? {
                    errorType: 'ExpiredTime',
                    errorMessage: 'Expired Time'
                }
                : {
                    errorType: 'UnhandledException',
                    errorMessage: 'Unhandled Exception'
                })
    });
};

export default class Service {
    axios: any;
    constructor(namespace?: any, timeout?: number) {
        namespace = namespace;
        this.axios = axios.create({
            baseURL: BASE_URL,
            responseType: 'json',
            timeout: timeout || 300000,
            timeoutErrorMessage: 'ExpiredTime'
        });

        //Enable request interceptor
        this.axios.interceptors.request.use(
            (request: any) => requestHandler(request, isHandlerEnabled),
            (error: any) => errorHandler(error, isHandlerEnabled)
        );

        //Response and Error handler
        this.axios.interceptors.response.use(
            (response: any) => successHandler(response, isHandlerEnabled),
            (error: any) => errorHandler(error, isHandlerEnabled)
        );
    }
    /**
  * Get Http Request
  * @param {any} action
  */
    get(action: any, params?: any) {
        return new Promise((resolve, reject) => {
            this.axios
                .request(params ? action + '?' + params : action, {
                    method: 'GET'
                })
                .then((response: any) => {
                    if (response.data) {
                        resolve(response.data);
                    } else {
                        reject(response);
                    }
                })
                .catch((error: any) => {
                    if (error.response && error.response.data && error.response.data.error) {
                        console.error('REST request error!', error.response.data.error);
                        reject(error.response.data.error);
                    } else reject(error);
                });
        });
    }

    postParams(action: any, params: any, body?: any) {
        return new Promise((resolve, reject) => {
            this.axios
                .request(params ? action + '?' + params : action, {
                    method: 'POST',
                    data: body
                })
                .then((response: any) => {
                    if (response.data) {
                        resolve(response.data);
                    } else {
                        reject(response);
                    }
                })
                .catch((error: any) => {
                    if (error.response && error.response.data && error.response.data.error) {
                        console.error('REST request error!', error.response.data.error);
                        reject(error.response.data.error);
                    } else reject(error);
                });
        });
    }
    /**
   * Post Http Request
   * @param {any} action
   * @param {any} params
   */
    post(action: any, params?: any) {
        return new Promise((resolve, reject) => {
            this.axios
                .request(action, {
                    method: 'POST',
                    data: params
                })
                .then((response: any) => {
                    if (response.data) {
                        resolve(response.data);
                    } else {
                        reject(response);
                    }
                })
                .catch((error: any) => {
                    if (error.response && error.response.data && error.response.data.error) {
                        console.error('REST request error!', error.response.data.error);
                        reject(error.response.data.error);
                    } else reject(error);
                });
        });
    }

    /**
     * Put Http Request
     * @param {any} action
     * @param {any} params
     */
    put(action: any, requestBody?: any, params = null) {
        return new Promise((resolve, reject) => {
            this.axios
                .request(params ? action + '?' + params : action, {
                    method: 'PUT',
                    data: requestBody
                })
                .then((response: any) => {
                    if (response.data) {
                        resolve(response.data);
                    } else {
                        reject(response);
                    }
                })
                .catch((error: any) => {
                    if (error.response && error.response.data && error.response.data.error) {
                        console.error('REST request error!', error.response.data.error);
                        reject(error.response.data.error);
                    } else reject(error);
                });
        });
    }
    /**
     *Delete Http Request
     * @param {any} action
     * @param {any} params
     */
    delete(action: any, params: any = null, requestBody?: any) {
        return new Promise((resolve, reject) => {
            this.axios
                .request(params ? action + '?' + params : action, {
                    method: 'DELETE',
                    data: requestBody
                })
                .then((response: any) => {
                    if (response.data) {
                        resolve(response.data);
                    } else {
                        reject(response);
                    }
                })
                .catch((error: any) => {
                    if (error.response && error.response.data && error.response.data.error) {
                        console.error('REST request error!', error.response.data.error);
                        reject(error.response.data.error);
                    } else reject(error);
                });
        });
    }
}