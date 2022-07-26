import moment from 'moment';
import { call, put, takeLatest } from 'redux-saga/effects';
import { ApiResponse } from '../../services/BaseApiConstants';
import EntryService from '../../services/entry/EntryService';
import { EntryListResponse } from '../../services/entry/EntryServiceConstants';
import EntryActions, { Types as EntryTypes } from '../../stores/entry/Actions';
import { localToArray } from '../../utils/ArrayUtil';
import { isEmpty } from '../../utils/ValidationUtil';

function* getEntry(request: any) {
  yield put(EntryActions.getEntryLoading());

  const entryListResponse: ApiResponse<EntryListResponse> = yield call(EntryService.getEntryList, request.payload);

  if (isEmpty(entryListResponse.data)) {
    yield put(EntryActions.getEntrySuccess([]));
    return
  }

  const result = localToArray(entryListResponse.data)
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

  yield put(EntryActions.getEntrySuccess(result));
}

export default [
  takeLatest(EntryTypes.GET_ENTRY, getEntry),
]