import { call, put, takeLatest } from 'redux-saga/effects';
import { ApiResponse } from '../../services/BaseApiConstants';
import { EmployeeResponse } from '../../services/employee/EmployeeServiceConstants';
import EmployeeService from '../../services/employee/EmployeeService';
import ResponseCode from '../../services/ResponseCode';
import EmployeeListActions, { Types as EmployeeListTypes } from '../../stores/employee/list/Actions';
import { isEmpty } from '../../utils/ValidationUtil';

function* getEmployeeList(request: any) {
  yield put(EmployeeListActions.employeeListLoading());

  const response: ApiResponse<EmployeeResponse> = yield call(EmployeeService.getEmployeeList, request.payload);

  if (!response) {
    yield put(EmployeeListActions.employeeListFailure(ResponseCode.BAD_REQUEST));
    return
  }

  if (response.problem) {
    yield put(EmployeeListActions.employeeListFailure(response.problem));
    return
  }

  if (isEmpty(response.data)) {
    yield put(EmployeeListActions.employeeListSuccess([]));
    return
  }

  const result = response.data

  yield put(EmployeeListActions.employeeListSuccess(result));
}

export default [
  takeLatest(EmployeeListTypes.GET_EMPLOYEE_LIST, getEmployeeList),
]