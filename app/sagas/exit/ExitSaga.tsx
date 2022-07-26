import moment from 'moment';
import { call, put, takeLatest } from 'redux-saga/effects';
import { ApiResponse } from '../../services/BaseApiConstants';
import ExitService from '../../services/exit/ExitService';
import { ExitListResponse } from '../../services/exit/ExitServiceConstants';
import ExitActions, { Types as ExitTypes } from '../../stores/exit/Actions';
import { localToArray } from '../../utils/ArrayUtil';
import { isEmpty } from '../../utils/ValidationUtil';

function* getExit(request: any) {
  yield put(ExitActions.getExitLoading());

  const exitListResponse: ApiResponse<ExitListResponse> = yield call(ExitService.getExitList, request.payload);

  if (isEmpty(exitListResponse.data)) {
    yield put(ExitActions.getExitSuccess([]));
    return
  }

  const result = localToArray(exitListResponse.data)
    .map(entry => {
      return {
        ...entry,
        employeeName: entry.employee.name,
      }
    })
    .sort((a, b) => {
      const aDate = moment(a.createdAt, 'YYYY-MM-DD[T]HH:mm:ss')
      const bDate = moment(b.createdAt, 'YYYY-MM-DD[T]HH:mm:ss')
      if (aDate.isAfter(bDate)) {
        return -1
      } else {
        return 1
      }
    })

  yield put(ExitActions.getExitSuccess(result));
}

export default [
  takeLatest(ExitTypes.GET_EXIT, getExit),
]