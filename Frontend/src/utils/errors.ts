import { MessageErrorsAPI, MESSAGE_CODES, SlugCode } from 'consts/messageError';
import { flattenDeep } from 'lodash';

export const findErrorMessage = (errorData: any) => {
    if (!errorData) {
        return { errorCode: MESSAGE_CODES.UnhandleException };
    }
    if (errorData.errors) {
        const listErrorCode: any = flattenDeep(Object?.values(errorData.errors));
        if (listErrorCode?.length > 0) {
            const [errorCode, value] = listErrorCode[0].split(':');
            return { errorCode: errorCode, ...(value && { value: value }) };
        }
        return { errorCode: MESSAGE_CODES.UnhandleException };
    } else if (errorData.exceptionDetails && errorData.exceptionDetails.length > 0) {
        const errorMessage = errorData.exceptionDetails[0]?.message || '';
        const [errorCode, value] = errorMessage.split(':');
        return errorCode ? { errorCode: errorCode, ...(value && { value: value }) } : { errorCode: MESSAGE_CODES.UnhandleException };
    }
    return { errorCode: MESSAGE_CODES.UnhandleException };
};

export const getErrorMessage = (params: { errorCode: string; value?: string }) => {
    const { errorCode, value } = params;
    let message = MessageErrorsAPI[errorCode];
    if (value) {
        message = message.replace(SlugCode, value);
    }
    return message;
};

export const getErrorToastMessage = (errorData: any) => {
    const errRes = findErrorMessage(errorData);
    const errMessage = getErrorMessage(errRes);

    return errMessage;
};
