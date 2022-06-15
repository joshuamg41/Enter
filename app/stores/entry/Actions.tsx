import { createAction } from '@reduxjs/toolkit';
import { ErrorObject } from '../StoreConstants';

const Types = {
  GET_ENTRY: 'GET_ENTRY',
  GET_ENTRY_LOADING: 'GET_ENTRY_LOADING',
  GET_ENTRY_SUCCESS: 'GET_ENTRY_SUCCESS',
  GET_ENTRY_FAILURE: 'GET_ENTRY_FAILURE',
}

const Creators = {
  getEntry: createAction<any>(Types.GET_ENTRY),
  getEntryLoading: createAction(Types.GET_ENTRY_LOADING),
  getEntrySuccess: createAction<any>(Types.GET_ENTRY_SUCCESS),
  getEntryFailure: createAction<ErrorObject>(Types.GET_ENTRY_FAILURE),
}

export { Types };
export default Creators;