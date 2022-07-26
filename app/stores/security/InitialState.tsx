import { EmployeeResponseItem } from "../../services/employee/EmployeeServiceConstants";
import { ErrorObject } from "../StoreConstants";

export interface SecurityInitialState {
  postData: {
    data?: EmployeeResponseItem,
    date?: number;
  };
  postLoading: boolean;
  postError: ErrorObject;
}

export default {
  postData: {
    data: {},
    date: undefined,
  },
  postLoading: false,
  postError: null,
} as SecurityInitialState;
