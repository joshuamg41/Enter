import { BaseApi } from '../BaseApi';

const listExitUrl = '/employees/filterExits';

const getExitList = request =>
  BaseApi.post(listExitUrl, request);

export default {
  getExitList,
};