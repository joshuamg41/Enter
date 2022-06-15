import { createReducer } from '@reduxjs/toolkit';
import { ActionObject } from '../StoreConstants';
import { Types } from './Actions';
import INITIAL_STATE, { SecurityInitialState } from './InitialState';

const postLoading = (state: SecurityInitialState, action: ActionObject) => ({
  ...state,
  postLoading: true,
  postError: INITIAL_STATE.postError,
});

const postSuccess = (state: SecurityInitialState, action: ActionObject) => ({
  ...state,
  postData: action.payload,
  postLoading: false,
  postError: INITIAL_STATE.postError,
});

const postFailure = (state: SecurityInitialState, action: ActionObject) => ({
  ...state,
  postData: INITIAL_STATE.postData,
  postLoading: false,
  postError: action.payload,
});

export const SecurityReducer = createReducer(INITIAL_STATE, {
  [Types.SECURITY_LOADING]: postLoading,
  [Types.SECURITY_SUCCESS]: postSuccess,
  [Types.SECURITY_FAILURE]: postFailure,
});
