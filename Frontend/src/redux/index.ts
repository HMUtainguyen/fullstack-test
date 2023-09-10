import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import REDUX_SLICE_NAMES from 'consts/redux-slice-names';
import confirmModalSlice from './store/confirmModal/confirmModalSlice';
import loadingSlice from './store/loadingScreen';
import userSlice from './store/userInfo';
import toastMessageSlice from './store/ToastMessage';
import checkingChanges from './store/checkingChanges';
import notification from './store/notification';
// import branchSlice from './store/branch';

const store = configureStore({
    reducer: {
        [REDUX_SLICE_NAMES.USER_INFO]: userSlice,
        [REDUX_SLICE_NAMES.CHECKING_CHANGES]: checkingChanges,
        [REDUX_SLICE_NAMES.LOADING_FULL_SCREEN]: loadingSlice,
        [REDUX_SLICE_NAMES.CONFIRM_MODAL]: confirmModalSlice,
        [REDUX_SLICE_NAMES.TOAST_NOTIFICATION]: toastMessageSlice,
        [REDUX_SLICE_NAMES.NOTIFICATION]: notification,
        // [REDUX_SLICE_NAMES.BRANCH]: branchSlice
    }
});

export const useSelector = useReduxSelector;

export const useDispatch = () => useReduxDispatch();

export default store;
