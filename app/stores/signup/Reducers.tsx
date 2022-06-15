import { createReducer } from '@reduxjs/toolkit';
import { ActionObject } from '../StoreConstants';
import { Types } from './Actions';
import INITIAL_STATE, { SignupInitialState } from './InitialState';

const postLoading = (state: SignupInitialState, action: ActionObject) => ({
  ...state,
  postLoading: true,
  postError: INITIAL_STATE.postError,
});

const postSuccess = (state: SignupInitialState, action: ActionObject) => ({
  ...state,
  postData: action.payload,
  postLoading: false,
  postError: INITIAL_STATE.postError,
});

const postFailure = (state: SignupInitialState, action: ActionObject) => ({
  ...state,
  postData: INITIAL_STATE.postData,
  postLoading: false,
  postError: action.payload,
});

const signupCleanUp = (state: any, payload: { pin: string, type: string }) => ({
  ...state,
  ...INITIAL_STATE,
});

export const SignupReducer = createReducer(INITIAL_STATE, {
  [Types.REGISTER_LOADING]: postLoading,
  [Types.REGISTER_SUCCESS]: postSuccess,
  [Types.REGISTER_FAILURE]: postFailure,

  [Types.SIGNUP_CLEAN_UP]: signupCleanUp,
});
