import RNBlobUtil from 'react-native-blob-util';
import Config from 'react-native-config';
import { localToString } from "../../utils/StringUtil";

const createPersonUrl = '/subject/v2'
const createUserUrl = '/auth/signup'

const createUser = request => 
  BaseApi.post(createUserUrl, request);

const uploadPhoto = async (request) => {
  return RNBlobUtil.fetch('POST', Config.LUXAND_URL + createPersonUrl, {
    token: localToString(Config.LUXAND_TOKEN),
    'Content-Type': 'multipart/form-data',
  }, [{
    name: 'photo',
    filename: 'test.png',
    type: 'image/png',
    data: RNBlobUtil.wrap(localToString(request.photo).replace('file://', '')),
  },
  {
    name: 'name',
    data: request.name,
  },
  {
    name: 'store',
    data: '1',
  }])
    .then(resp => {
      const data = JSON.parse(resp.data)
      const result = {
        code: 200,
        success: true,
        fail: false,
        data: data,
        error: null,
      }
      console.log(result)
      return result
    })
    .catch(error => {
      const result = {
        code: 200,
        success: true,
        fail: false,
        data: error,
        error: null,
      }
      console.log(result)
      return result
    });
}

export default {
  createUser,
  uploadPhoto,
};