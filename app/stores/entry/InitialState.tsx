import { EntryListResponse } from "../../services/entry/EntryServiceConstants";
import { ErrorObject } from "../StoreConstants";

export interface EntryInitialState {
  getData: EntryListResponse;
  getLoading: boolean;
  getError: ErrorObject;
}

export default {
  getData: [],
  getLoading: false,
  getError: null,
} as EntryInitialState;