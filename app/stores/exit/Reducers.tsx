import { createReducer } from '@reduxjs/toolkit';
import { ActionObject } from '../StoreConstants';
import { Types } from './Actions';
import INITIAL_STATE, { ExitInitialState } from './InitialState';

const getLoading = (state: ExitInitialState, action: ActionObject) => ({
  ...state,
  getData: INITIAL_STATE.getData,
  getLoading: true,
  getError: INITIAL_STATE.getError,
});

const getSuccess = (state: ExitInitialState, action: ActionObject) => ({
  ...state,
  getData: action.payload,
  getLoading: false,
  getError: INITIAL_STATE.getError,
});

const getFailure = (state: ExitInitialState, action: ActionObject) => ({
  ...state,
  getData: INITIAL_STATE.getData,
  getLoading: false,
  getError: action.payload,
});

export const ExitReducer = createReducer(INITIAL_STATE, {
  [Types.GET_EXIT_LOADING]: getLoading,
  [Types.GET_EXIT_SUCCESS]: getSuccess,
  [Types.GET_EXIT_FAILURE]: getFailure,
});
