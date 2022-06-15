import { createReducer } from '@reduxjs/toolkit';
import { ActionObject } from '../StoreConstants';
import { Types } from './Actions';
import INITIAL_STATE, { EntryInitialState } from './InitialState';

const getLoading = (state: EntryInitialState, action: ActionObject) => ({
  ...state,
  getData: INITIAL_STATE.getData,
  getLoading: true,
  getError: INITIAL_STATE.getError,
});

const getSuccess = (state: EntryInitialState, action: ActionObject) => ({
  ...state,
  getData: action.payload,
  getLoading: false,
  getError: INITIAL_STATE.getError,
});

const getFailure = (state: EntryInitialState, action: ActionObject) => ({
  ...state,
  getData: INITIAL_STATE.getData,
  getLoading: false,
  getError: action.payload,
});

export const EntryReducer = createReducer(INITIAL_STATE, {
  [Types.GET_ENTRY_LOADING]: getLoading,
  [Types.GET_ENTRY_SUCCESS]: getSuccess,
  [Types.GET_ENTRY_FAILURE]: getFailure,
});
