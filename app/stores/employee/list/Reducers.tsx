import { createReducer } from '@reduxjs/toolkit';
import { ActionObject } from '../../StoreConstants';
import { Types } from './Actions';
import INITIAL_STATE, { EmployeeListInitialState } from './InitialState';

const getLoading = (state: EmployeeListInitialState, action: ActionObject) => ({
  ...state,
  getData: INITIAL_STATE.getData,
  getLoading: true,
  getError: INITIAL_STATE.getError,
});

const getSuccess = (state: EmployeeListInitialState, action: ActionObject) => ({
  ...state,
  getData: action.payload,
  getLoading: false,
  getError: INITIAL_STATE.getError,
});

const getFailure = (state: EmployeeListInitialState, action: ActionObject) => ({
  ...state,
  getData: INITIAL_STATE.getData,
  getLoading: false,
  getError: action.payload,
});

export const EmployeeListReducer = createReducer(INITIAL_STATE, {
  [Types.EMPLOYEE_LIST_LOADING]: getLoading,
  [Types.EMPLOYEE_LIST_SUCCESS]: getSuccess,
  [Types.EMPLOYEE_LIST_FAILURE]: getFailure,
});
