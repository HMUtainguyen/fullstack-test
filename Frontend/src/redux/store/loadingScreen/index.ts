import { createSlice } from '@reduxjs/toolkit';
import REDUX_SLICE_NAMES from 'consts/redux-slice-names';
import { useDispatch } from 'react-redux';

interface CalculateType {
  prices: boolean;
  shipping: boolean;
}

interface InitialStateType {
  isLoading: boolean;
  isLoadingCalculate: CalculateType;
}

export const CALCULATE_KEYS: {
  prices: keyof CalculateType;
  shipping: keyof CalculateType;
} = {
  prices: 'prices',
  shipping: 'shipping'
};

const initialState: InitialStateType = {
  isLoading: false,
  isLoadingCalculate: {
    prices: false,
    shipping: false
  }
};

export const loadingSlice = createSlice({
  name: REDUX_SLICE_NAMES.LOADING_FULL_SCREEN,
  initialState,
  reducers: {
    setLoadingScreenState: (state: InitialStateType, { payload }) => {
      state.isLoading = payload;
    },

    setLoadingCalculateState: (
      state: InitialStateType,
      { payload }: { payload: { fieldName: keyof CalculateType; value: boolean } }
    ) => {
      const { fieldName, value } = payload;
      state.isLoadingCalculate[fieldName] = value;
    }
  }
});

export const { setLoadingScreenState, setLoadingCalculateState } = loadingSlice.actions;

export const useSetLoadingScreenState = () => {
  const dispatch = useDispatch();
  const setLoadingScreen = (bool: boolean) => {
    dispatch(setLoadingScreenState(bool));
  };
  const setLoadingCalculate = (params: { fieldName: keyof CalculateType; value: boolean }) => {
    dispatch(setLoadingCalculateState(params));
  };
  return { setLoadingScreen, setLoadingCalculate };
};

export default loadingSlice.reducer;
