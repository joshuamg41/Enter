import { ExitListResponse } from "../../services/exit/ExitServiceConstants";
import { ErrorObject } from "../StoreConstants";

export interface ExitInitialState {
  getData: ExitListResponse;
  getLoading: boolean;
  getError: ErrorObject;
}

export default {
  getData: [],
  getLoading: false,
  getError: null,
} as ExitInitialState;