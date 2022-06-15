import { all, call, put, takeLatest, delay } from 'redux-saga/effects';
import { ApiResponse } from '../../services/BaseApiConstants';
import { EmployeeResponse } from '../../services/employee/EmployeeServiceConstants';
import EmployeeService from '../../services/employee/EmployeeService';
import AccidentService from '../../services/accident/AccidentService';
import ResponseCode from '../../services/ResponseCode';
import AccidentFormActions, { Types as AccidentFormTypes } from '../../stores/accident/form/Actions';
import { isEmpty } from '../../utils/ValidationUtil';
import { PostAccidentResponse } from '../../services/accident/AccidentServiceConstants';

function* getAccidentForm(request: any) {
  yield put(AccidentFormActions.getAccidentFormLoading());

  const [employeeList]: [ApiResponse<EmployeeResponse>] = yield all([
    call(EmployeeService.getEmployeeList, request.payload)
  ]);

  if (!employeeList) {
    yield put(AccidentFormActions.getAccidentFormFailure(ResponseCode.BAD_REQUEST));
    return
  }

  if (employeeList.problem) {
    yield put(AccidentFormActions.getAccidentFormFailure(employeeList.problem));
    return
  }

  const result = {
    employeeList: employeeList.data?.map((employee) => (
      {
        Id: employee.id,
        Name: employee.name,
        Value: employee,
      }
    ))
  }

  yield put(AccidentFormActions.getAccidentFormSuccess(result));
}

function* postAccidentForm(request: any) {
  yield put(AccidentFormActions.postAccidentFormLoading());

  const response: ApiResponse<PostAccidentResponse> = yield call(AccidentService.postForm, request.payload);

  if (!response) {
    yield put(AccidentFormActions.postAccidentFormFailure(ResponseCode.BAD_REQUEST));
    return
  }

  if (response.problem) {
    yield put(AccidentFormActions.postAccidentFormFailure(response.problem));
    return
  }

  const result = {
    success: true,
  }

  yield put(AccidentFormActions.postAccidentFormSuccess(result));
}

export default [
  takeLatest(AccidentFormTypes.GET_ACCIDENT_FORM, getAccidentForm),
  takeLatest(AccidentFormTypes.POST_ACCIDENT_FORM, postAccidentForm),
]