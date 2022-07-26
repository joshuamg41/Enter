import { localToString } from '../../utils/StringUtil';
import { BaseApi } from '../BaseApi';

const userAuthUrl = '/auth/signin';

const authUser = request => {
  return BaseApi.post(userAuthUrl, request);
};

const getUserData = async ({ docNumber }) => {
  return firestore().collection('users').doc(localToString(docNumber)).get()
    .then(async (res) => {
      if (!res.exists) {
        return {
          code: '500',
          success: false,
          fail: true,
          data: {},
          error: {
            code: "404",
            message: "Usuario no existe en el sistema",
          },
        }
      }

      const userData = res.data()
      const result = {
        code: '0',
        success: true,
        fail: false,
        data: {
          ...userData,
          exists: res.exists,
        },
        error: null,
      }
      console.log(result)
      return result
    })
    .catch(err => {
      const result = {
        code: '500',
        success: false,
        fail: true,
        data: {},
        error: {
          code: err.code,
          message: err.nativeErrorMessage || err.message,
        },
      }
      console.log(result)
      return result
    })
}

export default {
  authUser,
  getUserData,
};
