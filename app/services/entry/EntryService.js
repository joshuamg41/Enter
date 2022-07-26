import { BaseApi } from '../BaseApi';

const listEntryUrl = '/employees/filterEntries';

const getEntryList = request =>
  BaseApi.post(listEntryUrl, request);

export default {
  getEntryList,
};