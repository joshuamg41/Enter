import { ErrorObject } from "../../StoreConstants";

export interface AccidentFormInitialState {
  getData: {
    employeeList: any[];
  };
  getLoading: boolean;
  getError: ErrorObject;

  postData: any;
  postLoading: boolean;
  postError: ErrorObject;
}

export default {
  getData: {
    employeeList: [],
  },
  getLoading: false,
  getError: null,

  postData: {},
  postLoading: false,
  postError: null,
} as AccidentFormInitialState;
