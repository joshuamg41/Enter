import { all, call, put, takeLatest } from 'redux-saga/effects';
import { ApiResponse } from '../../services/BaseApiConstants';
import EntryService from '../../services/entry/EntryService';
import { EntryListResponse } from '../../services/entry/EntryServiceConstants';
import ExitService from '../../services/exit/ExitService';
import { ExitListResponse } from '../../services/exit/ExitServiceConstants';
import HomeService from '../../services/home/HomeService';
import { ProvinceResponse, EntryProjectResponse, EntryProvinceResponse, LaborResponse, EntryLaborResponse, EntryMasterResponse, MasterResponse } from '../../services/home/HomeServiceConstants';
import HomeActions, { Types as HomeTypes } from '../../stores/home/Actions';
import { transformInData } from './HomeFunctions';

function* getHome(request: any) {
  yield put(HomeActions.homeLoading());

  const [provinceList, entryResponse, exitResponse]: [ApiResponse<ProvinceResponse>, ApiResponse<EntryListResponse>, ApiResponse<ExitListResponse>] = yield all([
    call(HomeService.getProvinceList, request.payload),
    call(EntryService.getEntryList, request.payload),
    call(ExitService.getExitList, request.payload),
  ])

  const result = {
    provinceData: provinceList.data,
    entryData: transformInData(entryResponse.data || []),
    exitData: transformInData(exitResponse.data || []),
  }

  yield put(HomeActions.homeSuccess(result));
}

function* getEntryProject(request: any) {
  yield put(HomeActions.getEntryLoading());

  const [projectResponse, laborResponse]: [ApiResponse<EntryProjectResponse>, ApiResponse<LaborResponse>] = yield all([
    call(HomeService.getProjectEntry, request.payload),
    call(HomeService.getLaborList, {}),
 ])

  const projectResult = Array.isArray(projectResponse.data) ? projectResponse.data : []
  const laborResult = Array.isArray(laborResponse.data) ? laborResponse.data : []

  yield put(HomeActions.getEntryProjectSuccess(projectResult));
  yield put(HomeActions.getLaborListSuccess(laborResult));
}

function* getEntryProvince(request: any) {
  yield put(HomeActions.getEntryLoading());

  const provinceResponse: ApiResponse<EntryProvinceResponse> = yield call(HomeService.getProvinceEntry, request.payload);

  const provinceResult = Array.isArray(provinceResponse.data) ? provinceResponse.data : []

  yield put(HomeActions.getEntryProvinceSuccess(provinceResult));
}

function* getEntryLabor(request: any) {
  yield put(HomeActions.getEntryLoading());

  
  const [laborResponse, masterListResponse]: [ApiResponse<EntryLaborResponse>, ApiResponse<MasterResponse>] = yield all([
    call(HomeService.getLaborEntry, request.payload.laborEntry),
    call(HomeService.getMasterList, request.payload.masterList),
 ])

  const masterListResult = Array.isArray(masterListResponse.data) ? masterListResponse.data : []
  const laborResult = Array.isArray(laborResponse.data) ? laborResponse.data : []

  yield put(HomeActions.getMasterListSuccess(masterListResult));
  yield put(HomeActions.getEntryLaborSuccess(laborResult));
}

function* getEntryMaster(request: any) {
  yield put(HomeActions.getEntryLoading());

  const masterEntryResponse: ApiResponse<EntryMasterResponse>= yield call(HomeService.getMasterEntry, request.payload);

  const masterEntryResult = Array.isArray(masterEntryResponse.data) ? masterEntryResponse.data : []

  yield put(HomeActions.getEntryMasterSuccess(masterEntryResult));
}

export default [
  takeLatest(HomeTypes.GET_HOME, getHome),
  takeLatest(HomeTypes.GET_ENTRY_PROJECT, getEntryProject),
  takeLatest(HomeTypes.GET_ENTRY_PROVINCE, getEntryProvince),
  takeLatest(HomeTypes.GET_ENTRY_MASTER, getEntryMaster),
  takeLatest(HomeTypes.GET_ENTRY_LABOR, getEntryLabor),
]