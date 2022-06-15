import { SendResetPasswordResponse } from '../../services/signin/SigninServiceConstants';
import { ErrorObject } from '../StoreConstants';

export interface UserPropType {
  data: {
    name: string;
    lastName: string;
    docNumber: string;
    email: string;
    role?: {
      name: string;
    },
    proyectoID: string;
  },
  pin?: string;
  token?: string;
  isLogged: boolean;
  authRequest?: {
    citizen_id?: string;
    password?: string;
  };
}

export interface SigninInitialState {
  user: UserPropType;
  isLoading: boolean;
  error: ErrorObject;

  passwordData: {
    ok?: boolean;
    message?: string;
    user_mail?: string;
  },
  passwordLoading: boolean;
  passwordError: ErrorObject;

  forgotData: SendResetPasswordResponse;
  forgotLoading: boolean;
  forgotError: ErrorObject;
}

export default {
  user: {
    data: {
      name: "",
      lastName: "",
      docNumber: "",
      email: "",
      role: {
        name: ""
      },
      proyectoID: "",
    },
    token: undefined,
    isLogged: false,
    authRequest: undefined,
  },
  isLoading: false,
  error: null,

  passwordData: {},
  passwordLoading: false,
  passwordError: null,

  forgotData: {},
  forgotLoading: false,
  forgotError: null,
} as SigninInitialState;