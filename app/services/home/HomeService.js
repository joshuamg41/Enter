import { BaseApi, baseApiResponseReturn } from '../BaseApi';

const listProvinceUrl = '/provincias/provinceInfo'; ///provincias/get
const projectEntryUrl = '/employees/EntriesByProject';
const provinceEntryUrl = '/employees/getEntriesByProvince';
const masterEntryUrl = '/employees/getEntriesByMaestro';
const laborEntryUrl = '/employees/EntriesByLabor';
const listLaborUrl = '/labor/getlabores';
const listMasterUrl = '/maestros/filterMaestros';

const getProvinceList = request =>
  BaseApi.get(listProvinceUrl, request);

const getProjectEntry = request =>
  BaseApi.post(projectEntryUrl, request);

const getProvinceEntry = request =>
  BaseApi.post(provinceEntryUrl, request);

const getMasterEntry = request =>
  BaseApi.post(masterEntryUrl, request);

const getLaborEntry = request =>
  BaseApi.post(laborEntryUrl, request);

const getLaborList = request =>
  BaseApi.get(listLaborUrl, request);

const getMasterList = request =>
  BaseApi.post(listMasterUrl, request);

export default {
  getProvinceList,
  getProvinceEntry,
  getProjectEntry,
  getMasterEntry,
  getLaborEntry,
  getLaborList,
  getMasterList,
};