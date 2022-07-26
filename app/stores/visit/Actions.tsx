import {createAction} from '@reduxjs/toolkit';
import {ErrorObject} from '../StoreConstants';

const Types = {
  VISIT_PAYLOAD: 'VISIT_PAYLOAD',
  VISIT_LOADING: 'VISIT_LOADING',
  VISIT_SUCCESS: 'VISIT_SUCCESS',
  VISIT_FAILURE: 'VISIT_FAILURE',
};

const Creators = {
  visitPayload: createAction<any>(Types.VISIT_PAYLOAD),
  visitLoading: createAction(Types.VISIT_LOADING),
  visitSuccess: createAction<any>(Types.VISIT_SUCCESS),
  visitFailure: createAction<ErrorObject>(Types.VISIT_FAILURE),
};

export {Types};
export default Creators;
