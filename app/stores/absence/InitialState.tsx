import { GetAbsenceResponse } from "../../services/absence/AbsenceServiceConstants";
import { ErrorObject } from "../StoreConstants";

export interface AbsenceInitialState {
  getData: GetAbsenceResponse;
  getLoading: boolean;
  getError: ErrorObject;

  postData: {};
  postLoading: boolean;
  postError: ErrorObject;
}

export default {
  getData: [],
  getLoading: false,
  getError: null,

  postData: {},
  postLoading: false,
  postError: null,
} as AbsenceInitialState;