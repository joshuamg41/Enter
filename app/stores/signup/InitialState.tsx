import { IModalListInDto } from "react-native-picker-modal-view/dist/Interfaces";
import { ValidateDocumentResponse } from "../../services/signup/SignupServiceConstants";
import { ErrorObject } from "../StoreConstants";

export interface SignupInitialState {
  postData: any;
  postLoading: boolean;
  postError: ErrorObject;
}

export default {
  postData: {},
  postLoading: false,
  postError: null,
} as SignupInitialState;