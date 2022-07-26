import { createReducer } from '@reduxjs/toolkit';
import { ActionObject } from '../../StoreConstants';
import { Types } from './Actions';
import INITIAL_STATE, { AccidentListInitialState } from './InitialState';

const getLoading = (state: AccidentListInitialState, action: ActionObject) => ({
  ...state,
  getData: INITIAL_STATE.getData,
  getLoading: true,
  getError: INITIAL_STATE.getError,
});

const getSuccess = (state: AccidentListInitialState, action: ActionObject) => ({
  ...state,
  getData: action.payload,
  getLoading: false,
  getError: INITIAL_STATE.getError,
});

const getFailure = (state: AccidentListInitialState, action: ActionObject) => ({
  ...state,
  getData: INITIAL_STATE.getData,
  getLoading: false,
  getError: action.payload,
});

const postLoading = (state: AccidentListInitialState, action: ActionObject) => ({
  ...state,
  postData: INITIAL_STATE.postData,
  postLoading: true,
  postError: INITIAL_STATE.postError,
});

const postSuccess = (state: AccidentListInitialState, action: ActionObject) => ({
  ...state,
  postData: action.payload,
  postLoading: false,
  postError: INITIAL_STATE.postError,
});

const postFailure = (state: AccidentListInitialState, action: ActionObject) => ({
  ...state,
  postData: INITIAL_STATE.postData,
  postLoading: false,
  postError: action.payload,
});

export const AccidentListReducer = createReducer(INITIAL_STATE, {
  [Types.ACCIDENT_LIST_LOADING]: getLoading,
  [Types.ACCIDENT_LIST_SUCCESS]: getSuccess,
  [Types.ACCIDENT_LIST_FAILURE]: getFailure,

  [Types.POST_ACCIDENT_LIST_LOADING]: postLoading,
  [Types.POST_ACCIDENT_LIST_SUCCESS]: postSuccess,
  [Types.POST_ACCIDENT_LIST_FAILURE]: postFailure,
});
