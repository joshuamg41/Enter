import { createReducer } from '@reduxjs/toolkit';
import { ActionObject } from '../../StoreConstants';
import { Types } from './Actions';
import INITIAL_STATE, { AccidentFormInitialState } from './InitialState';

const getLoading = (state: AccidentFormInitialState, action: ActionObject) => ({
  ...state,
  getLoading: true,
  getError: INITIAL_STATE.getError,
});

const getSuccess = (state: AccidentFormInitialState, action: ActionObject) => ({
  ...state,
  getData: action.payload,
  getLoading: false,
  getError: INITIAL_STATE.getError,
});

const getFailure = (state: AccidentFormInitialState, action: ActionObject) => ({
  ...state,
  getData: INITIAL_STATE.getData,
  getLoading: false,
  getError: action.payload,
});

const postLoading = (state: AccidentFormInitialState, action: ActionObject) => ({
  ...state,
  postData: INITIAL_STATE.postData,
  postLoading: true,
  postError: INITIAL_STATE.postError,
});

const postSuccess = (state: AccidentFormInitialState, action: ActionObject) => ({
  ...state,
  postData: action.payload,
  postLoading: false,
  postError: INITIAL_STATE.postError,
});

const postFailure = (state: AccidentFormInitialState, action: ActionObject) => ({
  ...state,
  postData: INITIAL_STATE.postData,
  postLoading: false,
  postError: action.payload,
});

export const AccidentFormReducer = createReducer(INITIAL_STATE, {
  [Types.GET_ACCIDENT_FORM_LOADING]: getLoading,
  [Types.GET_ACCIDENT_FORM_SUCCESS]: getSuccess,
  [Types.GET_ACCIDENT_FORM_FAILURE]: getFailure,

  [Types.POST_ACCIDENT_FORM_LOADING]: postLoading,
  [Types.POST_ACCIDENT_FORM_SUCCESS]: postSuccess,
  [Types.POST_ACCIDENT_FORM_FAILURE]: postFailure,
});
