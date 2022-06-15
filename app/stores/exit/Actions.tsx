import { createAction } from '@reduxjs/toolkit';
import { ErrorObject } from '../StoreConstants';

const Types = {
  GET_EXIT: 'GET_EXIT',
  GET_EXIT_LOADING: 'GET_EXIT_LOADING',
  GET_EXIT_SUCCESS: 'GET_EXIT_SUCCESS',
  GET_EXIT_FAILURE: 'GET_EXIT_FAILURE',
}

const Creators = {
  getExit: createAction<any>(Types.GET_EXIT),
  getExitLoading: createAction(Types.GET_EXIT_LOADING),
  getExitSuccess: createAction<any>(Types.GET_EXIT_SUCCESS),
  getExitFailure: createAction<ErrorObject>(Types.GET_EXIT_FAILURE),
}

export { Types };
export default Creators;