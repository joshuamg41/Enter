import { createAction } from '@reduxjs/toolkit';
import { ErrorObject } from '../../StoreConstants';

const Types = {
  GET_EMPLOYEE_FORM: 'GET_EMPLOYEE_FORM',
  GET_EMPLOYEE_FORM_LOADING: 'GET_EMPLOYEE_FORM_LOADING',
  GET_EMPLOYEE_FORM_SUCCESS: 'GET_EMPLOYEE_FORM_SUCCESS',
  GET_EMPLOYEE_FORM_FAILURE: 'GET_EMPLOYEE_FORM_FAILURE',

  POST_EMPLOYEE_FORM: 'POST_EMPLOYEE_FORM',
  POST_EMPLOYEE_FORM_LOADING: 'POST_EMPLOYEE_FORM_LOADING',
  POST_EMPLOYEE_FORM_SUCCESS: 'POST_EMPLOYEE_FORM_SUCCESS',
  POST_EMPLOYEE_FORM_FAILURE: 'POST_EMPLOYEE_FORM_FAILURE',
}

const Creators = {
  getEmployeeForm: createAction<any>(Types.GET_EMPLOYEE_FORM),
  getEmployeeFormLoading: createAction(Types.GET_EMPLOYEE_FORM_LOADING),
  getEmployeeFormSuccess: createAction<any>(Types.GET_EMPLOYEE_FORM_SUCCESS),
  getEmployeeFormFailure: createAction<ErrorObject>(Types.GET_EMPLOYEE_FORM_FAILURE),

  postEmployeeForm: createAction<any>(Types.POST_EMPLOYEE_FORM),
  postEmployeeFormLoading: createAction(Types.POST_EMPLOYEE_FORM_LOADING),
  postEmployeeFormSuccess: createAction<any>(Types.POST_EMPLOYEE_FORM_SUCCESS),
  postEmployeeFormFailure: createAction<ErrorObject>(Types.POST_EMPLOYEE_FORM_FAILURE),
}

export { Types };
export default Creators;