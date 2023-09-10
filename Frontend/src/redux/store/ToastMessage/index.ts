import { createSlice } from '@reduxjs/toolkit';
import { MessageErrorsAPI } from 'consts/messageError';
import REDUX_SLICE_NAMES from 'consts/redux-slice-names';
import { STATUS_TOAST } from 'consts/statusCode';
import { useDispatch } from 'react-redux';

interface InitialStateType {
  toastMessage: any;
}

const initialState: InitialStateType = {
  toastMessage: {}
};

export const toastMessageSlice = createSlice({
  name: REDUX_SLICE_NAMES.TOAST_NOTIFICATION,
  initialState,
  reducers: {
    setToastMessage: (state, { payload }) => {
      console.log('payload setToastMessage', payload);
      state.toastMessage = payload.infoToast;
      if (!payload.infoToast.message && payload.infoToast.status === STATUS_TOAST.ERROR) {
        state.toastMessage.message = MessageErrorsAPI.UnhandleException;
      }
    }
  }
});

export const { setToastMessage } = toastMessageSlice.actions;

export const useSetToastInformationState = () => {
  const dispatch = useDispatch();
  const setToastInformation = (infoToast: object) => {
    dispatch(setToastMessage({ infoToast }));
  };
  return { setToastInformation };
};

export default toastMessageSlice.reducer;
