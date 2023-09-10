import { createSlice } from '@reduxjs/toolkit';
import REDUX_SLICE_NAMES from 'consts/redux-slice-names';
import { useDispatch } from 'react-redux';

interface InitialStateType {
  notiUnseen: number;
}

const initialState: InitialStateType = {
  notiUnseen: 0
};

export const notificationSlice = createSlice({
  name: REDUX_SLICE_NAMES.NOTIFICATION,
  initialState,
  reducers: {
    setNotiUnseenAction: (state, { payload }) => {
      state.notiUnseen = payload;
    }
  }
});

export const { setNotiUnseenAction } = notificationSlice.actions;

export const useSetNotificationState = () => {
  const dispatch = useDispatch();
  const setNotiUnseen = (count: number) => {
    dispatch(setNotiUnseenAction(count));
  };
  return { setNotiUnseen };
};

export default notificationSlice.reducer;
