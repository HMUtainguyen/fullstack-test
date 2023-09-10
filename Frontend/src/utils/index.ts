import { LabelDisplayedRowsArgs } from '@mui/material';
import DISPLAY_TEXTS from 'consts/display-texts';
import { MessageErrorsAPI } from 'consts/messageError';
import { isEmpty, isString } from 'lodash';
import moment from 'moment';
import { SyntheticEvent } from 'react';

export const dateFormat = 'DD/MM/YYYY';
export const dateTimeFormat = 'DD/MM/YYYY HH:mm';
export const rowsPerPageOptions = [10, 20, 50];
export const getErrorMessage = (message: any) => {
    if (isString(message)) return message;
    return MessageErrorsAPI.UnhandleException;
};
export const deepClone = (ob: object | []) => {
    return JSON.parse(JSON.stringify(ob));
};

export const convertBreakToHtml = (text: string) => {
    return text && text.replace(/\r?\n/g, '<br/>');
};

export const labelDisplayedRows = (page: LabelDisplayedRowsArgs) =>
    `${page.from}-${page.to === -1 ? page.count : page.to} ${DISPLAY_TEXTS.displayRow} ${page.count}`;

export const convertStringToNumber = (value: string | number) => {
    return parseInt(value + '') || 0;
};
export const numberWithCommas = (x: number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
export const stripHTML = (html: string) => {
    let doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
};

export const handleErrorImage = (e: SyntheticEvent<HTMLImageElement, Event>, fallbackImage: string) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = fallbackImage;
};

export const getErrorMessageFromResponse = (error: any, ERRORS: any) => {
    let message = MessageErrorsAPI.UnhandleException;

    if (!isEmpty(error)) {
        let arValueErrors: any = Object.values(error);
        let arKeyErrors: any = Object.keys(error);
        if (arValueErrors?.length > 0) {
            message = ERRORS?.[arKeyErrors[0]]?.[arValueErrors[0]] || MessageErrorsAPI.UnhandleException;
        }
    }

    return message;
};

export const messageNoData = 'No data!';

export const uid = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const convertToDate = (value: any, format: string = dateFormat) => {
    return !!value && moment(value).isValid() ? moment(value).format(format) : '';
};
export const convertSearchString = (value: string) => {
    const specialCharacters = [',', '<', '>', '|'];
    const addStr = '\\';
    var strArr = String(value).split('');
    const newStr = strArr
        .map((e) => {
            if (specialCharacters.includes(e)) {
                return addStr + e;
            } else return e;
        })
        .reduce((pre, currennt) => {
            return pre + currennt;
        });
    return newStr;
};
