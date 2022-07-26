import { createAction } from '@reduxjs/toolkit';
import { ErrorObject } from '../../StoreConstants';

const Types = {
  GET_ACCIDENT_FORM: 'GET_ACCIDENT_FORM',
  GET_ACCIDENT_FORM_LOADING: 'GET_ACCIDENT_FORM_LOADING',
  GET_ACCIDENT_FORM_SUCCESS: 'GET_ACCIDENT_FORM_SUCCESS',
  GET_ACCIDENT_FORM_FAILURE: 'GET_ACCIDENT_FORM_FAILURE',

  POST_ACCIDENT_FORM: 'POST_ACCIDENT_FORM',
  POST_ACCIDENT_FORM_LOADING: 'POST_ACCIDENT_FORM_LOADING',
  POST_ACCIDENT_FORM_SUCCESS: 'POST_ACCIDENT_FORM_SUCCESS',
  POST_ACCIDENT_FORM_FAILURE: 'POST_ACCIDENT_FORM_FAILURE',
}

const Creators = {
  getAccidentForm: createAction<any>(Types.GET_ACCIDENT_FORM),
  getAccidentFormLoading: createAction(Types.GET_ACCIDENT_FORM_LOADING),
  getAccidentFormSuccess: createAction<any>(Types.GET_ACCIDENT_FORM_SUCCESS),
  getAccidentFormFailure: createAction<ErrorObject>(Types.GET_ACCIDENT_FORM_FAILURE),

  postAccidentForm: createAction<any>(Types.POST_ACCIDENT_FORM),
  postAccidentFormLoading: createAction(Types.POST_ACCIDENT_FORM_LOADING),
  postAccidentFormSuccess: createAction<any>(Types.POST_ACCIDENT_FORM_SUCCESS),
  postAccidentFormFailure: createAction<ErrorObject>(Types.POST_ACCIDENT_FORM_FAILURE),
}

export { Types };
export default Creators;