import { createReducer } from '@reduxjs/toolkit';
import { ActionObject } from '../../StoreConstants';
import { Types } from './Actions';
import INITIAL_STATE, { EmployeeFormInitialState } from './InitialState';

const getLoading = (state: EmployeeFormInitialState, action: ActionObject) => ({
  ...state,
  getLoading: true,
  getError: INITIAL_STATE.getError,
});

const getSuccess = (state: EmployeeFormInitialState, action: ActionObject) => ({
  ...state,
  getData: action.payload,
  getLoading: false,
  getError: INITIAL_STATE.getError,
});

const getFailure = (state: EmployeeFormInitialState, action: ActionObject) => ({
  ...state,
  getData: INITIAL_STATE.getData,
  getLoading: false,
  getError: action.payload,
});

const postLoading = (state: EmployeeFormInitialState, action: ActionObject) => ({
  ...state,
  postData: INITIAL_STATE.postData,
  postLoading: true,
  postError: INITIAL_STATE.postError,
});

const postSuccess = (state: EmployeeFormInitialState, action: ActionObject) => ({
  ...state,
  postData: action.payload,
  postLoading: false,
  postError: INITIAL_STATE.postError,
});

const postFailure = (state: EmployeeFormInitialState, action: ActionObject) => ({
  ...state,
  postData: INITIAL_STATE.postData,
  postLoading: false,
  postError: action.payload,
});

export const EmployeeFormReducer = createReducer(INITIAL_STATE, {
  [Types.GET_EMPLOYEE_FORM_LOADING]: getLoading,
  [Types.GET_EMPLOYEE_FORM_SUCCESS]: getSuccess,
  [Types.GET_EMPLOYEE_FORM_FAILURE]: getFailure,

  [Types.POST_EMPLOYEE_FORM_LOADING]: postLoading,
  [Types.POST_EMPLOYEE_FORM_SUCCESS]: postSuccess,
  [Types.POST_EMPLOYEE_FORM_FAILURE]: postFailure,
});
