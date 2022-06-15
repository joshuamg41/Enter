import { createAction } from '@reduxjs/toolkit';
import { ErrorObject } from '../StoreConstants';

const Types = {
  GET_ABSENCE: 'GET_ABSENCE',
  GET_ABSENCE_LOADING: 'GET_ABSENCE_LOADING',
  GET_ABSENCE_SUCCESS: 'GET_ABSENCE_SUCCESS',
  GET_ABSENCE_FAILURE: 'GET_ABSENCE_FAILURE',

  POST_ABSENCE_ANSWER: 'POST_ABSENCE_ANSWER',
  POST_ABSENCE_ANSWER_LOADING: 'POST_ABSENCE_ANSWER_LOADING',
  POST_ABSENCE_ANSWER_SUCCESS: 'POST_ABSENCE_ANSWER_SUCCESS',
  POST_ABSENCE_ANSWER_FAILURE: 'POST_ABSENCE_ANSWER_FAILURE',
}

const Creators = {
  getAbsence: createAction<any>(Types.GET_ABSENCE),
  getAbsenceLoading: createAction(Types.GET_ABSENCE_LOADING),
  getAbsenceSuccess: createAction<any>(Types.GET_ABSENCE_SUCCESS),
  getAbsenceFailure: createAction<ErrorObject>(Types.GET_ABSENCE_FAILURE),

  postAbsenceAnswer: createAction<any>(Types.POST_ABSENCE_ANSWER),
  postAbsenceAnswerLoading: createAction(Types.POST_ABSENCE_ANSWER_LOADING),
  postAbsenceAnswerSuccess: createAction<any>(Types.POST_ABSENCE_ANSWER_SUCCESS),
  postAbsenceAnswerFailure: createAction<ErrorObject>(Types.POST_ABSENCE_ANSWER_FAILURE),
}

export { Types };
export default Creators;