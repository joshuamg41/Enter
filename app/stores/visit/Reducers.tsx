import {createReducer} from '@reduxjs/toolkit';
import {ActionObject} from '../StoreConstants';
import {Types} from './Actions';
import INITIAL_STATE, {VisitInitialState} from './InitialState';

const getLoading = (state: VisitInitialState, action: ActionObject) => ({
  ...state,
  getLoading: true,
  getError: INITIAL_STATE.getError,
});

const getSuccess = (state: VisitInitialState, action: ActionObject) => ({
  ...state,
  getData: action.payload,
  getLoading: false,
  getError: INITIAL_STATE.getError,
});

const getFailure = (state: VisitInitialState, action: ActionObject) => ({
  ...state,
  getData: INITIAL_STATE.getData,
  getLoading: false,
  getError: action.payload,
});

export const VisitReducer = createReducer(INITIAL_STATE, {
  [Types.VISIT_LOADING]: getLoading,
  [Types.VISIT_SUCCESS]: getSuccess,
  [Types.VISIT_FAILURE]: getFailure,
});
