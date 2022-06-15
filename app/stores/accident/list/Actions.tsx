import { createAction } from '@reduxjs/toolkit';
import { ErrorObject } from '../../StoreConstants';

const Types = {
  GET_ACCIDENT_LIST: 'GET_ACCIDENT_LIST',
  ACCIDENT_LIST_LOADING: 'ACCIDENT_LIST_LOADING',
  ACCIDENT_LIST_SUCCESS: 'ACCIDENT_LIST_SUCCESS',
  ACCIDENT_LIST_FAILURE: 'ACCIDENT_LIST_FAILURE',

  POST_ACCIDENT_LIST: 'POST_ACCIDENT_LIST',
  POST_ACCIDENT_LIST_LOADING: 'POST_ACCIDENT_LIST_LOADING',
  POST_ACCIDENT_LIST_SUCCESS: 'POST_ACCIDENT_LIST_SUCCESS',
  POST_ACCIDENT_LIST_FAILURE: 'POST_ACCIDENT_LIST_FAILURE',
}

const Creators = {
  getAccidentList: createAction<any>(Types.GET_ACCIDENT_LIST),
  accidentListLoading: createAction(Types.ACCIDENT_LIST_LOADING),
  accidentListSuccess: createAction<any>(Types.ACCIDENT_LIST_SUCCESS),
  accidentListFailure: createAction<ErrorObject>(Types.ACCIDENT_LIST_FAILURE),

  postAccidentList: createAction<any>(Types.POST_ACCIDENT_LIST),
  postAccidentListLoading: createAction(Types.POST_ACCIDENT_LIST_LOADING),
  postAccidentListSuccess: createAction<any>(Types.POST_ACCIDENT_LIST_SUCCESS),
  postAccidentListFailure: createAction<ErrorObject>(Types.POST_ACCIDENT_LIST_FAILURE),
}

export { Types };
export default Creators;