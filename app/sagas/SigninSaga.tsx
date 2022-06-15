import { call, put, takeLatest, takeLeading } from 'redux-saga/effects';
import { GoogleResponse } from '../services/BaseApiConstants';
import ResponseCode from '../services/ResponseCode';
import SigninService from '../services/signin/SigninService';
import { SigninResponse } from '../services/signin/SigninServiceConstants';
import SigninActions, { Types as SigninTypes } from '../stores/signin/Actions';

export function* login(request: any) {
  yield put(SigninActions.loginLoading());

  //authService
  const authResponse: GoogleResponse<SigninResponse> = yield call(SigninService.authUser, request.payload)

  if (!authResponse || !authResponse.data?.success) {
    yield put(SigninActions.loginFailure({
      code: ResponseCode.BAD_REQUEST.code,
      message: 'Usuario o contraseña incorrecta',
    }));
    return
  }

  const result = {
    isLogged: true,
    authRequest: request.payload,
    data: authResponse.data?.user,
  }

  yield put(SigninActions.loginSuccess(result));
}

// function* refreshUserData() {
//   const userData: ApiResponse<GenericApiResponse> = yield call(SigninService.getUserData, {})

//   if (!userData.data || !userData.ok || !userData.data.success) {
//     return false;
//   }

//   const result = localToObject(userData.data.payload)

//   yield put(SigninActions.refreshUserDataSuccess(result))
//   return true
// }

// function* callForgotPassword(request: any) {
//   yield put(SigninActions.forgotPasswordLoading());

//   const response: ApiResponse<SendResetPasswordResponse> = yield call(SigninService.sendResetPassword, request.payload);

//   if (!response) {
//     yield put(SigninActions.forgotPasswordFailure(ResponseCode.BAD_REQUEST));
//     return
//   }

//   if (response.problem) {
//     yield put(SigninActions.forgotPasswordFailure(response.problem));
//     return
//   }

//   const result = response.data

//   yield put(SigninActions.forgotPasswordSuccess(result));
// }

export default [
  takeLeading(SigninTypes.LOGIN, login),
  // takeLatest(SigninTypes.REFRESH_USER_DATA, refreshUserData),
  // takeLatest(SigninTypes.CALL_FORGOT_PASSWORD, callForgotPassword),
]