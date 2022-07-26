import { BaseApi } from '../BaseApi';

const listAccidentUrl = '/accident/allAccidents'
const formPostUrl = '/accident/add';

const getAccidentList = request =>
  BaseApi.post(listAccidentUrl, request);

const postForm = request =>
  BaseApi.post(formPostUrl, request);

export default {
  getAccidentList,
  postForm,
};