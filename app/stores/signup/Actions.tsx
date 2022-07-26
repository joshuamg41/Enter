import { createAction } from '@reduxjs/toolkit';
import { ErrorObject } from '../StoreConstants';

const Types = {
  POST_REGISTER: 'POST_REGISTER',
  REGISTER_LOADING: 'REGISTER_LOADING',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_FAILURE: 'REGISTER_FAILURE',

  SIGNUP_CLEAN_UP: 'SIGNUP_CLEAN_UP',
}

const Creators = {
  postRegister: createAction<any>(Types.POST_REGISTER),
  registerLoading: createAction(Types.REGISTER_LOADING),
  registerSuccess: createAction<any>(Types.REGISTER_SUCCESS),
  registerFailure: createAction<ErrorObject>(Types.REGISTER_FAILURE),

  signupCleanUp: createAction<ErrorObject>(Types.SIGNUP_CLEAN_UP),
}

export { Types };
export default Creators;