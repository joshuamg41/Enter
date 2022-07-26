import { call, put, takeLatest } from 'redux-saga/effects';
import { ApiResponse } from '../../services/BaseApiConstants';
import { GetAccidentResponse } from '../../services/accident/AccidentServiceConstants';
import AccidentService from '../../services/accident/AccidentService';
import ResponseCode from '../../services/ResponseCode';
import AccidentListActions, { Types as AccidentListTypes } from '../../stores/accident/list/Actions';
import { isEmpty } from '../../utils/ValidationUtil';
import { localToArray } from '../../utils/ArrayUtil';

function* getAccidentList(request: any) {
  yield put(AccidentListActions.accidentListLoading());

  const response: ApiResponse<GetAccidentResponse> = yield call(AccidentService.getAccidentList, request.payload);

  if (!response) {
    yield put(AccidentListActions.accidentListFailure(ResponseCode.BAD_REQUEST));
    return
  }

  if (response.problem) {
    yield put(AccidentListActions.accidentListFailure(response.problem));
    return
  }

  if (isEmpty(response.data)) {
    yield put(AccidentListActions.accidentListSuccess([]));
    return
  }

  const result = localToArray(response.data)
    .map(accident => {
      return {
        ...accident,
        employeeName: accident.employee?.name,
      }
    })

  yield put(AccidentListActions.accidentListSuccess(result));
}

export default [
  takeLatest(AccidentListTypes.GET_ACCIDENT_LIST, getAccidentList),
]