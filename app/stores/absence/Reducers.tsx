import { createReducer } from '@reduxjs/toolkit';
import { ActionObject } from '../StoreConstants';
import { Types } from './Actions';
import INITIAL_STATE, { AbsenceInitialState } from './InitialState';

const getLoading = (state: AbsenceInitialState, action: ActionObject) => ({
  ...state,
  getData: INITIAL_STATE.getData,
  getLoading: true,
  getError: INITIAL_STATE.getError,
});

const getSuccess = (state: AbsenceInitialState, action: ActionObject) => ({
  ...state,
  getData: action.payload,
  getLoading: false,
  getError: INITIAL_STATE.getError,
});

const getFailure = (state: AbsenceInitialState, action: ActionObject) => ({
  ...state,
  getData: INITIAL_STATE.getData,
  getLoading: false,
  getError: action.payload,
});

const postLoading = (state: AbsenceInitialState, action: ActionObject) => ({
  ...state,
  postData: INITIAL_STATE.postData,
  postLoading: true,
  postError: INITIAL_STATE.postError,
});

const postSuccess = (state: AbsenceInitialState, action: ActionObject) => ({
  ...state,
  postData: action.payload,
  postLoading: false,
  postError: INITIAL_STATE.postError,
});

const postFailure = (state: AbsenceInitialState, action: ActionObject) => ({
  ...state,
  postData: INITIAL_STATE.postData,
  postLoading: false,
  postError: action.payload,
});

export const AbsenceReducer = createReducer(INITIAL_STATE, {
  [Types.GET_ABSENCE_LOADING]: getLoading,
  [Types.GET_ABSENCE_SUCCESS]: getSuccess,
  [Types.GET_ABSENCE_FAILURE]: getFailure,

  [Types.POST_ABSENCE_ANSWER_LOADING]: postLoading,
  [Types.POST_ABSENCE_ANSWER_SUCCESS]: postSuccess,
  [Types.POST_ABSENCE_ANSWER_FAILURE]: postFailure,
});
