import { createAction } from '@reduxjs/toolkit';
import { ErrorObject } from '../../StoreConstants';

const Types = {
  GET_EMPLOYEE_LIST: 'GET_EMPLOYEE_LIST',
  EMPLOYEE_LIST_LOADING: 'EMPLOYEE_LIST_LOADING',
  EMPLOYEE_LIST_SUCCESS: 'EMPLOYEE_LIST_SUCCESS',
  EMPLOYEE_LIST_FAILURE: 'EMPLOYEE_LIST_FAILURE',
}

const Creators = {
  getEmployeeList: createAction<any>(Types.GET_EMPLOYEE_LIST),
  employeeListLoading: createAction(Types.EMPLOYEE_LIST_LOADING),
  employeeListSuccess: createAction<any>(Types.EMPLOYEE_LIST_SUCCESS),
  employeeListFailure: createAction<ErrorObject>(Types.EMPLOYEE_LIST_FAILURE),
}

export { Types };
export default Creators;