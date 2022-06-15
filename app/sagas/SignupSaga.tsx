import { call, put, takeLatest, takeLeading } from 'redux-saga/effects';
import { ApiResponse, GoogleResponse } from '../services/BaseApiConstants';
import ResponseCode from '../services/ResponseCode';
import SignupService from '../services/signup/SignupService';
import SignupActions, { Types as SignupTypes } from '../stores/signup/Actions';
import { getDate } from '../utils/DateUtil';

function* postRegister(request: any) {
  yield put(SignupActions.registerLoading());

  const creationResponse: ApiResponse<any> = yield call(SignupService.createUser, request.payload)

  if (!creationResponse || !creationResponse.data) {
    yield put(SignupActions.registerFailure({
      code: 500,
      message: 'Ocurrió un error en la creación del usuario',
    }));
    return
  }

  const luxandRequest = {
    photo: request.payload?.photo?.path,
    name: creationResponse.data?.uid,
  }
  const luxandResponse: GoogleResponse<any> = yield call(SignupService.uploadPhoto, luxandRequest)

  if (!luxandResponse || luxandResponse.fail) {
    yield put(SignupActions.registerFailure({
      code: 500,
      message: 'Ocurrió un error en la creación del usuario',
    }));
    return
  }

  const result = {
    createRequest: request.payload,
    date: getDate(),
  }

  yield put(SignupActions.registerSuccess(result));
}

export default [
  takeLeading(SignupTypes.POST_REGISTER, postRegister),
]