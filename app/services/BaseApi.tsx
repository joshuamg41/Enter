//@ts-nocheck
import { create } from 'apisauce';
import Config from 'react-native-config';
import { RootState } from '../stores/AppReducers';
import { store } from '../stores/index';
import SigninActions from '../stores/signin/Actions';
import { localToString } from '../utils/StringUtil';
import { navigateAndReset } from './NavigationService';
import ResponseCode from './ResponseCode';

const BaseApi = create({
  baseURL: Config.BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    // 'X-Authorization': Config.AUTHORIZATION,
    'Cache-Control': 'no-cache'
  },
  timeout: Number(Config.TIMEOUT) || 60000,
});

const LuxandApi = create({
  baseURL: Config.LUXAND_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    token: localToString(Config.LUXAND_TOKEN),
  },
  timeout: Number(Config.TIMEOUT) || 60000,
});

function transformRequest(request) {
  console.log(request);
  const state = store?.getState();
  const token = state?.signin?.user?.token
  console.log("TOKEN", token)
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }

  return request
}

function transformResponse(response) {
  console.log(response);

  //State
  const state: RootState = store?.getState();
  const isLogged = state?.signin?.user?.isLogged
  const userData = state?.signin?.user?.data

  //Token receptor
  if (response?.data?.payload?.token) {
    console.log("NEW TOKEN", response?.data?.payload?.token)
    store.dispatch(SigninActions.refreshUserToken(response?.data?.payload?.token))
  }

  if (response.problem) {
    if (response.status == 401 && isLogged) {
      navigateAndReset('Welcome')
    } else if (ResponseCode[response.problem]) {
      response.problem = ResponseCode[response.problem]
    } else {
      response.problem = ResponseCode.CONNECTION_ERROR
    }
  }

  return response
}

// Para probar, impirmir todos los request y response que se llamen
BaseApi.addRequestTransform(transformRequest);
LuxandApi.addRequestTransform(transformRequest);

// Transformando el response para poner los errores generales
BaseApi.addResponseTransform(transformResponse);
LuxandApi.addResponseTransform(transformResponse);

const baseApiResponseReturn = (response) => {
  return response
}

export {
  BaseApi,
  LuxandApi,
  baseApiResponseReturn,
};

