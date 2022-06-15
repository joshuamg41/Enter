import { BaseApi } from '../BaseApi';

const listAbsenceUrl = 'DoSomething';
const answerAbsenceUrl = 'DoSomething';

const getAbsenceList = request =>
  BaseApi.get(listAbsenceUrl, request);

const postAbsenceAnswer = request =>
  BaseApi.post(answerAbsenceUrl, request);

export default {
  getAbsenceList,
  postAbsenceAnswer,
};