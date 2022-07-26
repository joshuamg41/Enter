import { call, put, takeLatest } from 'redux-saga/effects';
import { ApiResponse } from '../../services/BaseApiConstants';
import AbsenceService from '../../services/absence/AbsenceService';
import { GetAbsenceResponse } from '../../services/absence/AbsenceServiceConstants';
import ResponseCode from '../../services/ResponseCode';
import AbsenceActions, { Types as AbsenceTypes } from '../../stores/absence/Actions';
import { isEmpty } from '../../utils/ValidationUtil';

function* getAbsenceList(request: any) {
  yield put(AbsenceActions.getAbsenceLoading());

  const response: ApiResponse<GetAbsenceResponse> = yield call(AbsenceService.getAbsenceList, request.payload);

  if (!response) {
    yield put(AbsenceActions.getAbsenceFailure(ResponseCode.BAD_REQUEST));
    return
  }

  if (response.problem) {
    yield put(AbsenceActions.getAbsenceFailure(response.problem));
    return
  }

  if (isEmpty(response.data)) {
    yield put(AbsenceActions.getAbsenceSuccess([]));
    return
  }

  const result = response.data

  yield put(AbsenceActions.getAbsenceSuccess(result));
}

function* postAbsenceAnswer(request: any) {
  yield put(AbsenceActions.postAbsenceAnswerLoading());

  const response: ApiResponse<GetAbsenceResponse> = yield call(AbsenceService.postAbsenceAnswer, request.payload);

  if (!response) {
    yield put(AbsenceActions.postAbsenceAnswerFailure(ResponseCode.BAD_REQUEST));
    return
  }

  if (response.problem) {
    yield put(AbsenceActions.postAbsenceAnswerFailure(response.problem));
    return
  }

  const result = {
    success: true,
    ...response.data,
  }

  yield put(AbsenceActions.postAbsenceAnswerSuccess(result));
}

export default [
  takeLatest(AbsenceTypes.GET_ABSENCE, getAbsenceList),
  takeLatest(AbsenceTypes.POST_ABSENCE_ANSWER, postAbsenceAnswer),
]