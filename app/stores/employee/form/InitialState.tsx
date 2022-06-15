import { ErrorObject } from "../../StoreConstants";

export interface EmployeeFormInitialState {
  getData: {
    masterList: any[];
    laborList: any[];
  };
  getLoading: boolean;
  getError: ErrorObject;

  postData: any;
  postLoading: boolean;
  postError: ErrorObject;
}

export default {
  getData: {
    masterList: [],
    laborList: [],
  },
  getLoading: false,
  getError: null,

  postData: {},
  postLoading: false,
  postError: null,
} as EmployeeFormInitialState;
