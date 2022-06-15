import { createAction } from '@reduxjs/toolkit';
import { ErrorObject } from '../StoreConstants';

const Types = {
  POST_SECURITY: 'POST_SECURITY',
  SECURITY_LOADING: 'SECURITY_LOADING',
  SECURITY_SUCCESS: 'SECURITY_SUCCESS',
  SECURITY_FAILURE: 'SECURITY_FAILURE',
}

const Creators = {
  postSecurity: createAction<any>(Types.POST_SECURITY),
  securityLoading: createAction(Types.SECURITY_LOADING),
  securitySuccess: createAction<any>(Types.SECURITY_SUCCESS),
  securityFailure: createAction<ErrorObject>(Types.SECURITY_FAILURE),
}

export { Types };
export default Creators;