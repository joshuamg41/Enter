import { createAction } from '@reduxjs/toolkit';
import { ErrorObject } from '../StoreConstants';

const Types = {
  GET_HOME: 'GET_HOME',
  HOME_LOADING: 'HOME_LOADING',
  HOME_SUCCESS: 'HOME_SUCCESS',
  HOME_FAILURE: 'HOME_FAILURE',

  //ENTRY
  GET_ENTRY_LOADING: 'GET_ENTRY_LOADING',
  GET_ENTRY_FAILURE: 'GET_ENTRY_FAILURE',
  
  GET_LABOR_LIST_SUCCESS: 'GET_MASTER_LIST_SUCCESS',
  GET_MASTER_LIST_SUCCESS: 'GET_LABOR_LIST_SUCCESS',
  GET_ENTRY_PROJECT: 'GET_ENTRY_PROJECT',
  GET_ENTRY_PROJECT_SUCCESS: 'GET_ENTRY_PROJECT_SUCCESS',
  GET_ENTRY_PROVINCE: 'GET_ENTRY_PROVINCE',
  GET_ENTRY_PROVINCE_SUCCESS: 'GET_ENTRY_PROVINCE_SUCCESS',
  GET_ENTRY_MASTER: 'GET_ENTRY_MASTER',
  GET_ENTRY_MASTER_SUCCESS: 'GET_ENTRY_MASTER_SUCCESS',
  GET_ENTRY_LABOR: 'GET_ENTRY_LABOR',
  GET_ENTRY_LABOR_SUCCESS: 'GET_ENTRY_LABOR_SUCCESS',
}

const Creators = {
  getHome: createAction<any>(Types.GET_HOME),
  homeLoading: createAction(Types.HOME_LOADING),
  homeSuccess: createAction<any>(Types.HOME_SUCCESS),
  homeFailure: createAction<ErrorObject>(Types.HOME_FAILURE),

  //ENTRY
  getEntryLoading: createAction(Types.GET_ENTRY_LOADING),
  getEntryFailure: createAction<ErrorObject>(Types.GET_ENTRY_FAILURE),
  
  getLaborListSuccess: createAction<any>(Types.GET_LABOR_LIST_SUCCESS),
  getMasterListSuccess: createAction<any>(Types.GET_MASTER_LIST_SUCCESS),
  getEntryProject: createAction<any>(Types.GET_ENTRY_PROJECT),
  getEntryProjectSuccess: createAction<any>(Types.GET_ENTRY_PROJECT_SUCCESS),
  getEntryProvince: createAction<any>(Types.GET_ENTRY_PROVINCE),
  getEntryProvinceSuccess: createAction<any>(Types.GET_ENTRY_PROVINCE_SUCCESS),
  getEntryMaster: createAction<any>(Types.GET_ENTRY_MASTER),
  getEntryMasterSuccess: createAction<any>(Types.GET_ENTRY_MASTER_SUCCESS),
  getEntryLabor: createAction<any>(Types.GET_ENTRY_LABOR),
  getEntryLaborSuccess: createAction<any>(Types.GET_ENTRY_LABOR_SUCCESS),
}

export { Types };
export default Creators;