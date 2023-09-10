/* eslint-disable array-callback-return */
import MESSAGES_ERROR from 'consts/messageError';

export const RegExpEmail = (email: any) => {
  let num = 0;
  if(email) {
    for(let i=0; i< email.length; ++i) {
      if(email[i] === '@') {
        num += 1;
      }
    }
  }
  if (num > 1) {
    return MESSAGES_ERROR.RegExpEmail;
  } else {
    const regex = new RegExp(/[a-zA-Z0-9.]+@[a-z0-9]/g);
    // const regex = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);
    return regex.test(email);
  }
};

export const RegPassword = (password: any) => {
  if(password && password.length < 6) {
    return MESSAGES_ERROR.charactersPassword
  }
}

export const RegPhoneNumber = (numberPhone: any) => {
  // const regex = new RegExp(/(84|0)+([0-9]{0,11})\b/g);
  const regex = new RegExp(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g);
  return regex.test(numberPhone);
};

export const RegNumber = /^[0-9\b]+$/;
export const REGEX_NON_NUMBER = /[^0-9]/g;
