import { createReducer } from '@reduxjs/toolkit';
import { ActionObject } from '../StoreConstants';
import { Types } from './Actions';
import INITIAL_STATE, { HomeInitialState } from './InitialState';

const getLoading = (state: HomeInitialState, action: ActionObject) => ({
  ...state,
  getLoading: true,
  getError: INITIAL_STATE.getError,
});

const getSuccess = (state: HomeInitialState, action: ActionObject) => ({
  ...state,
  getData: action.payload,
  getLoading: false,
  getError: INITIAL_STATE.getError,
});

const getFailure = (state: HomeInitialState, action: ActionObject) => ({
  ...state,
  getData: INITIAL_STATE.getData,
  getLoading: false,
  getError: action.payload,
});

const getEntryLoading = (state: HomeInitialState, action: ActionObject) => ({
  ...state,
  getEntryLoading: true,
  getEntryError: INITIAL_STATE.getError,
});

const getEntryFailure = (state: HomeInitialState, action: ActionObject) => ({
  ...state,
  getProjectEntry: INITIAL_STATE.getProjectEntry,
  getEntryLoading: false,
  getEntryError: action.payload,
});

const getEntryProjectSuccess = (state: HomeInitialState, action: ActionObject) => ({
  ...state,
  getProjectEntry: action.payload,
  getEntryLoading: false,
  getEntryError: INITIAL_STATE.getEntryError,
});

const getLaborListSuccess = (state: HomeInitialState, action: ActionObject) => ({
  ...state,
  getLaborList: action.payload,
  getEntryLoading: false,
  getEntryError: INITIAL_STATE.getEntryError,
});

const getMasterListSuccess = (state: HomeInitialState, action: ActionObject) => ({
  ...state,
  getMasterList: action.payload,
  getEntryLoading: false,
  getEntryError: INITIAL_STATE.getEntryError,
});

const getEntryProvinceSuccess = (state: HomeInitialState, action: ActionObject) => ({
  ...state,
  getProvinceEntry: action.payload,
  getEntryLoading: false,
  getEntryError: INITIAL_STATE.getEntryError,
});

const getEntryMasterSuccess = (state: HomeInitialState, action: ActionObject) => ({
  ...state,
  getMasterEntry: action.payload,
  getEntryLoading: false,
  getEntryError: INITIAL_STATE.getEntryError,
});

const getEntryLaborSuccess = (state: HomeInitialState, action: ActionObject) => ({
  ...state,
  getLaborEntry: action.payload,
  getEntryLoading: false,
  getEntryError: INITIAL_STATE.getEntryError,
});

export const HomeReducer = createReducer(INITIAL_STATE, {
  [Types.HOME_LOADING]: getLoading,
  [Types.HOME_SUCCESS]: getSuccess,
  [Types.HOME_FAILURE]: getFailure,

  //ENTRY
  [Types.GET_ENTRY_LOADING]: getEntryLoading,
  [Types.GET_ENTRY_FAILURE]: getEntryFailure,

  [Types.GET_LABOR_LIST_SUCCESS]: getLaborListSuccess,
  [Types.GET_MASTER_LIST_SUCCESS]: getMasterListSuccess,
  [Types.GET_ENTRY_PROJECT_SUCCESS]: getEntryProjectSuccess,
  [Types.GET_ENTRY_PROVINCE_SUCCESS]: getEntryProvinceSuccess,
  [Types.GET_ENTRY_MASTER_SUCCESS]: getEntryMasterSuccess,
  [Types.GET_ENTRY_LABOR_SUCCESS]: getEntryLaborSuccess,
});
