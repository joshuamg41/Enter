import {all, call, delay, put, takeLatest} from 'redux-saga/effects';
import {ApiResponse, GoogleResponse} from '../../services/BaseApiConstants';
import EmployeeService from '../../services/employee/EmployeeService';
import {
  LaborResponse,
  MasterResponse,
  PostEmployeeResponse,
} from '../../services/employee/EmployeeServiceConstants';
import ResponseCode from '../../services/ResponseCode';
import EmployeeFormActions, {
  Types as EmployeeFormTypes,
} from '../../stores/employee/form/Actions';

function* getEmployeeForm(request: any) {
  yield put(EmployeeFormActions.getEmployeeFormLoading());

  const [laborList, masterList]: [
    ApiResponse<LaborResponse>,
    ApiResponse<MasterResponse>,
  ] = yield all([
    call(EmployeeService.getLaborList, request.payload),
    call(EmployeeService.getMasterList, request.payload),
  ]);

  if (!laborList || !masterList) {
    yield put(
      EmployeeFormActions.getEmployeeFormFailure(ResponseCode.BAD_REQUEST),
    );
    return;
  }

  if (laborList.problem || masterList.problem) {
    yield put(EmployeeFormActions.getEmployeeFormFailure(laborList.problem));
    return;
  }

  const result = {
    laborList: laborList.data?.map(labor => ({
      label: labor.type,
      value: labor.id,
    })),
    masterList: masterList.data?.map(master => ({
      Id: master.id,
      Name: `${master.name} - ${master.docNumber}`,
      Value: master,
    })),
  };

  yield put(EmployeeFormActions.getEmployeeFormSuccess(result));
}

function* postEmployeeForm(request: any) {
  console.log(request, 'aqui');
  yield put(EmployeeFormActions.postEmployeeFormLoading());

  const response: ApiResponse<PostEmployeeResponse> = yield call(
    EmployeeService.postForm,
    request.payload?.apiRequest,
  );

  if (!response) {
    yield put(
      EmployeeFormActions.postEmployeeFormFailure(ResponseCode.BAD_REQUEST),
    );
    return;
  }

  if (response.problem) {
    yield put(EmployeeFormActions.postEmployeeFormFailure(response.problem));
    return;
  }

  const luxandRequest = {
    photo: request.payload?.photo?.path,
    name: response.data?.id,
  };
  const luxandResponse: GoogleResponse<any> = yield call(
    EmployeeService.uploadPhoto,
    luxandRequest,
  );
  // const uploadResponse: GoogleResponse<any> = yield call(
  //   EmployeeService.uploadLuxanPhoto,
  //   luxandRequest,
  // );

  if (!luxandResponse || luxandResponse.fail) {
    yield put(
      EmployeeFormActions.postEmployeeFormFailure({
        code: 500,
        message: 'Ocurrió un error en la creación del usuario',
      }),
    );
    return;
  }

  const result = {
    success: true,
  };

  yield put(EmployeeFormActions.postEmployeeFormSuccess(result));
}

export default [
  takeLatest(EmployeeFormTypes.GET_EMPLOYEE_FORM, getEmployeeForm),
  takeLatest(EmployeeFormTypes.POST_EMPLOYEE_FORM, postEmployeeForm),
];
