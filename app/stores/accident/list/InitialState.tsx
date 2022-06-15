import { GetAccidentResponse } from "../../../services/accident/AccidentServiceConstants";
import { ErrorObject } from "../../StoreConstants";

export interface AccidentListInitialState {
  getData: GetAccidentResponse;
  getLoading: boolean;
  getError: ErrorObject;

  postData: any;
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
} as AccidentListInitialState;
