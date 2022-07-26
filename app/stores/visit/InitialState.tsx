import {ErrorObject} from '../StoreConstants';

export interface VisitInitialState {
  getData: object;
  getLoading: boolean;
  getError: ErrorObject;
}

export default {
  getData: {},
  getLoading: false,
  getError: null,
} as VisitInitialState;
