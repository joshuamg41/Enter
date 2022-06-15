import { EmployeeResponse } from "../../../services/employee/EmployeeServiceConstants";
import { ErrorObject } from "../../StoreConstants";

export interface EmployeeListInitialState {
  getData: EmployeeResponse;
  getLoading: boolean;
  getError: ErrorObject;
}

export default {
  getData: [],
  getLoading: false,
  getError: null,
} as EmployeeListInitialState;
