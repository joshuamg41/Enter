import {call, put, takeLatest, takeLeading} from 'redux-saga/effects';
import {ApiResponse, GoogleResponse} from '../services/BaseApiConstants';
import ResponseCode from '../services/ResponseCode';
import SecurityService from '../services/security/SecurityService';
import SecurityActions, {
  Types as SecurityTypes,
} from '../stores/security/Actions';
import {getDate} from '../utils/DateUtil';

function* postSecurity(request: any) {
  yield put(SecurityActions.securityLoading());

  const luxandResponse: GoogleResponse<any> = yield call(
    SecurityService.uploadPhoto,
    request.payload,
  );

  if (!luxandResponse || luxandResponse.fail) {
    yield put(
      SecurityActions.securityFailure({
        code: 500,
        message: 'Ocurrió un error en la creación del usuario',
      }),
    );
    return;
  }

  if (
    !luxandResponse.data[0] ||
    (luxandResponse.data && luxandResponse.data[0]?.probability < 0.8)
  ) {
    yield put(
      SecurityActions.securityFailure({
        code: 500,
        message:
          'No se encontró un usuario registrado con ese rostro, intente nuevamente',
      }),
    );
    return;
  }

  const securityRequest = {
    id: luxandResponse.data[0]?.name,
    type: request.payload.type,
    proyectoID: request.payload.proyectoID,
  };
  const securityResponse: ApiResponse<any> = yield call(
    SecurityService.postEmployeeSecurity,
    securityRequest,
  );

  if (!securityResponse || !securityResponse.ok) {
    yield put(
      SecurityActions.securityFailure({
        code: 500,
        message:
          'No se encontró un usuario registrado con ese rostro, intente nuevamente',
      }),
    );
    return;
  }

  const result = {
    data: securityResponse.data,
    date: getDate(),
  };

  yield put(SecurityActions.securitySuccess(result));
}

export default [takeLeading(SecurityTypes.POST_SECURITY, postSecurity)];
